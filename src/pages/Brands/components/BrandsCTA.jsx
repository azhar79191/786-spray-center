import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const BrandsCTA = memo(() => {
  return (
    <section className="py-20 bg-gold">
      <div className="container-premium text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
          Browse Products by Brand
        </h2>
        <p className="text-primary/70 text-lg max-w-2xl mx-auto mb-8">
          Explore our complete range of products from all partner brands.
        </p>
        <Link to="/products" className="btn-dark text-lg">
          View All Products
          <FaArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </section>
  )
})

BrandsCTA.displayName = 'BrandsCTA'

export default BrandsCTA
