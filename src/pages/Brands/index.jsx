import { useState, useEffect, lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'
import { getAllBrands } from '../../services/brandService'
import Spinner from '../../components/loaders/Spinner'
import BrandsHero from './components/BrandsHero'
import BrandsGrid from './components/BrandsGrid'

const WhyBrandsMatter = lazy(() => import('./components/WhyBrandsMatter'))
const BrandsCTA = lazy(() => import('./components/BrandsCTA'))

const Brands = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      setLoading(true)
      const response = await getAllBrands({ isActive: true })
      setBrands(response.data || [])
    } catch (error) {
      console.error('Failed to fetch brands:', error)
      setBrands([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Our Brands" 
        description="We are authorized dealers of Syngenta, Bayer, FMC, Engro, Fauji, Pioneer, Honda, and Stihl agricultural products."
      />

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

      <Suspense fallback={<div className="flex justify-center py-12"><Spinner /></div>}>
        <WhyBrandsMatter />
        <BrandsCTA />
      </Suspense>
    </>
  )
}

export default Brands
