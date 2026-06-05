import { motion } from 'framer-motion'
import { FaShoppingCart } from 'react-icons/fa'

/**
 * Floating Action Button Component
 * Used for quick actions like cart, filters, etc.
 */
const FloatingActionButton = ({ 
  icon: Icon = FaShoppingCart, 
  onClick, 
  badge = 0,
  position = 'bottom-right',
  color = 'gold',
  ariaLabel = 'Action button'
}) => {
  const positions = {
    'bottom-right': 'bottom-20 right-6',
    'bottom-left': 'bottom-20 left-6',
    'top-right': 'top-20 right-6',
    'top-left': 'top-20 left-6',
  }

  const colors = {
    gold: 'bg-gold text-primary hover:bg-gold-600',
    primary: 'bg-primary text-white hover:bg-primary-50',
    white: 'bg-white text-primary hover:bg-primary-700',
  }

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`fixed ${positions[position]} ${colors[color]} w-14 h-14 rounded-full shadow-2xl z-40 flex items-center justify-center`}
      aria-label={ariaLabel}
    >
      <Icon className="w-6 h-6" />
      
      {badge > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
        >
          {badge > 99 ? '99+' : badge}
        </motion.span>
      )}
    </motion.button>
  )
}

export default FloatingActionButton
