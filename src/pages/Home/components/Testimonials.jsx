import { memo } from 'react'
import SectionTitle from '../../../components/common/SectionTitle'
import TestimonialCard from '../../../components/cards/TestimonialCard'
import { useData } from '../../../contexts/DataContext'
import { TESTIMONIALS } from '../../../utils/constants'

const Testimonials = memo(() => {
  const { testimonials: apiTestimonials } = useData()

  const testimonials = apiTestimonials.length > 0
    ? apiTestimonials.slice(0, 4).map(item => ({
        name: item.name,
        role: item.location || 'Valued Customer',
        content: item.message,
        rating: item.rating,
        productUsed: item.productUsed,
      }))
    : TESTIMONIALS

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-premium">
        <SectionTitle
          title="What Farmers Say"
          subtitle="Testimonials"
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name + index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'

export default Testimonials
