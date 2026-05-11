import { motion } from 'framer-motion'

/**
 * Brand logo display component
 * Shows brand name with styled container
 */
const BrandLogo = ({ brand, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
    >
      {/* Brand initials circle */}
      <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-300">
        <span className="text-gold font-display font-bold text-xl group-hover:text-primary transition-colors">
          {brand.name.charAt(0)}
        </span>
      </div>

      {/* Brand name */}
      <h3 className="text-primary font-semibold text-lg mb-1 group-hover:text-gold transition-colors">
        {brand.name}
      </h3>

      {/* Country */}
      <p className="text-primary-300 text-xs">
        {brand.country}
      </p>
    </motion.div>
  )
}

export default BrandLogo
