/**
 * Helper utility functions
 */

/**
 * Format price in Pakistani Rupees
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null) return 'N/A'
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generate WhatsApp link
 */
export const getWhatsAppLink = (phone, message = '') => {
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}

/**
 * Generate phone call link
 */
export const getPhoneLink = (phone) => {
  return `tel:${phone.replace(/\s/g, '')}`
}

/**
 * Generate email link
 */
export const getEmailLink = (email, subject = '') => {
  const encodedSubject = encodeURIComponent(subject)
  return `mailto:${email}${encodedSubject ? `?subject=${encodedSubject}` : ''}`
}

/**
 * Generate Google Maps link
 */
export const getGoogleMapsLink = (address = '') => {
  // Use the direct Google Maps link if available, otherwise generate from address
  const mapsUrl = import.meta.env.VITE_GOOGLE_MAPS_LINK || 'https://maps.app.goo.gl/fQ84ruXiC83vPDm1A'
  
  // If a custom address is provided, create a search query
  if (address && address !== import.meta.env.VITE_ADDRESS) {
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  }
  
  return mapsUrl
}

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Generate slug from string
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Scroll to element by ID
 */
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/**
 * Get category color
 */
export const getCategoryColor = (category) => {
  const colors = {
    'Insecticides': 'bg-red-100 text-red-800 border-red-200',
    'Herbicides': 'bg-green-100 text-green-800 border-green-200',
    'Fungicides': 'bg-purple-100 text-purple-800 border-purple-200',
    'Fertilizers': 'bg-amber-100 text-amber-800 border-amber-200',
    'Seeds': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  }
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200'
}

/**
 * Get stock status color
 */
export const getStockStatusColor = (status) => {
  const colors = {
    'In Stock': 'bg-green-500 text-white',
    'Low Stock': 'bg-amber-500 text-white',
    'Out of Stock': 'bg-red-500 text-white',
  }
  return colors[status] || 'bg-gray-500 text-white'
}

/**
 * Generate star rating array
 */
export const getStarRating = (rating) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push('full')
    } else if (i - 0.5 <= rating) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }
  return stars
}
