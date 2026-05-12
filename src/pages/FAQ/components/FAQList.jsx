import { memo } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import FAQItem from '../../../components/ui/FAQItem'
import { SkeletonText } from '../../../components/loaders/SkeletonLoader'

const FAQList = memo(({ loading, filteredFAQs, clearFilters }) => {
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-card">
            <SkeletonText lines={2} />
          </div>
        ))}
      </div>
    )
  }

  if (filteredFAQs.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <FaQuestionCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
        <p className="text-primary-300 text-lg">No questions found matching your search.</p>
        <button 
          onClick={clearFilters}
          className="btn-primary mt-4"
        >
          Clear Filters
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {filteredFAQs.map((faq, index) => (
        <FAQItem key={faq._id || index} faq={faq} index={index} />
      ))}
    </div>
  )
})

FAQList.displayName = 'FAQList'

export default FAQList
