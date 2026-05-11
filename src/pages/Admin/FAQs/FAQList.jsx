import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SEO from '../../../components/common/SEO'
import { useFetch } from '../../../hooks/useFetch'
import Spinner from '../../../components/loaders/Spinner'
import apiClient from '../../../api/axios'
import ENDPOINTS from '../../../api/endpoints'

/**
 * Admin FAQ List
 * View, search, and delete FAQs
 */
const FAQList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [deleting, setDeleting] = useState(null)
  
  const { data, loading, refetch } = useFetch('/faqs', {
    params: {
      search: searchTerm,
      category: selectedCategory
    }
  })

  const faqs = data?.data || []
  const categories = data?.categories || []

  const handleDelete = async (id, question) => {
    if (!window.confirm(`Are you sure you want to delete this FAQ?`)) return

    setDeleting(id)
    try {
      await apiClient.delete(ENDPOINTS.faqs.delete(id))
      toast.success('FAQ deleted successfully')
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

      <div className="space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              FAQs
            </h1>
            <p className="text-primary-300">
              Manage frequently asked questions
            </p>
          </div>
          <Link to="/admin/faqs/new" className="btn-primary">
            <FaPlus className="w-4 h-4 mr-2" />
            Add FAQ
          </Link>
        </header>

        {/* Filters */}
        <section className="bg-white rounded-xl p-6 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </section>

        {/* FAQs List */}
        <section className="bg-white rounded-xl shadow-card overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 mb-4">No FAQs found</p>
              <Link to="/admin/faqs/new" className="btn-primary">
                <FaPlus className="w-4 h-4 mr-2" />
                Add Your First FAQ
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-primary-100">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-6 hover:bg-surface transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-primary">{faq.question}</h3>
                        <span className="text-xs px-2 py-1 bg-gold/10 text-gold rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <p className="text-primary-300 text-sm line-clamp-2">{faq.answer}</p>
                      <p className="text-primary-300 text-xs mt-2">
                        Order: {faq.order || 0}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/faqs/${faq._id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(faq._id, faq.question)}
                        disabled={deleting === faq._id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === faq._id ? (
                          <Spinner size="sm" />
                        ) : (
                          <FaTrash className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default FAQList
