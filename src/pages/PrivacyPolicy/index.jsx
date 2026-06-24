import { memo } from 'react'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'

const PrivacyPolicy = memo(() => {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for Bismillah Spray Center Minchinabad - Learn how we collect, use, and protect your information."
        keywords="privacy policy, Bismillah Spray Center, data protection, Minchinabad"
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
                Our Policies
              </span>
              <div className="h-px w-8 sm:w-12 bg-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="text-primary-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. Read our policy to understand how we handle your information.
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

              <h2 className="text-2xl font-display font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                Bismillah Spray Center ("we", "our", or "us") operates the website and provides agricultural products and services. 
                This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">2. Information We Collect</h2>
              <p className="text-primary-300 mb-3 leading-relaxed">
                We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-primary-300 mb-6 space-y-2">
                <li>Personal identification information (Name, email address, phone number)</li>
                <li>Contact form submissions and service requests</li>
                <li>Usage data and analytics</li>
                <li>Communications you send to us</li>
              </ul>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">3. How We Use Your Information</h2>
              <p className="text-primary-300 mb-3 leading-relaxed">
                We use the collected information for:
              </p>
              <ul className="list-disc list-inside text-primary-300 mb-6 space-y-2">
                <li>Processing your inquiries and requests</li>
                <li>Providing customer support</li>
                <li>Improving our website and services</li>
                <li>Sending relevant updates (with your consent)</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">4. Data Protection</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                disclosure, alteration, or destruction. However, please note that no method of transmission over the Internet 
                is 100% secure.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">5. Cookies</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                Our website may use cookies to enhance your experience. You can choose to set your browser to refuse cookies.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">6. Third-Party Services</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                We may use third-party services such as analytics and social media platforms. These services have their own 
                privacy policies.
              </p>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">7. Your Rights</h2>
              <p className="text-primary-300 mb-3 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-primary-300 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of your data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing</li>
              </ul>

              <h2 className="text-2xl font-display font-bold text-primary mb-4">8. Contact Us</h2>
              <p className="text-primary-300 mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
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

PrivacyPolicy.displayName = 'PrivacyPolicy'

export default PrivacyPolicy
