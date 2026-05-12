import { memo } from 'react'
import { CONTACT } from '../../../utils/constants'

/**
 * Contact Map Component
 * Google Maps embed
 */
const ContactMap = memo(() => {
  return (
    <section className="h-[400px] bg-primary-700">
      {CONTACT.googleMapsEmbed ? (
        <iframe
          src={CONTACT.googleMapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bismillah Spray Center Location"
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-primary-400">Map loading...</p>
        </div>
      )}
    </section>
  )
})

ContactMap.displayName = 'ContactMap'

export default ContactMap
