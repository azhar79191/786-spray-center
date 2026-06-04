import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaExclamationTriangle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SEO from '../../../components/common/SEO'
import { useFetch } from '../../../hooks/useFetch'
import { useData } from '../../../contexts/DataContext'
import { clearCacheByType } from '../../../utils/cacheUtils'
import Spinner from '../../../components/loaders/Spinner'
import apiClient from '../../../api/axios'
import ENDPOINTS from '../../../api/endpoints'

const FAQList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [deleting, setDeleting] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const { refreshData } = useData()

  const { data, loading, refetch } = useFetch('/faqs', {
    params: { search: searchTerm, category: selectedCategory },
    _skipCache: true,
  })

  const faqs = data?.data || []
  const categories = data?.categories || []

  const handleDelete = async () => {
    if (!confirmDelete) return
    const id = confirmDelete
    setConfirmDelete(null)
    setDeleting(id)
    try {
      await apiClient.delete(ENDPOINTS.faqs.delete(id))
      toast.success('FAQ deleted successfully')
      clearCacheByType('faqs')
      await refreshData('faqs')
      await refreshData('faqCategories')
      refetch()
    } catch (error) {
      toast.error(error.message || 'Failed to delete FAQ')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <>
      <SEO title="Manage FAQs" noIndex />

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Delete FAQ</h3>
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
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">FAQs</h1>
            <p className="text-primary-300">Manage frequently asked questions</p>
          </div>
          <Link to="/admin/faqs/new" className="btn-primary">
            <FaPlus className="w-4 h-4 mr-2" />Add FAQ
          </Link>
        </header>

        <section className="bg-white rounded-xl p-6 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-card overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 mb-4">No FAQs found</p>
              <Link to="/admin/faqs/new" className="btn-primary">
                <FaPlus className="w-4 h-4 mr-2" />Add Your First FAQ
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-primary-100">
              {faqs.map((faq) => (
                <div key={faq._id} className="p-6 hover:bg-surface transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-semibold text-primary">{faq.question}</h3>
                        <span className="text-xs px-2 py-1 bg-gold/10 text-gold rounded-full">{faq.category}</span>
                      </div>
                      <p className="text-primary-300 text-sm line-clamp-2">{faq.answer}</p>
                      <p className="text-primary-300 text-xs mt-1">Order: {faq.order || 0}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        to={`/admin/faqs/${faq._id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setConfirmDelete(faq._id)}
                        disabled={deleting === faq._id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === faq._id ? <Spinner size="sm" /> : <FaTrash className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default FAQList
