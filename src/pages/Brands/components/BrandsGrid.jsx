import { memo } from 'react'
import { motion } from 'framer-motion'

const BrandsGrid = memo(({ brands }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {brands.map((brand, index) => (
        <motion.div
          key={brand._id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.05,
            y: -5
          }}
          className="bg-white rounded-2xl p-4 md:p-6 shadow-card hover:shadow-gold-lg transition-all duration-300 flex items-center justify-center group border border-transparent hover:border-gold/30"
        >
          <div className="text-center">
            <div className="relative overflow-hidden mb-3">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full h-12 md:h-20 object-contain mx-auto transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <h3 className="font-semibold text-primary text-xs md:text-sm group-hover:text-gold transition-colors duration-300">{brand.name}</h3>
            {brand.country && (
              <p className="text-xs text-primary-300 mt-1 group-hover:text-primary-400 transition-colors duration-300">{brand.country}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
})

BrandsGrid.displayName = 'BrandsGrid'

export default BrandsGrid
