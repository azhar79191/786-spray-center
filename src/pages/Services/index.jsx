import { lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'
import Spinner from '../../components/loaders/Spinner'

// Eager load
import ServicesHero from './components/ServicesHero'
import ServicesGrid from './components/ServicesGrid'

// Lazy load
const ServicesCTA = lazy(() => import('./components/ServicesCTA'))

const Services = () => {
  return (
    <>
      <SEO 
        title="Agricultural Services" 
        description="Professional agricultural services in Minchinabad: crop consultation, pest identification, disease diagnosis, spraying services, soil testing, fertilizer recommendations, and equipment repair. Expert advice from experienced agronomists."
        keywords="crop consultation Pakistan, pest identification service, agricultural consultant Minchinabad, soil testing Bahawalnagar, spraying services, fertilizer recommendation, farm equipment repair, agronomist consultation"
      />

      {/* Enhanced Structured Data for Services Page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Agricultural Services",
          "name": "Bismillah Spray Center Agricultural Services",
          "description": "Professional agricultural services including crop consultation, pest identification, disease diagnosis, spraying services, and soil testing",
          "url": "https://bismillahspraycenter.vercel.app/services",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Bismillah Spray Center",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Behramka Hithar",
              "addressLocality": "Minchinabad",
              "addressRegion": "Punjab",
              "postalCode": "63350",
              "addressCountry": "PK"
            },
            "telephone": "+923001331616",
            "email": "zafarwattoo@gmail.com"
          },
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "30.225935",
              "longitude": "73.515619"
            },
            "geoRadius": "50000"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Agricultural Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Crop Consultation",
                  "description": "Expert advice on crop management, pest control, and disease prevention"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Pest Identification",
                  "description": "Professional pest identification and control recommendations"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Soil Testing",
                  "description": "Comprehensive soil analysis and fertilizer recommendations"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Spraying Services",
                  "description": "Professional crop spraying and application services"
                }
              }
            ]
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://bismillahspraycenter.vercel.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://bismillahspraycenter.vercel.app/services"
              }
            ]
          }
        })}
      </script>

      {/* SEO-friendly static content for crawlers */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h1>Agricultural Services - Bismillah Spray Center</h1>
        <h2>Professional Farming Solutions in Minchinabad, Pakistan</h2>
        
        <article>
          <h3>Our Agricultural Services</h3>
          <ul>
            <li>Crop Consultation - Expert advice on crop management and cultivation practices</li>
            <li>Pest Identification - Professional identification of pests and insects affecting crops</li>
            <li>Disease Diagnosis - Accurate diagnosis of plant diseases and treatment recommendations</li>
            <li>Spraying Services - Professional crop spraying and pesticide application</li>
            <li>Soil Testing - Comprehensive soil analysis and nutrient management</li>
            <li>Fertilizer Recommendations - Customized fertilizer plans based on soil and crop needs</li>
            <li>Equipment Repair - Repair and maintenance of spray machines and farm equipment</li>
            <li>Technical Support - Ongoing support for agricultural challenges</li>
          </ul>
        </article>
        
        <article>
          <h3>Crop Consultation Services</h3>
          <p>Our experienced agronomists provide expert consultation on all aspects of crop management including:</p>
          <ul>
            <li>Crop selection and variety recommendations</li>
            <li>Planting schedules and techniques</li>
            <li>Irrigation management</li>
            <li>Nutrient management and fertilization</li>
            <li>Pest and disease prevention strategies</li>
            <li>Harvest timing and post-harvest handling</li>
            <li>Yield optimization techniques</li>
          </ul>
        </article>
        
        <article>
          <h3>Pest and Disease Management</h3>
          <p>We offer comprehensive pest and disease management services:</p>
          <ul>
            <li>Field inspection and pest scouting</li>
            <li>Accurate pest identification (insects, mites, nematodes)</li>
            <li>Disease diagnosis (fungal, bacterial, viral)</li>
            <li>Integrated Pest Management (IPM) strategies</li>
            <li>Pesticide selection and application recommendations</li>
            <li>Resistance management strategies</li>
            <li>Monitoring and follow-up services</li>
          </ul>
        </article>
        
        <article>
          <h3>Soil Testing and Analysis</h3>
          <p>Professional soil testing services to optimize crop nutrition:</p>
          <ul>
            <li>Soil sampling and collection</li>
            <li>pH level analysis</li>
            <li>Nutrient content analysis (N, P, K, micronutrients)</li>
            <li>Organic matter assessment</li>
            <li>Soil texture and structure evaluation</li>
            <li>Customized fertilizer recommendations</li>
            <li>Soil amendment suggestions</li>
          </ul>
        </article>
        
        <article>
          <h3>Professional Spraying Services</h3>
          <p>Expert crop spraying and application services:</p>
          <ul>
            <li>Pesticide application with modern equipment</li>
            <li>Proper calibration and dosage</li>
            <li>Timely application based on crop stage</li>
            <li>Safety measures and protective equipment</li>
            <li>Coverage optimization</li>
            <li>Weather-appropriate application</li>
            <li>Post-application monitoring</li>
          </ul>
        </article>
        
        <article>
          <h3>Service Areas</h3>
          <p>We provide agricultural services to farmers in Minchinabad, Bahawalnagar, Chishtian, Haroonabad, Fort Abbas, and surrounding areas in Punjab, Pakistan.</p>
        </article>
        
        <article>
          <h3>Why Choose Our Services?</h3>
          <ul>
            <li>Experienced agronomists and agricultural experts</li>
            <li>Science-based recommendations</li>
            <li>Personalized solutions for each farm</li>
            <li>Affordable service rates</li>
            <li>Quick response time</li>
            <li>Follow-up support</li>
            <li>Latest agricultural knowledge and techniques</li>
          </ul>
        </article>
        
        <article>
          <h3>Contact for Services</h3>
          <p>Phone: +92 300 1331616</p>
          <p>Email: zafarwattoo@gmail.com</p>
          <p>Location: Behramka Hithar, Tehsil Minchinabad, District Bahawalnagar, Punjab, Pakistan</p>
          <p>Visit our store or call us for agricultural consultation and services.</p>
        </article>
      </div>

      <ServicesHero />
      <ServicesGrid />
      
      <Suspense fallback={<div className="flex justify-center py-12"><Spinner /></div>}>
        <ServicesCTA />
      </Suspense>
    </>
  )
}

export default Services
