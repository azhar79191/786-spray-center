import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaBox, 
  FaEnvelope, 
  FaQuestionCircle,
  FaChartLine,
  FaPlus,
  FaEye,
  FaImages,
  FaTags,
  FaStar,
  FaWrench
} from 'react-icons/fa'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2'
import SEO from '../../components/common/SEO'
import { useFetch } from '../../hooks/useFetch'
import Spinner from '../../components/loaders/Spinner'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
)

/**
 * Admin Dashboard
 * Overview of all content with quick stats and actions
 */
const Dashboard = () => {
  // Fetch all data for stats/charts and limit=5 only for recent lists
  const { data: allProductsData, loading: allProductsLoading } = useFetch('/products', { params: { limit: 1000 } })
  const { data: productsData, loading: productsLoading } = useFetch('/products', { params: { limit: 5 } })
  const { data: allContactsData, loading: allContactsLoading } = useFetch('/contact', { params: { limit: 1000 } })
  const { data: contactData, loading: contactLoading } = useFetch('/contact', { params: { limit: 5 } })
  const { data: faqData, loading: faqLoading } = useFetch('/faqs')
  const { data: galleryData, loading: galleryLoading } = useFetch('/gallery')
  const { data: brandsData, loading: brandsLoading } = useFetch('/brands')
  const { data: testimonialsData, loading: testimonialsLoading } = useFetch('/testimonials')
  const { data: serviceRequestsData, loading: serviceRequestsLoading } = useFetch('/service-requests', { params: { limit: 5 } })

  // Calculate stats with proper null checks
  const getProductCount = () => {
    if (!allProductsData) return 0
    return allProductsData.pagination?.total || allProductsData.data?.length || 0
  }

  const getContactCount = () => {
    if (!allContactsData) return 0
    return allContactsData.pagination?.total || allContactsData.data?.length || 0
  }

  const getFaqCount = () => {
    if (!faqData) return 0
    return faqData.data?.length || 0
  }

  const getGalleryCount = () => {
    if (!galleryData) return 0
    return galleryData.data?.length || 0
  }

  const getBrandsCount = () => {
    if (!brandsData) return 0
    return brandsData.data?.length || 0
  }

  const getTestimonialsCount = () => {
    if (!testimonialsData) return 0
    return testimonialsData.data?.length || 0
  }

  const getServiceRequestsCount = () => {
    if (!serviceRequestsData) return 0
    return serviceRequestsData.pagination?.total || serviceRequestsData.data?.length || 0
  }

  const getNewContactCount = () => {
    if (!allContactsData?.data) return 0
    return allContactsData.data.filter(c => c.status === 'New').length
  }

  const getRepliedContactCount = () => {
    if (!allContactsData?.data) return 0
    return allContactsData.data.filter(c => c.status === 'Replied').length
  }

  const getReadContactCount = () => {
    if (!allContactsData?.data) return 0
    return allContactsData.data.filter(c => c.status === 'Read').length
  }

  // Get product categories
  const getProductCategories = () => {
    if (!allProductsData?.data) return {}
    const categories = {}
    allProductsData.data.forEach(product => {
      const cat = product.category || 'Other'
      categories[cat] = (categories[cat] || 0) + 1
    })
    return categories
  }

  // Calculate monthly data from backend
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const contactsMonthly = Array(12).fill(0)
    const productsMonthly = Array(12).fill(0)
    const currentYear = new Date().getFullYear()

    // Process contacts
    if (allContactsData?.data) {
      allContactsData.data.forEach(contact => {
        if (contact.createdAt) {
          const date = new Date(contact.createdAt)
          if (date.getFullYear() === currentYear) {
            const monthIndex = date.getMonth()
            contactsMonthly[monthIndex]++
          }
        }
      })
    }

    // Process products
    if (allProductsData?.data) {
      allProductsData.data.forEach(product => {
        if (product.createdAt) {
          const date = new Date(product.createdAt)
          if (date.getFullYear() === currentYear) {
            const monthIndex = date.getMonth()
            productsMonthly[monthIndex]++
          }
        }
      })
    }

    // Get last 6 months
    const currentMonth = new Date().getMonth()
    const labels = []
    const finalContactsData = []
    const finalProductsData = []

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      labels.push(months[monthIndex])
      finalContactsData.push(contactsMonthly[monthIndex])
      finalProductsData.push(productsMonthly[monthIndex])
    }

    return { labels, contactsData: finalContactsData, productsData: finalProductsData }
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
      title: 'Gallery Items',
      value: getGalleryCount(),
      icon: FaImages,
      color: 'bg-pink-500',
      link: '/admin/gallery'
    },
    {
      title: 'Brands',
      value: getBrandsCount(),
      icon: FaTags,
      color: 'bg-yellow-500',
      link: '/admin/brands'
    },
    {
      title: 'Testimonials',
      value: getTestimonialsCount(),
      icon: FaStar,
      color: 'bg-red-500',
      link: '/admin/testimonials'
    },
    {
      title: 'Service Requests',
      value: getServiceRequestsCount(),
      icon: FaWrench,
      color: 'bg-cyan-500',
      link: '/admin/service-requests'
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

  // Contact Status Pie Chart Data
  const contactStatusPieData = {
    labels: ['New', 'Replied', 'Read'],
    datasets: [
      {
        data: [getNewContactCount(), getRepliedContactCount(), getReadContactCount()],
        backgroundColor: [
          'rgba(251, 146, 60, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)'
        ],
        borderColor: [
          'rgba(251, 146, 60, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  // Product Categories Bar Chart Data
  const categoriesBarData = {
    labels: Object.keys(getProductCategories()),
    datasets: [
      {
        label: 'Products per Category',
        data: Object.values(getProductCategories()),
        backgroundColor: [
          'rgba(231, 173, 47, 0.8)',
          'rgba(22, 101, 52, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(244, 63, 94, 0.8)'
        ],
        borderColor: [
          'rgba(231, 173, 47, 1)',
          'rgba(22, 101, 52, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(244, 63, 94, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  // Overview Line Chart Data with real monthly data
  const monthlyData = getMonthlyData()
  const overviewLineData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Contacts',
        data: monthlyData.contactsData,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Products',
        data: monthlyData.productsData,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }

  // Calculate overall loading state
  const isLoading = allProductsLoading || allContactsLoading || productsLoading || contactLoading || faqLoading || galleryLoading || brandsLoading || testimonialsLoading || serviceRequestsLoading

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
              transition={{ duration: 0.3, delay: index * 0.05 }}
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

        {/* Charts Section */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Contact Status Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <h2 className="text-xl font-display font-bold text-primary mb-4">
              Contact Status Distribution
            </h2>
            <div className="h-64">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Spinner />
                </div>
              ) : (
                <Pie data={contactStatusPieData} options={chartOptions} />
              )}
            </div>
          </motion.div>

          {/* Product Categories Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <h2 className="text-xl font-display font-bold text-primary mb-4">
              Products by Category
            </h2>
            <div className="h-64">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Spinner />
                </div>
              ) : (
                <Bar data={categoriesBarData} options={chartOptions} />
              )}
            </div>
          </motion.div>
        </section>

        {/* Overview Line Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-card"
        >
          <h2 className="text-xl font-display font-bold text-primary mb-4">
            Monthly Activity Overview
          </h2>
          <div className="h-80">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Spinner />
              </div>
            ) : (
              <Line data={overviewLineData} options={chartOptions} />
            )}
          </div>
        </motion.section>

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

        {/* Recent Service Requests */}
        <section className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-primary">
              Recent Service Requests
            </h2>
            <Link to="/admin/service-requests" className="text-gold hover:text-gold/80 text-sm font-medium">
              View All
            </Link>
          </div>
          {serviceRequestsLoading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : serviceRequestsData?.data?.length > 0 ? (
            <ul className="space-y-3">
              {serviceRequestsData.data.slice(0, 5).map((request) => (
                <li key={request._id} className="p-3 bg-surface rounded-lg hover:bg-primary-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-primary font-medium">{request.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      request.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                      request.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      request.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-primary-300 text-sm truncate">{request.service || 'Service Request'}</p>
                  <p className="text-primary-300 text-xs mt-1">{request.phone || request.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-primary-300">
              <p>No service requests yet.</p>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default Dashboard
