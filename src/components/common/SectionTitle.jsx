import { motion } from 'framer-motion'

/**
 * Reusable section title component
 * Provides consistent heading styling with animations
 */
const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = true, 
  light = false,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      {/* Decorative line */}
      <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
        <div className="h-px w-12 bg-gold" />
        <span className={`text-sm font-semibold tracking-widest uppercase ${light ? 'text-gold-300' : 'text-gold'}`}>
          {subtitle}
        </span>
        <div className="h-px w-12 bg-gold" />
      </div>

      {/* Title */}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
    </motion.div>
  )
}

export default SectionTitle
