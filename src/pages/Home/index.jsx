import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'

// Eager load above-the-fold content
import HeroSection from './components/HeroSection'
import FeaturedProducts from './components/FeaturedProducts'

// Lazy load below-the-fold content for better performance
const AboutPreview = lazy(() => import('./components/AboutPreview'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const WorkingHours = lazy(() => import('./components/WorkingHours'))
const ServicesPreview = lazy(() => import('./components/ServicesPreview'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const FAQPreview = lazy(() => import('./components/FAQPreview'))
const ContactCTA = lazy(() => import('./components/ContactCTA'))

/**
 * Home Page
 * Main landing page with all sections
 * Optimized with code splitting and lazy loading
 */
const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Bismillah Spray Center - Leading agricultural supplier in Minchinabad, Bahawalnagar. Premium pesticides, fertilizers, seeds from Syngenta, Bayer, FMC, Engro. Expert crop consultation, competitive prices, and quality products for Pakistani farmers."
        keywords="agricultural products Minchinabad, pesticides Bahawalnagar, fertilizers Punjab, Syngenta dealer Pakistan, Bayer pesticides, FMC products, Engro fertilizers, farming supplies, crop protection, agricultural store near me"
      />

      {/* Above the fold - Load immediately */}
      <HeroSection />
      <FeaturedProducts />

      {/* Below the fold - each has its own fallback so they render independently */}
      <Suspense fallback={<div className="h-32" />}><AboutPreview /></Suspense>
      <Suspense fallback={<div className="h-32" />}><WhyChooseUs /></Suspense>
      <Suspense fallback={<div className="h-32" />}><WorkingHours /></Suspense>
      <Suspense fallback={<div className="h-32" />}><ServicesPreview /></Suspense>
      <Suspense fallback={<div className="h-32" />}><Testimonials /></Suspense>
      <Suspense fallback={<div className="h-32" />}><FAQPreview /></Suspense>
      <Suspense fallback={<div className="h-32" />}><ContactCTA /></Suspense>
    </>
  )
}

export default Home
