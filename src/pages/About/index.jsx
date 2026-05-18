import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'
import Spinner from '../../components/loaders/Spinner'

// Eager load
import AboutHero from './components/AboutHero'
import MissionVision from './components/MissionVision'

// Lazy load
const CoreValues = lazy(() => import('./components/CoreValues'))
const Timeline = lazy(() => import('./components/Timeline'))
const Stats = lazy(() => import('./components/Stats'))

const About = () => {
  return (
    <>
      <SEO 
        title="About Us" 
        description="Bismillah Spray Center - Your trusted agricultural partner in Minchinabad since 2018. Authorized dealer of premium brands: Syngenta, Bayer, FMC, Engro. Serving farmers across Bahawalnagar, Punjab with quality products, expert advice, and competitive prices."
        keywords="about Bismillah Spray Center, agricultural dealer Minchinabad, Syngenta authorized dealer, Bayer dealer Pakistan, farming supplies Bahawalnagar, agricultural company Punjab, pesticide distributor"
      />

      <AboutHero />
      <MissionVision />
      
      <Suspense fallback={<div className="flex justify-center py-12"><Spinner /></div>}>
        <CoreValues />
        <Timeline />
        <Stats />
      </Suspense>
    </>
  )
}

export default About
