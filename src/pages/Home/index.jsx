import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'
import Spinner from '../../components/loaders/Spinner'

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
        description="Premium agricultural pesticides, fertilizers, seeds, and spray machines in Faisalabad, Pakistan. Trusted by farmers since 2010."
      />

      {/* Above the fold - Load immediately */}
      <HeroSection />
      <FeaturedProducts />

      {/* Below the fold - Lazy load */}
      <Suspense fallback={<div className="flex justify-center py-12"><Spinner /></div>}>
        <AboutPreview />
        <WhyChooseUs />
        <WorkingHours />
        <ServicesPreview />
        <Testimonials />
        <FAQPreview />
        <ContactCTA />
      </Suspense>
    </>
  )
}

export default Home
