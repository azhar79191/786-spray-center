import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'

import ServicesHero from './components/ServicesHero'
import ServicesGrid from './components/ServicesGrid'

const ServicesCTA = lazy(() => import('./components/ServicesCTA'))

const SERVICES_STRUCTURED_DATA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Agricultural Services',
  name: 'Bismillah Spray Center Agricultural Services',
  description: 'Professional agricultural services including crop consultation, pest identification, disease diagnosis, spraying services, and soil testing',
  url: 'https://bismillahspraycenter.vercel.app/services',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Bismillah Spray Center',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Behramka Hithar',
      addressLocality: 'Minchinabad',
      addressRegion: 'Punjab',
      postalCode: '63350',
      addressCountry: 'PK',
    },
    telephone: '+923001331616',
    email: 'zafarwattoo@gmail.com',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bismillahspraycenter.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://bismillahspraycenter.vercel.app/services' },
    ],
  },
})

const Services = () => {
  return (
    <>
      <SEO
        title="Agricultural Services"
        description="Professional agricultural services in Minchinabad: crop consultation, pest identification, disease diagnosis, spraying services, soil testing, fertilizer recommendations, and equipment repair. Expert advice from experienced agronomists."
        keywords="crop consultation Pakistan, pest identification service, agricultural consultant Minchinabad, soil testing Bahawalnagar, spraying services, fertilizer recommendation, farm equipment repair, agronomist consultation"
      />

      <script type="application/ld+json">{SERVICES_STRUCTURED_DATA}</script>

      <ServicesHero />
      <ServicesGrid />

      <Suspense fallback={<div className="h-32" />}>
        <ServicesCTA />
      </Suspense>
    </>
  )
}

export default Services
