import { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '../../../components/common/SectionTitle'
import TestimonialCard from '../../../components/cards/TestimonialCard'
import { useData } from '../../../contexts/DataContext'
import { TESTIMONIALS } from '../../../utils/constants'

const Testimonials = memo(() => {
  const { testimonials: apiTestimonials } = useData()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const testimonials = apiTestimonials.length > 0
    ? apiTestimonials.slice(0, 4).map(item => ({
        name: item.name,
        role: item.location || 'Valued Customer',
        content: item.message,
        rating: item.rating,
        productUsed: item.productUsed,
      }))
    : TESTIMONIALS

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (isMobile && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isMobile, testimonials.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-premium">
        <SectionTitle
          title="What Farmers Say"
          subtitle="Testimonials"
          light
        />
        
        {/* Mobile Carousel */}
        {isMobile ? (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} index={0} />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-gold w-6' : 'bg-primary-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name + index} testimonial={testimonial} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'

export default Testimonials
