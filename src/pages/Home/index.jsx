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
        title="Pesticide Shop Minchinabad Pakistan | Agricultural Products Bahawalnagar" 
        description="Bismillah Spray Center - Authorized pesticide, fertilizer & seed dealer in Minchinabad, Bahawalnagar. Warble, FFC, Engro brands. Free delivery across Bahawalnagar district. Call +92 300 1331616"
        keywords="pesticide shop Minchinabad, agricultural products Bahawalnagar, fertilizer dealer Minchinabad, pesticide shop near me, FFC dealer Punjab, Engro fertilizer Bahawalnagar, Warble dealer Pakistan, cotton pesticides, wheat fertilizers Punjab"
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
