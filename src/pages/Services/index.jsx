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
        title="Agricultural Services" 
        description="Professional agricultural services in Minchinabad: crop consultation, pest identification, disease diagnosis, spraying services, soil testing, fertilizer recommendations, and equipment repair. Expert advice from experienced agronomists."
        keywords="crop consultation Pakistan, pest identification service, agricultural consultant Minchinabad, soil testing Bahawalnagar, spraying services, fertilizer recommendation, farm equipment repair, agronomist consultation"
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
