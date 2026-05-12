import { memo, useState, useEffect } from 'react'
import SectionTitle from '../../../components/common/SectionTitle'
import TestimonialCard from '../../../components/cards/TestimonialCard'
import Spinner from '../../../components/loaders/Spinner'
import { getApprovedTestimonials } from '../../../services/testimonialService'
import { TESTIMONIALS } from '../../../utils/constants'

/**
 * Testimonials Section
 * Customer reviews and feedback - fetches from API with fallback to constants
 */
const Testimonials = memo(() => {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await getApprovedTestimonials({ limit: 4 })
      if (response.data && response.data.length > 0) {
        // Transform API data to match the expected format
        const transformedData = response.data.map(item => ({
          name: item.name,
          role: item.location || 'Valued Customer',
          content: item.message,
          rating: item.rating,
          productUsed: item.productUsed,
        }))
        setTestimonials(transformedData)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials, using fallback data:', error)
      // Keep using TESTIMONIALS constant as fallback
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-premium">
        <SectionTitle
          title="What Farmers Say"
          subtitle="Testimonials"
          light
        />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : (
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
