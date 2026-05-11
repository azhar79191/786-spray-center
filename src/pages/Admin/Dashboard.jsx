import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaBox, 
  FaEnvelope, 
  FaQuestionCircle,
  FaChartLine,
  FaPlus,
  FaEye
} from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import { useFetch } from '../../hooks/useFetch'
import Spinner from '../../components/loaders/Spinner'

/**
 * Admin Dashboard
 * Overview of all content with quick stats and actions
 */
const Dashboard = () => {
  const { data: productsData, loading: productsLoading } = useFetch('/products', { params: { limit: 5 } })
  const { data: contactData, loading: contactLoading } = useFetch('/contact', { params: { limit: 5 } })
  const { data: faqData, loading: faqLoading } = useFetch('/faqs')

  // Calculate stats with proper null checks
  const getProductCount = () => {
    if (!productsData) return 0
    return productsData.pagination?.total || productsData.data?.length || 0
  }

  const getContactCount = () => {
    if (!contactData) return 0
    return contactData.pagination?.total || contactData.data?.length || 0
  }

  const getFaqCount = () => {
    if (!faqData) return 0
    return faqData.data?.length || 0
  }

  const getNewContactCount = () => {
    if (!contactData?.data) return 0
    return contactData.data.filter(c => c.status === 'New').length
  }

  const stats = [
    {
      title: 'Total Products',
      value: getProductCount(),
      icon: FaBox,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Contact Submissions',
      value: getContactCount(),
      icon: FaEnvelope,
      color: 'bg-green-500',
      link: '/admin/contacts'
    },
    {
      title: 'Total FAQs',
      value: getFaqCount(),
      icon: FaQuestionCircle,
      color: 'bg-purple-500',
      link: '/admin/faqs'
    },
    {
      title: 'New Contacts',
      value: getNewContactCount(),
      icon: FaChartLine,
      color: 'bg-orange-500',
      link: '/admin/contacts?status=New'
    }
  ]

  const quickActions = [
    {
      title: 'Add Product',
      icon: FaPlus,
      link: '/admin/products/new',
      color: 'bg-gold'
    },
    {
      title: 'Add FAQ',
      icon: FaPlus,
      link: '/admin/faqs/new',
      color: 'bg-primary'
    },
    {
      title: 'View Contacts',
      icon: FaEye,
      link: '/admin/contacts',
      color: 'bg-green-600'
    }
  ]

  return (
    <>
      <SEO title="Admin Dashboard" noIndex />

      <div className="space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Dashboard
          </h1>
          <p className="text-primary-300">
            Welcome back! Here's an overview of your content.
          </p>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={stat.link}
                className="block bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-primary">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-primary-300 text-sm font-medium">
                  {stat.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-display font-bold text-primary mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={action.link}
                  className={`block ${action.color} text-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
                >
                  <action.icon className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold text-lg">{action.title}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Products */}
          <section className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-bold text-primary">
                Recent Products
              </h2>
              <Link to="/admin/products" className="text-gold hover:text-gold/80 text-sm font-medium">
                View All
              </Link>
            </div>
            {productsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : productsData?.data?.length > 0 ? (
              <ul className="space-y-3">
                {productsData.data.slice(0, 5).map((product) => (
                  <li key={product._id} className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-primary-50 transition-colors">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-primary font-medium truncate">{product.name}</p>
                      <p className="text-primary-300 text-sm">{product.category}</p>
                    </div>
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="text-gold hover:text-gold/80 text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-primary-300">
                <p>No products yet.</p>
                <Link to="/admin/products/new" className="text-gold hover:text-gold/80 text-sm font-medium mt-2 inline-block">
                  Add your first product
                </Link>
              </div>
            )}
          </section>

          {/* Recent Contacts */}
          <section className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-bold text-primary">
                Recent Contacts
              </h2>
              <Link to="/admin/contacts" className="text-gold hover:text-gold/80 text-sm font-medium">
                View All
              </Link>
            </div>
            {contactLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : contactData?.data?.length > 0 ? (
              <ul className="space-y-3">
                {contactData.data.slice(0, 5).map((contact) => (
                  <li key={contact._id} className="p-3 bg-surface rounded-lg hover:bg-primary-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-primary font-medium">{contact.name}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        contact.status === 'New' ? 'bg-orange-100 text-orange-600' :
                        contact.status === 'Replied' ? 'bg-green-100 text-green-600' :
                        contact.status === 'Read' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-primary-300 text-sm truncate">{contact.subject}</p>
                    <p className="text-primary-300 text-xs mt-1">{contact.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-primary-300">
                <p>No contact submissions yet.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

export default Dashboard
