import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'
import Spinner from '../../components/loaders/Spinner'

// Eager load
import ServicesHero from './components/ServicesHero'
import ServicesGrid from './components/ServicesGrid'

// Lazy load
const ServicesCTA = lazy(() => import('./components/ServicesCTA'))

const Services = () => {
  return (
    <>
      <SEO 
        title="Our Services" 
        description="Professional agricultural services including crop consultation, pest identification, spraying services, soil testing, and equipment repair."
      />

      <ServicesHero />
      <ServicesGrid />
      
      <Suspense fallback={<div className="flex justify-center py-12"><Spinner /></div>}>
        <ServicesCTA />
      </Suspense>
    </>
  )
}

export default Services
