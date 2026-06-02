import { useState } from 'react'
import { FaEnvelope, FaPhone, FaTrash, FaEye, FaFilter, FaExclamationTriangle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SEO from '../../../components/common/SEO'
import { useFetch } from '../../../hooks/useFetch'
import Spinner from '../../../components/loaders/Spinner'
import apiClient from '../../../api/axios'
import ENDPOINTS from '../../../api/endpoints'

const ContactList = () => {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedContact, setSelectedContact] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const { data, loading, refetch } = useFetch('/contact', {
    params: { status: selectedStatus }
  })

  const contacts = data?.data || []

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await apiClient.put(ENDPOINTS.contact.update(id), { status: newStatus })
      toast.success('Status updated')
      refetch()
      if (selectedContact?._id === id) {
        setSelectedContact(prev => ({ ...prev, status: newStatus }))
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update status')
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    const id = confirmDelete
    setConfirmDelete(null)
    setDeleting(id)
    try {
      await apiClient.delete(ENDPOINTS.contact.delete(id))
      toast.success('Contact deleted')
      refetch()
      if (selectedContact?._id === id) setSelectedContact(null)
    } catch (error) {
      toast.error(error.message || 'Failed to delete contact')
    } finally {
      setDeleting(null)
    }
  }

  const getStatusColor = (status) => {
    const map = { New: 'bg-orange-100 text-orange-600', Read: 'bg-blue-100 text-blue-600', Replied: 'bg-green-100 text-green-600', Archived: 'bg-gray-100 text-gray-600' }
    return map[status] || 'bg-gray-100 text-gray-600'
  }

  return (
    <>
      <SEO title="Contact Submissions" noIndex />

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Delete Contact</h3>
                <p className="text-sm text-primary-300">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary text-sm py-2 px-4">Cancel</button>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-display font-bold text-primary mb-2">Contact Submissions</h1>
          <p className="text-primary-300">View and manage customer inquiries</p>
        </header>

        <section className="bg-white rounded-xl p-4 shadow-card">
          <div className="flex items-center gap-4">
            <FaFilter className="text-primary-300 w-5 h-5 flex-shrink-0" />
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* List */}
          <section className="bg-white rounded-xl shadow-card overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-12"><Spinner /></div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-primary-300">No contact submissions found</p>
              </div>
            ) : (
              <div className="divide-y divide-primary-100 max-h-[600px] overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 cursor-pointer transition-colors ${selectedContact?._id === contact._id ? 'bg-gold/10' : 'hover:bg-surface'}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-semibold text-primary text-sm">{contact.name}</h3>
                        <p className="text-primary-300 text-xs">{contact.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(contact.status)}`}>{contact.status}</span>
                    </div>
                    <p className="text-primary-300 text-sm line-clamp-2">{contact.message}</p>
                    <p className="text-primary-300 text-xs mt-1">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Detail View */}
          <section className="bg-white rounded-xl p-6 shadow-card">
            {selectedContact ? (
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-display font-bold text-primary mb-1">{selectedContact.name}</h2>
                    <p className="text-primary-300 text-sm">{selectedContact.subject || 'No subject'}</p>
                  </div>
                  <button
                    onClick={() => setConfirmDelete(selectedContact._id)}
                    disabled={deleting === selectedContact._id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deleting === selectedContact._id ? <Spinner size="sm" /> : <FaTrash className="w-4 h-4" />}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary-300">
                    <FaEnvelope className="w-4 h-4 flex-shrink-0" />
                    <a href={`mailto:${selectedContact.email}`} className="hover:text-gold text-sm">{selectedContact.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-primary-300">
                    <FaPhone className="w-4 h-4 flex-shrink-0" />
                    <a href={`tel:${selectedContact.phone}`} className="hover:text-gold text-sm">{selectedContact.phone}</a>
                  </div>
                </div>

                <div className="pt-4 border-t border-primary-100">
                  <h3 className="font-semibold text-primary mb-2 text-sm">Message</h3>
                  <p className="text-primary-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                </div>

                <div className="pt-4 border-t border-primary-100">
                  <h3 className="font-semibold text-primary mb-3 text-sm">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['New', 'Read', 'Replied', 'Archived'].map(s => (
                      <button
                        key={s}
                        onClick={() => handleStatusUpdate(selectedContact._id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedContact.status === s ? getStatusColor(s).replace('100', '500').replace('600', 'white') : getStatusColor(s) + ' hover:opacity-80'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-primary-300 pt-2 border-t border-primary-100">
                  Submitted: {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <FaEye className="w-12 h-12 text-primary-300 mb-3" />
                <p className="text-primary-300">Select a contact to view details</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

export default ContactList
