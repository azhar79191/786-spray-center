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
        description="Learn about Bismillah Spray Center - your trusted agricultural partner in Minchinabad since 2018."
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
