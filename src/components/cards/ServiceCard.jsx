import { motion } from 'framer-motion'
import {
  GiFarmer,
  GiMicroscope,
  GiSpray,
  GiTestTubes,
  GiWrench,
  GiDeliveryDrone,
  GiInsectJaws,
  GiPlantRoots,
  GiMushroomGills,
  GiFertilizerBag,
  GiSeedling,
  GiCheckMark,
  GiTeacher,
  GiPriceTag,
  GiTruck,
} from 'react-icons/gi'

/**
 * Service card component
 * Displays services with icon, title, and description
 */

// Icon mapping - only import what we need
const iconMap = {
  GiFarmer,
  GiMicroscope,
  GiSpray,
  GiTestTubes,
  GiWrench,
  GiDeliveryDrone,
  GiInsectJaws,
  GiPlantRoots,
  GiMushroomGills,
  GiFertilizerBag,
  GiSeedling,
  GiCheckMark,
  GiTeacher,
  GiPriceTag,
  GiTruck,
}

const ServiceCard = ({ service, index = 0 }) => {
  // Dynamic icon loading from specific imports only
  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || GiSpray
    return <IconComponent className="w-8 h-8" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gold/20"
    >
      {/* Icon */}
      <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-primary transition-all duration-300">
        {getIcon(service.icon)}
      </div>

      {/* Title */}
      <h3 className="text-primary font-display font-bold text-xl mb-3 group-hover:text-gold transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-primary-300 text-sm leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  )
}

export default ServiceCard
