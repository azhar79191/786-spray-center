import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaArrowRight, 
  FaLeaf, 
  FaPhone, 
  FaClock,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaChevronRight
} from 'react-icons/fa'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'
import ProductCard from '../../components/cards/ProductCard'
import TestimonialCard from '../../components/cards/TestimonialCard'
import ServiceCard from '../../components/cards/ServiceCard'
import FAQItem from '../../components/ui/FAQItem'
import { useProducts } from '../../hooks/useProducts'
import { useFetch } from '../../hooks/useFetch'
import { SkeletonProductGrid, SkeletonText } from '../../components/loaders/SkeletonLoader'
import { 
  WHY_CHOOSE_US, 
  TESTIMONIALS, 
  SERVICES,
  BUSINESS_HOURS,
  CONTACT,
  GALLERY_IMAGES 
} from '../../utils/constants'
import { getWhatsAppLink, getPhoneLink } from '../../utils/helpers'

/**
 * Home Page
 * Main landing page with all sections
 */
const Home = () => {
  const { featuredProducts, fetchFeatured, loading: productsLoading } = useProducts()
  const { data: faqData } = useFetch('/faqs', { params: { limit: 5 } })

  useEffect(() => {
    fetchFeatured(6)
  }, [fetchFeatured])

  const faqs = faqData?.data?.slice(0, 5) || []

  return (
    <>
      <SEO 
        title="Home" 
        description="Premium agricultural pesticides, fertilizers, and seeds in Minchinabad, Pakistan. Trusted by farmers since 2018."
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />

        <div className="container-premium relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                  Since 2018
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
                Premium
                <span className="text-gold block">Agricultural</span>
                Solutions
              </h1>

              <p className="text-primary-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                Your trusted partner for genuine pesticides, fertilizers, and seeds in Minchinabad, Pakistan.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary text-lg">
                  Explore Products
                  <FaArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn-secondary text-lg">
                  Contact Us
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-primary-50">
                <div>
                  <p className="text-gold text-3xl font-bold">8+</p>
                  <p className="text-primary-400 text-sm">Years Experience</p>
                </div>
                <div className="h-12 w-px bg-primary-50" />
                <div>
                  <p className="text-gold text-3xl font-bold">1500+</p>
                  <p className="text-primary-400 text-sm">Happy Farmers</p>
                </div>
                <div className="h-12 w-px bg-primary-50" />
                <div>
                  <p className="text-gold text-3xl font-bold">50+</p>
                  <p className="text-primary-400 text-sm">Products</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/20 rounded-3xl blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
                  alt="Agricultural products"
                  className="relative rounded-3xl shadow-premium w-full h-[500px] object-cover"
                />

                {/* Floating card */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-premium"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                      <FaLeaf className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary font-bold">100% Genuine</p>
                      <p className="text-primary-300 text-sm">Original Products</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <SectionTitle
            title="Featured Products"
            subtitle="Our Best Sellers"
          />

          {productsLoading ? (
            <SkeletonProductGrid count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              View All Products
              <FaArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-primary text-white">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80"
                alt="About Bismillah Spray Center"
                className="rounded-3xl shadow-premium w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold text-sm font-semibold tracking-widest uppercase">About Us</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Trusted by Farmers Across <span className="text-gold">Punjab</span>
              </h2>

              <p className="text-primary-400 leading-relaxed mb-6">
                Bismillah Spray Center has been serving the agricultural community of Minchinabad and surrounding areas since 2018. We provide genuine, high-quality agricultural inputs including pesticides, fertilizers, seeds, and spraying equipment from world-renowned brands.
              </p>

              <p className="text-primary-400 leading-relaxed mb-8">
                Our team of experienced agronomists offers free crop consultation, pest identification, and customized treatment recommendations to help farmers maximize their yields and profits.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="btn-primary">
                  Learn More
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
                  Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <SectionTitle
            title="Why Choose Us"
            subtitle="Our Advantages"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center group"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold transition-colors duration-300">
                  <span className="text-gold text-2xl group-hover:text-primary transition-colors">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-primary font-display font-bold text-xl mb-3 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-primary-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-16 bg-gold">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                Visit Us Today
              </h2>
              <p className="text-primary/70 mb-8">
                Our shop is conveniently located on Behramka Hithar Tehsil Minchinabdad. Visit us for all your agricultural needs.
              </p>

              <div className="space-y-4">
                {BUSINESS_HOURS.map((item) => (
                  <div key={item.day} className="flex items-center justify-between bg-white/20 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <FaClock className="w-5 h-5 text-primary" />
                      <span className="text-primary font-medium">{item.day}</span>
                    </div>
                    <span className="text-primary font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-premium"
            >
              <h3 className="text-primary font-display font-bold text-2xl mb-6">
                Quick Contact
              </h3>

              <div className="space-y-4">
                <a href={getPhoneLink(CONTACT.phone)} className="flex items-center gap-4 p-4 bg-primary-700 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPhone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-xs">Phone</p>
                    <p className="text-primary font-semibold">{CONTACT.phone}</p>
                  </div>
                </a>

                <a href={getWhatsAppLink(CONTACT.whatsapp)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-primary-700 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-xs">WhatsApp</p>
                    <p className="text-primary font-semibold">+92-{CONTACT.whatsapp.slice(2)}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-primary-700 rounded-xl">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-primary-300 text-xs">Address</p>
                    <p className="text-primary font-semibold text-sm">{CONTACT.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <SectionTitle
            title="Our Services"
            subtitle="What We Offer"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              All Services
              <FaArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary text-white">
        <div className="container-premium">
          <SectionTitle
            title="What Farmers Say"
            subtitle="Testimonials"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
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

      {/* Contact CTA */}
      <section className="py-20 bg-gold">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-6">
              Ready to Boost Your Crop Yield?
            </h2>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto mb-8">
              Contact us today for expert advice and premium agricultural products. Our team is ready to help you achieve maximum productivity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-dark text-lg">
                Get in Touch
              </Link>
              <a 
                href={getWhatsAppLink(CONTACT.whatsapp, 'Hello, I would like to inquire about your products.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-green-700"
              >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
