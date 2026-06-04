import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSeedling, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const TIPS = [
  { text: 'Apply fungicides early morning or evening for best absorption', link: '/products' },
  { text: 'Syngenta & Bayer products available — genuine & certified', link: '/brands' },
  { text: 'Free crop consultation — visit us in Minchinabad', link: '/contact' },
  { text: 'Bulk orders get special pricing — call us today', link: '/contact' },
  { text: 'Check our latest pesticide stock before the season peaks', link: '/products' },
]

const getSeason = () => {
  const month = new Date().getMonth() + 1 // 1–12
  // Kharif: April–October | Rabi: November–March
  if (month >= 4 && month <= 10) {
    return { name: 'Kharif Season', color: 'text-emerald-400', desc: 'Cotton • Rice • Maize' }
  }
  return { name: 'Rabi Season', color: 'text-amber-400', desc: 'Wheat • Mustard • Gram' }
}

const CropSeasonTicker = () => {
  const [tipIndex, setTipIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const season = getSeason()

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(i => (i + 1) % TIPS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  const currentTip = TIPS[tipIndex]

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-primary-50 border-b border-gold/20 flex items-center overflow-hidden">
      {/* Season badge */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 border-r border-gold/20 h-full bg-primary">
        <FaSeedling className="w-3 h-3 text-gold" />
        <span className={`text-xs font-semibold whitespace-nowrap ${season.color}`}>
          {season.name}
        </span>
        <span className="hidden sm:inline text-primary-400 text-xs">— {season.desc}</span>
      </div>

      {/* Rotating tip */}
      <div className="flex-1 relative overflow-hidden flex items-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={tipIndex}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-center px-4"
          >
            <Link
              to={currentTip.link}
              className="flex items-center gap-2 group w-full"
            >
              <span className="text-xs text-primary-300 truncate group-hover:text-white transition-colors">
                {currentTip.text}
              </span>
              <FaChevronRight className="w-2.5 h-2.5 text-gold flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tip dots */}
      <div className="flex-shrink-0 flex items-center gap-1 px-3 border-l border-gold/20 h-full">
        {TIPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setTipIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === tipIndex ? 'bg-gold scale-125' : 'bg-primary-300'
            }`}
          />
        ))}
      </div>

      {/* Close */}
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 px-3 h-full text-primary-400 hover:text-white transition-colors text-xs border-l border-gold/20"
        aria-label="Close ticker"
      >
        ✕
      </button>
    </div>
  )
}

export default CropSeasonTicker
