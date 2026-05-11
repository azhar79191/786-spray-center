import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import WhatsAppButton from '../components/common/WhatsAppButton'
import ScrollToTopButton from '../components/common/ScrollToTopButton'

/**
 * Main layout wrapper
 * Includes navbar, footer, and floating action buttons
 * Uses semantic HTML5 elements for better accessibility and SEO
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main id="main-content" className="flex-grow" role="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
    </div>
  )
}

export default MainLayout
