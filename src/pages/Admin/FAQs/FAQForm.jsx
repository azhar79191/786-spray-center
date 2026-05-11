import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import SEO from '../../../components/common/SEO'
import Spinner from '../../../components/loaders/Spinner'
import apiClient from '../../../api/axios'
import ENDPOINTS from '../../../api/endpoints'

/**
 * Admin FAQ Form
 * Create or edit FAQs
 */
const FAQForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    order: 0
  })

  const categories = ['General', 'Products', 'Orders', 'Usage', 'Shipping']

  useEffect(() => {
    if (isEdit) {
      fetchFAQ()
    }
  }, [id])

  const fetchFAQ = async () => {
    setLoading(true)
    try {
      const response = await apiClient.get(ENDPOINTS.faqs.detail(id))
      const faq = response.data.data
      setFormData({
        question: faq.question || '',
        answer: faq.answer || '',
        category: faq.category || '',
        order: faq.order || 0
      })
    } catch (error) {
      toast.error('Failed to load FAQ')
      navigate('/admin/faqs')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        order: parseInt(formData.order)
      }

      if (isEdit) {
        await apiClient.put(ENDPOINTS.faqs.update(id), payload)
        toast.success('FAQ updated successfully')
      } else {
        await apiClient.post(ENDPOINTS.faqs.create, payload)
        toast.success('FAQ created successfully')
      }
      
      navigate('/admin/faqs')
    } catch (error) {
      toast.error(error.message || 'Failed to save FAQ')
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <SEO title={isEdit ? 'Edit FAQ' : 'Add FAQ'} noIndex />

      <div className="max-w-3xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            {isEdit ? 'Edit FAQ' : 'Add New FAQ'}
          </h1>
          <p className="text-primary-300">
            {isEdit ? 'Update FAQ information' : 'Fill in the details to create a new FAQ'}
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-card space-y-6">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-primary mb-2">
              Question *
            </label>
            <input
              type="text"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="e.g., What are your delivery charges?"
            />
          </div>

          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-primary mb-2">
              Answer *
            </label>
            <textarea
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              placeholder="Provide a detailed answer..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-primary mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium text-primary mb-2">
                Display Order
              </label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-primary-300 mt-1">Lower numbers appear first</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-primary-100">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <FaSave className="w-4 h-4 mr-2" />
                  {isEdit ? 'Update FAQ' : 'Create FAQ'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/faqs')}
              className="btn-secondary"
            >
              <FaTimes className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FAQForm
