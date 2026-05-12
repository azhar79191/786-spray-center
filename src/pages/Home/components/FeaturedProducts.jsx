import { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import SectionTitle from '../../../components/common/SectionTitle'
import ProductCard from '../../../components/cards/ProductCard'
import { useProducts } from '../../../hooks/useProducts'
import { SkeletonProductGrid } from '../../../components/loaders/SkeletonLoader'

/**
 * Featured Products Section
 * Displays featured products with lazy loading
 */
const FeaturedProducts = memo(() => {
  const { featuredProducts, fetchFeatured, loading } = useProducts()

  useEffect(() => {
    fetchFeatured(6)
  }, [fetchFeatured])

  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <SectionTitle
          title="Featured Products"
          subtitle="Our Best Sellers"
        />

        {loading ? (
          <SkeletonProductGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/products" className="btn-primary">
            View All Products
            <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
})

FeaturedProducts.displayName = 'FeaturedProducts'

export default FeaturedProducts
