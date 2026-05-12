import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import SectionTitle from '../../../components/common/SectionTitle'
import FAQItem from '../../../components/ui/FAQItem'
import { useFetch } from '../../../hooks/useFetch'
import { SkeletonText } from '../../../components/loaders/SkeletonLoader'

/**
 * FAQ Preview Section
 * Displays top FAQs
 */
const FAQPreview = memo(() => {
  const { data: faqData } = useFetch('/faqs', { params: { limit: 5 } })
  const faqs = faqData?.data?.slice(0, 5) || []

  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Need Help?"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <FAQItem key={faq._id || index} faq={faq} index={index} />
            ))
          ) : (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-card">
                  <SkeletonText lines={2} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/faq" className="btn-primary">
            View All FAQs
            <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
})

FAQPreview.displayName = 'FAQPreview'

export default FAQPreview
