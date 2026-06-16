import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'

// Eager load
import AboutHero from './components/AboutHero'
import MissionVision from './components/MissionVision'

// Lazy load
const CoreValues = lazy(() => import('./components/CoreValues'))
const Timeline = lazy(() => import('./components/Timeline'))
const Stats = lazy(() => import('./components/Stats'))
const ContactMap = lazy(() => import('../Contact/components/ContactMap'))

const About = () => {
  return (
    <>
      <SEO 
        title="About Us" 
        description="Leading agricultural products supplier in Minchinabad since 2015. Authorized dealer of Warble, Agrow Mark, FFC, Engro, Agro One, Abdullah Haseeb. Expert advice, quality products. Serving farmers across Bahawalnagar district, Punjab, Pakistan."
        keywords="Bismillah Spray Center Minchinabad, agricultural shop Minchinabad, pesticide dealer Bahawalnagar, farming supplies Punjab, trusted agricultural supplier, authorized dealer Pakistan"
      />

      <AboutHero />
      <MissionVision />
      
      <Suspense fallback={<div className="h-32" />}><CoreValues /></Suspense>
      <Suspense fallback={<div className="h-32" />}><Timeline /></Suspense>
      <Suspense fallback={<div className="h-32" />}><Stats /></Suspense>
      <Suspense fallback={<div className="h-[400px] bg-primary-700" />}><ContactMap /></Suspense>
    </>
  )
}

export default About
