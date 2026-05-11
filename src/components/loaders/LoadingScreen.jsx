import { motion } from 'framer-motion'

/**
 * Full-screen loading component
 * Used during initial page load and lazy loading
 */
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Logo animation */}
        <div className="relative mb-8">
          <motion.div
            className="w-20 h-20 rounded-full border-4 border-gold border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gold text-2xl font-display font-bold">B</span>
          </motion.div>
        </div>

        {/* Text */}
        <motion.h2
          className="text-gold text-xl font-display font-bold tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Bismillah Spray Center
        </motion.h2>

        <motion.p
          className="text-primary-400 text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Loading premium agricultural solutions...
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="mt-6 w-48 h-1 bg-primary-50 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-gold-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoadingScreen
