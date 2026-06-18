import { memo } from 'react'
import SectionTitle from '../../../components/common/SectionTitle'
import FAQItem from '../../../components/ui/FAQItem'
import { useData } from '../../../contexts/DataContext'

const FAQPreview = memo(() => {
  const { faqs } = useData()
  const previewFaqs = faqs.slice(0, 5)

  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <SectionTitle title="Frequently Asked Questions" subtitle="Need Help?" />
        <div className="max-w-3xl mx-auto space-y-4">
          {previewFaqs.map((faq, index) => (
            <FAQItem key={faq._id || index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
})

FAQPreview.displayName = 'FAQPreview'

export default FAQPreview
