import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaTrash, FaEye, FaFilter } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SEO from '../../../components/common/SEO'
import { useFetch } from '../../../hooks/useFetch'
import Spinner from '../../../components/loaders/Spinner'
import apiClient from '../../../api/axios'
import ENDPOINTS from '../../../api/endpoints'

/**
 * Admin Contact List
 * View and manage contact form submissions
 */
const ContactList = () => {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedContact, setSelectedContact] = useState(null)
  const [deleting, setDeleting] = useState(null)
  
  const { data, loading, refetch } = useFetch('/contact', {
    params: {
      status: selectedStatus
    }
  })

  const contacts = data?.data || []

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await apiClient.put(ENDPOINTS.contact.update(id), { status: newStatus })
      toast.success('Status updated successfully')
      refetch()
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus })
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return

    setDeleting(id)
    try {
      await apiClient.delete(ENDPOINTS.contact.delete(id))
      toast.success('Contact deleted successfully')
      refetch()
      if (selectedContact?._id === id) {
        setSelectedContact(null)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete contact')
    } finally {
      setDeleting(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-orange-100 text-orange-600'
      case 'Read':
        return 'bg-blue-100 text-blue-600'
      case 'Replied':
        return 'bg-green-100 text-green-600'
      case 'Archived':
        return 'bg-gray-100 text-gray-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <>
      <SEO title="Contact Submissions" noIndex />

      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Contact Submissions
          </h1>
          <p className="text-primary-300">
            View and manage customer inquiries
          </p>
        </header>

        {/* Filter */}
        <section className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <FaFilter className="text-primary-300 w-5 h-5" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Read">Read</option>
              <option value="Replied">Replied</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </section>

        {/* Contacts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* List */}
          <section className="bg-white rounded-xl shadow-card overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-12">
                <Spinner />
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-primary-300">No contact submissions found</p>
              </div>
            ) : (
              <div className="divide-y divide-primary-100 max-h-[600px] overflow-y-auto">
                {contacts.map((contact, index) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedContact?._id === contact._id 
                        ? 'bg-gold/10' 
                        : 'hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-primary">{contact.name}</h3>
                        <p className="text-primary-300 text-sm">{contact.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-primary-300 text-sm line-clamp-2 mb-2">
                      {contact.message}
                    </p>
                    <p className="text-primary-300 text-xs">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Detail View */}
          <section className="bg-white rounded-xl p-6 shadow-card">
            {selectedContact ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-primary mb-1">
                      {selectedContact.name}
                    </h2>
                    <p className="text-primary-300">{selectedContact.subject || 'No subject'}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedContact._id)}
                    disabled={deleting === selectedContact._id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === selectedContact._id ? (
                      <Spinner size="sm" />
                    ) : (
                      <FaTrash className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary-300">
                    <FaEnvelope className="w-5 h-5" />
                    <a href={`mailto:${selectedContact.email}`} className="hover:text-gold">
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-primary-300">
                    <FaPhone className="w-5 h-5" />
                    <a href={`tel:${selectedContact.phone}`} className="hover:text-gold">
                      {selectedContact.phone}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-primary-100">
                  <h3 className="font-semibold text-primary mb-2">Message</h3>
                  <p className="text-primary-300 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>

                <div className="pt-4 border-t border-primary-100">
                  <h3 className="font-semibold text-primary mb-3">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedContact._id, 'New')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedContact.status === 'New'
                          ? 'bg-orange-500 text-white'
                          : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      }`}
                    >
                      New
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedContact._id, 'Read')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedContact.status === 'Read'
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      Read
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedContact._id, 'Replied')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedContact.status === 'Replied'
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      Replied
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedContact._id, 'Archived')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedContact.status === 'Archived'
                          ? 'bg-gray-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Archived
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-primary-100 text-xs text-primary-300">
                  <p>Submitted: {new Date(selectedContact.createdAt).toLocaleString()}</p>
                  {selectedContact.updatedAt !== selectedContact.createdAt && (
                    <p>Updated: {new Date(selectedContact.updatedAt).toLocaleString()}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <FaEye className="w-16 h-16 text-primary-300 mb-4" />
                <p className="text-primary-300">
                  Select a contact to view details
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

export default ContactList
