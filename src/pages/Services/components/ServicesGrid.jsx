import { memo } from 'react'
import ServiceCard from '../../../components/cards/ServiceCard'
import { SERVICES } from '../../../utils/constants'

const ServicesGrid = memo(() => {
  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
})

ServicesGrid.displayName = 'ServicesGrid'

export default ServicesGrid
