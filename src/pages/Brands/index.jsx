import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'
import { useBrands } from '../../hooks/useBrands'
import Spinner from '../../components/loaders/Spinner'
import BrandsHero from './components/BrandsHero'
import BrandsGrid from './components/BrandsGrid'

const WhyBrandsMatter = lazy(() => import('./components/WhyBrandsMatter'))
const BrandsCTA = lazy(() => import('./components/BrandsCTA'))

const BRANDS_STRUCTURED_DATA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Premium Agricultural Brands',
  description: 'Authorized dealer of world-leading agricultural brands including Syngenta, Bayer, FMC, Engro, and more',
  url: 'https://bismillahspraycenter.vercel.app/brands',
  inLanguage: 'en-PK',
  isPartOf: { '@type': 'WebSite', name: 'Bismillah Spray Center', url: 'https://bismillahspraycenter.vercel.app' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bismillahspraycenter.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: 'https://bismillahspraycenter.vercel.app/brands' },
    ],
  },
})

const Brands = () => {
  const { brands, loading } = useBrands()

  return (
    <>
      <SEO
        title="Premium Agricultural Brands"
        description="Authorized dealer of world-leading agricultural brands: Syngenta, Bayer CropScience, FMC, Engro Fertilizers, Fauji Fertilizer, Pioneer Seeds, Honda Power Equipment, and Stihl. Genuine products with warranty and expert support."
        keywords="Syngenta dealer Pakistan, Bayer authorized dealer, FMC products Pakistan, Engro fertilizers dealer, Fauji fertilizer distributor, Pioneer seeds Pakistan, Honda power equipment, Stihl dealer, agricultural brands Minchinabad"
      />

      <script type="application/ld+json">{BRANDS_STRUCTURED_DATA}</script>

      <BrandsHero />

      <section className="section-padding bg-surface">
        <div className="container-premium">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : brands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 text-lg">No brands available at the moment.</p>
            </div>
          ) : (
            <BrandsGrid brands={brands} />
          )}
        </div>
      </section>

      <Suspense fallback={<div className="h-32" />}><WhyBrandsMatter /></Suspense>
      <Suspense fallback={<div className="h-32" />}><BrandsCTA /></Suspense>
    </>
  )
}

export default Brands
