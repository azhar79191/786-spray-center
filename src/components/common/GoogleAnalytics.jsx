import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Google Analytics Component
 * Tracks page views and events
 * 
 * Usage: Add <GoogleAnalytics /> in App.jsx
 * 
 * To enable: Add your GA4 Measurement ID to .env:
 * VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */
const GoogleAnalytics = () => {
  const location = useLocation()
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

  useEffect(() => {
    // Only track if GA_MEASUREMENT_ID is set
    if (!GA_MEASUREMENT_ID) {
      console.log('Google Analytics not configured. Add VITE_GA_MEASUREMENT_ID to .env file.')
      return
    }

    // Load gtag.js script if not already loaded
    if (!window.gtag) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false // We'll send manually
      })
    }
  }, [GA_MEASUREMENT_ID])

  // Track page views on route change
  useEffect(() => {
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      })

      // Track page view event
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title
      })
    }
  }, [location, GA_MEASUREMENT_ID])

  return null // This component doesn't render anything
}

// Export tracking functions for use throughout the app
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

export const trackPhoneClick = (phoneNumber) => {
  trackEvent('phone_call', {
    event_category: 'contact',
    event_label: phoneNumber,
    value: 1
  })
}

export const trackWhatsAppClick = (phoneNumber) => {
  trackEvent('whatsapp_click', {
    event_category: 'contact',
    event_label: phoneNumber,
    value: 1
  })
}

export const trackEmailClick = (email) => {
  trackEvent('email_click', {
    event_category: 'contact',
    event_label: email,
    value: 1
  })
}

export const trackProductView = (productName, productCategory) => {
  trackEvent('view_item', {
    event_category: 'ecommerce',
    event_label: productName,
    product_category: productCategory,
    value: 1
  })
}

export const trackSearchQuery = (searchTerm, resultsCount) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount
  })
}

export const trackFormSubmission = (formName) => {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: formName,
    value: 1
  })
}

export default GoogleAnalytics
