import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import SectionTitle from '../../../components/common/SectionTitle'
import ServiceCard from '../../../components/cards/ServiceCard'
import { SERVICES } from '../../../utils/constants'

/**
 * Services Preview Section
 * Displays featured services
 */
const ServicesPreview = memo(() => {
  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <SectionTitle
          title="Our Services"
          subtitle="What We Offer"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 6).map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-primary">
            All Services
            <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
})

ServicesPreview.displayName = 'ServicesPreview'

export default ServicesPreview
