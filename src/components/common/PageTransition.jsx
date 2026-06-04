import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
}

const PageTransition = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Gold flash line that sweeps across on entry */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-gold z-[999] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1] }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
