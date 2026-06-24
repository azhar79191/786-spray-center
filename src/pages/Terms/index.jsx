import { memo } from 'react'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'

const TermsAndConditions = memo(() => {
  return (
    <>
      <SEO 
        title="Terms and Conditions" 
        description="Terms and Conditions for Bismillah Spray Center Minchinabad - Rules and regulations for using our website and services."
        keywords="terms of service, terms and conditions, Bismillah Spray Center, Minchinabad"
      />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80" />

        <div className="container-premium relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="h-px w-8 sm:w-12 bg-gold" />
              <span className="text-gold text-xs sm:text-sm font-semibold tracking-widest uppercase">
                Legal Information
              </span>
              <div className="h-px w-8 sm:w-12 bg-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
              Terms & <span className="text-gold">Conditions</span>
            </h1>
            <p className="text-primary-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using our website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface">
        <div className="container-premium max-w-4xl">
          <div className="bg-white rounded-2xl shadow-card p-6 sm:p-10">
            <div className="prose prose-primary max-w-none">
              <p className="text-primary-300 mb-6">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">1. Acceptance of Terms</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. 
                If you do not agree with any part of these terms, please do not use our website.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">2. Use of Website</h2>
              <p className="text-primary-300 mb-3 leading-relaxed">
                You agree to use our website only for lawful purposes and in a way that does not infringe on the rights of others:
              </p>
              <ul className="list-disc list-inside text-primary-300 mb-6 space-y-2">
                <li>Do not use the website for any illegal or unauthorized purpose</li>
                <li>Do not attempt to gain unauthorized access to any part of the website</li>
                <li>Do not interfere with the proper working of the website</li>
              </ul>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">3. Products and Services</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                We provide agricultural products and services information. Product details, prices, and availability are 
                subject to change without notice. We make every effort to display accurate product information, but we 
                do not warrant that descriptions or pricing are error-free.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">4. Intellectual Property</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of 
                Bismillah Spray Center and is protected by copyright laws.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">5. Limitation of Liability</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                Bismillah Spray Center shall not be liable for any direct, indirect, incidental, special, or consequential 
                damages arising out of your use of this website or products.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">6. Third-Party Links</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                Our website may contain links to third-party websites. These links are provided for your convenience only. 
                We have no control over and are not responsible for the content or practices of these websites.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">7. Changes to Terms</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately 
                upon posting to the website.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">8. Governing Law</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of Pakistan, specifically the 
                jurisdiction of Bahawalnagar.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">9. Contact Us</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-primary-50 p-6 rounded-xl">
                <p className="text-primary font-semibold mb-1">Bismillah Spray Center</p>
                <p className="text-primary-300 mb-1">Minchinabad, Bahawalnagar, Punjab, Pakistan</p>
                <p className="text-primary-300">Phone: +92 300 123 4567</p>
                <p className="text-primary-300">Email: info@bismillahspraycenter.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
})

TermsAndConditions.displayName = 'TermsAndConditions'

export default TermsAndConditions
