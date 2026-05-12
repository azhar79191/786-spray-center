import { memo } from 'react'
import ProductCard from '../../../components/cards/ProductCard'
import { SkeletonProductGrid } from '../../../components/loaders/SkeletonLoader'

/**
 * Products Grid Component
 * Displays products in grid or list view
 */
const ProductsGrid = memo(({ products, loading, error, viewMode, clearSearch }) => {
  if (loading) {
    return <SkeletonProductGrid count={12} />
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={clearSearch} className="btn-primary">
          Clear Filters
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-primary-300 text-lg mb-4">No products found matching your criteria.</p>
        <button onClick={clearSearch} className="btn-primary">
          View All Products
        </button>
      </div>
    )
  }

  return (
    <div 
      className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
      role="list"
      aria-label="Products"
    >
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
  )
})

ProductsGrid.displayName = 'ProductsGrid'

export default ProductsGrid
