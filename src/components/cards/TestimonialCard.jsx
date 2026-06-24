import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import { getStarRating } from '../../utils/helpers'

/**
 * Testimonial card component
 * Displays customer reviews with star ratings
 */
const TestimonialCard = ({ testimonial, index = 0 }) => {
  const stars = getStarRating(testimonial.rating)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 relative"
    >
      {/* Quote icon */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 text-gold/20">
        <FaQuoteLeft className="w-8 h-8 md:w-10 md:h-10" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {stars.map((star, i) => (
          <FaStar
            key={i}
            className={`w-3 h-3 md:w-4 md:h-4 ${
              star === 'full' 
                ? 'text-gold' 
                : star === 'half' 
                  ? 'text-gold/50' 
                  : 'text-primary-500'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-primary-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 italic">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold/10 flex items-center justify-center">
          <span className="text-gold font-bold text-base md:text-lg">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="text-primary font-semibold text-xs md:text-sm">{testimonial.name}</h4>
          <p className="text-primary-300 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard
