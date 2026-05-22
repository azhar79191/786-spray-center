import { useState, lazy, Suspense } from 'react'
import SEO from '../../components/common/SEO'
import { useBrands } from '../../hooks/useBrands'
import Spinner from '../../components/loaders/Spinner'
import BrandsHero from './components/BrandsHero'
import BrandsGrid from './components/BrandsGrid'

const WhyBrandsMatter = lazy(() => import('./components/WhyBrandsMatter'))
const BrandsCTA = lazy(() => import('./components/BrandsCTA'))

const Brands = () => {
  // Use preloaded data from DataContext - instant loading!
  const { brands, loading } = useBrands()

  return (
    <>
      <SEO 
        title="Premium Agricultural Brands" 
        description="Authorized dealer of world-leading agricultural brands: Syngenta, Bayer CropScience, FMC, Engro Fertilizers, Fauji Fertilizer, Pioneer Seeds, Honda Power Equipment, and Stihl. Genuine products with warranty and expert support."
        keywords="Syngenta dealer Pakistan, Bayer authorized dealer, FMC products Pakistan, Engro fertilizers dealer, Fauji fertilizer distributor, Pioneer seeds Pakistan, Honda power equipment, Stihl dealer, agricultural brands Minchinabad"
      />

      {/* Enhanced Structured Data for Brands Page */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Premium Agricultural Brands",
          "description": "Authorized dealer of world-leading agricultural brands including Syngenta, Bayer, FMC, Engro, and more",
          "url": "https://bismillahspraycenter.vercel.app/brands",
          "inLanguage": "en-PK",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Bismillah Spray Center",
            "url": "https://bismillahspraycenter.vercel.app"
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": "Agricultural Brands",
            "description": "Leading agricultural brands available at Bismillah Spray Center",
            "numberOfItems": brands.length || 10,
            "itemListElement": brands.slice(0, 10).map((brand, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Brand",
                "name": brand.name,
                "description": brand.description,
                "logo": brand.logo,
                "url": brand.website
              }
            }))
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
                "name": "Brands",
                "item": "https://bismillahspraycenter.vercel.app/brands"
              }
            ]
          }
        })}
      </script>

      {/* SEO-friendly static content for crawlers */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h1>Premium Agricultural Brands - Bismillah Spray Center</h1>
        <h2>Authorized Dealer of World-Leading Agricultural Companies</h2>
        
        <article>
          <h3>Featured Brands</h3>
          <ul>
            <li>Syngenta - Global leader in crop protection and seeds technology</li>
            <li>Bayer CropScience - Innovative solutions for sustainable agriculture</li>
            <li>FMC Corporation - Advanced pest control and crop protection products</li>
            <li>Engro Fertilizers - Premium fertilizer solutions for Pakistani farmers</li>
            <li>Fauji Fertilizer Company - Trusted fertilizer manufacturer in Pakistan</li>
            <li>ICI Pakistan - Quality agricultural chemicals and solutions</li>
            <li>Four Brothers - Reliable pesticides and fertilizers</li>
            <li>Ali Akbar Group - Agricultural products for all crops</li>
            <li>Pioneer Seeds - High-yielding hybrid seeds</li>
            <li>Honda Power Equipment - Quality agricultural machinery</li>
          </ul>
        </article>
        
        <article>
          <h3>Syngenta Products</h3>
          <p>As an authorized Syngenta dealer, we offer their complete range of crop protection products:</p>
          <ul>
            <li>Insecticides - Actara, Proclaim, Vertimec, Polo</li>
            <li>Herbicides - Gramoxone, Dual Gold, Gesaprim</li>
            <li>Fungicides - Amistar, Score, Ridomil Gold</li>
            <li>Seeds - Hybrid corn, sunflower, and vegetable seeds</li>
            <li>Plant Growth Regulators</li>
          </ul>
        </article>
        
        <article>
          <h3>Bayer CropScience Products</h3>
          <p>Genuine Bayer products available at our store:</p>
          <ul>
            <li>Insecticides - Confidor, Decis, Calypso</li>
            <li>Herbicides - Atlantis, Hussar, Laudis</li>
            <li>Fungicides - Nativo, Folicur, Antracol</li>
            <li>Seed Treatment - Gaucho, Poncho</li>
            <li>Crop Enhancement Products</li>
          </ul>
        </article>
        
        <article>
          <h3>FMC Corporation Products</h3>
          <p>Complete range of FMC agricultural solutions:</p>
          <ul>
            <li>Insecticides - Coragen, Belt, Talstar</li>
            <li>Herbicides - Authority, Command</li>
            <li>Fungicides - Tilt, Bravo</li>
            <li>Specialty Products</li>
          </ul>
        </article>
        
        <article>
          <h3>Engro Fertilizers</h3>
          <p>Premium fertilizers from Engro for optimal crop nutrition:</p>
          <ul>
            <li>Urea - High-quality nitrogen fertilizer</li>
            <li>DAP - Diammonium Phosphate</li>
            <li>NP Fertilizers - Balanced nutrition</li>
            <li>Specialty Fertilizers</li>
            <li>Zarkhez - Organic fertilizer</li>
          </ul>
        </article>
        
        <article>
          <h3>Why Choose Authorized Brands?</h3>
          <ul>
            <li>Genuine Products - 100% authentic products with quality guarantee</li>
            <li>Manufacturer Warranty - Full warranty and support from brands</li>
            <li>Expert Support - Technical support and guidance from brand experts</li>
            <li>Latest Technology - Access to newest formulations and innovations</li>
            <li>Proven Results - Field-tested and proven effective products</li>
            <li>Safety Standards - Products meeting international safety standards</li>
            <li>Competitive Pricing - Best prices for genuine branded products</li>
          </ul>
        </article>
        
        <article>
          <h3>Product Categories by Brand</h3>
          <p>We stock a comprehensive range of products from all major brands:</p>
          <ul>
            <li>Pesticides - Insecticides, herbicides, fungicides, acaricides</li>
            <li>Fertilizers - Urea, DAP, NPK, micronutrients, organic fertilizers</li>
            <li>Seeds - Hybrid seeds, certified seeds, vegetable seeds</li>
            <li>Plant Growth Regulators - Growth promoters and inhibitors</li>
            <li>Agricultural Equipment - Sprayers, spray machines, tools</li>
            <li>Adjuvants - Surfactants, spreaders, stickers</li>
          </ul>
        </article>
        
        <article>
          <h3>Authorized Dealer Benefits</h3>
          <p>As an authorized dealer of leading brands, we provide:</p>
          <ul>
            <li>Direct supply from manufacturers</li>
            <li>Fresh stock with proper storage</li>
            <li>Technical literature and product information</li>
            <li>Application guidelines and recommendations</li>
            <li>After-sales support and consultation</li>
            <li>Genuine product guarantees</li>
            <li>Competitive wholesale and retail prices</li>
          </ul>
        </article>
        
        <article>
          <h3>Service Areas</h3>
          <p>We supply branded agricultural products to farmers across Minchinabad, Bahawalnagar, Chishtian, Haroonabad, Fort Abbas, and surrounding districts in Punjab, Pakistan.</p>
        </article>
        
        <article>
          <h3>Contact Us for Brand Products</h3>
          <p>Location: Behramka Hithar, Tehsil Minchinabad, District Bahawalnagar, Punjab, Pakistan</p>
          <p>Phone: +92 300 1331616</p>
          <p>Email: zafarwattoo@gmail.com</p>
          <p>Visit our store for genuine branded agricultural products with expert advice.</p>
        </article>
      </div>

      <BrandsHero />

      <section className="section-padding bg-surface">
        <div className="container-premium">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : brands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primary-300 text-lg">No brands available at the moment.</p>
            </div>
          ) : (
            <BrandsGrid brands={brands} />
          )}
        </div>
      </section>

      <Suspense fallback={<div className="flex justify-center py-12"><Spinner /></div>}>
        <WhyBrandsMatter />
        <BrandsCTA />
      </Suspense>
    </>
  )
}

export default Brands
