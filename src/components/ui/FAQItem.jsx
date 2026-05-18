import { useState } from 'react'
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa'

/**
 * Optimized FAQ accordion item component
 * Uses CSS transitions instead of Framer Motion for better performance
 */
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-primary-700/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FaQuestionCircle className="w-5 h-5 text-gold" />
          </div>
          <h3 className="text-primary font-semibold text-sm md:text-base pr-4">
            {faq.question}
          </h3>
        </div>
        <div className="flex-shrink-0">
          <FaChevronDown 
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-gold' : 'text-primary-300'
            }`} 
          />
        </div>
      </button>

      {/* Answer section with CSS transition */}
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pl-20">
          <p className="text-primary-300 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FAQItem
