import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MobileBottomNav from '../components/layout/MobileBottomNav'
import WhatsAppButton from '../components/common/WhatsAppButton'

/**
 * Main layout wrapper
 * Includes navbar, footer, mobile bottom nav, and floating action buttons
 * Uses semantic HTML5 elements for better accessibility and SEO
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main id="main-content" className="flex-grow pt-0 md:pt-20 pb-16 md:pb-0" role="main">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
    </div>
  )
}

export default MainLayout
