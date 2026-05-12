import { memo } from 'react'
import { motion } from 'framer-motion'

const BrandsGrid = memo(({ brands }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {brands.map((brand, index) => (
        <motion.article
          key={brand._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center justify-center group"
        >
          <div className="text-center">
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-w-full h-20 object-contain mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <h3 className="font-semibold text-primary text-sm">{brand.name}</h3>
            {brand.country && (
              <p className="text-xs text-primary-300 mt-1">{brand.country}</p>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  )
})

BrandsGrid.displayName = 'BrandsGrid'

export default BrandsGrid
