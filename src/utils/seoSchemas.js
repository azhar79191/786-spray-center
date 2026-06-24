/**
 * SEO Schema Utilities
 * Centralized location for all structured data schemas
 */

const SITE_URL = 'https://bismillahspraycenter.vercel.app'
const BUSINESS_NAME = 'Bismillah Spray Center'

// Generate BreadcrumbList schema
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url || `${SITE_URL}${item.path}`
  }))
})

// Product schema for individual products
export const generateProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image || `${SITE_URL}/og-image.png`,
  "brand": {
    "@type": "Brand",
    "name": product.brand || BUSINESS_NAME
  },
  "offers": {
    "@type": "Offer",
    "url": `${SITE_URL}/products/${product.slug || product.id}`,
    "priceCurrency": "PKR",
    "price": product.price || "0",
    "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "seller": {
      "@type": "Organization",
      "name": BUSINESS_NAME
    }
  },
  "category": product.category,
  "sku": product.sku || product.id
})

// Aggregate Product schema for category pages
export const generateCategoryProductSchema = (categoryName, description) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": categoryName,
  "description": description,
  "brand": [
    { "@type": "Brand", "name": "Warble" },
    { "@type": "Brand", "name": "Agrow Mark" },
    { "@type": "Brand", "name": "FFC" },
    { "@type": "Brand", "name": "Engro" },
    { "@type": "Brand", "name": "Agro One" },
    { "@type": "Brand", "name": "Abdullah Haseeb" }
  ],
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "PKR",
    "seller": {
      "@type": "LocalBusiness",
      "name": BUSINESS_NAME
    }
  }
})

// Pesticides category schema
export const pesticidesCategorySchema = generateCategoryProductSchema(
  "Agricultural Pesticides",
  "High-quality pesticides for cotton, wheat, rice, sugarcane and vegetable crops. Effective pest control solutions for Pakistani farmers from authorized brands."
)

// Insecticides category schema
export const insecticidesCategorySchema = generateCategoryProductSchema(
  "Insecticides for Cotton and Wheat",
  "Powerful insecticides for controlling bollworm, whitefly, aphids, jassids and other pests in cotton, wheat and other major crops in Pakistan."
)

// Herbicides category schema
export const herbicidesCategorySchema = generateCategoryProductSchema(
  "Herbicides and Weedicides",
  "Effective herbicides and weedicides for weed control in wheat, rice, sugarcane and cotton fields. Pre and post-emergence solutions available."
)

// Fungicides category schema
export const fungicidesCategorySchema = generateCategoryProductSchema(
  "Fungicides for Crop Protection",
  "Premium fungicides for controlling wheat rust, leaf blight, powdery mildew and other fungal diseases in wheat, rice and vegetables."
)

// Fertilizers category schema
export const fertilizersCategorySchema = generateCategoryProductSchema(
  "Agricultural Fertilizers",
  "Complete range of NPK fertilizers, DAP, Urea, and micronutrients from Engro and FFC for all crops. Authorized dealer in Bahawalnagar."
)

// Seeds category schema
export const seedsCategorySchema = generateCategoryProductSchema(
  "Certified Crop Seeds",
  "Certified and high-yield seeds for cotton, wheat, rice, sugarcane and vegetables. Quality seeds from authorized brands."
)

// Organization schema (for all pages)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": BUSINESS_NAME,
  "alternateName": "بسم اللہ سپرے سینٹر",
  "url": SITE_URL,
  "logo": `${SITE_URL}/favicon-512x512.png`,
  "description": "Leading agricultural products supplier in Bahawalnagar district, Pakistan.",
  "telephone": "+923001331616",
  "email": "zafarwattoo@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Behramka Hithar, Tehsil Minchinabad",
    "addressLocality": "Bahawalnagar",
    "addressRegion": "Punjab",
    "postalCode": "63350",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "30.225935",
    "longitude": "73.515619"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=100012235385727",
    "https://www.instagram.com/muhammadzafarwattoo/",
    "https://wa.me/923001331616"
  ]
}

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "url": SITE_URL,
  "name": BUSINESS_NAME,
  "description": "Leading agricultural products supplier in Minchinabad, Bahawalnagar, Punjab, Pakistan",
  "publisher": {
    "@id": `${SITE_URL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/products?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "en-PK"
}

// Export all schemas as a bundle
export const allSchemas = {
  organization: organizationSchema,
  website: websiteSchema,
  pesticides: pesticidesCategorySchema,
  insecticides: insecticidesCategorySchema,
  herbicides: herbicidesCategorySchema,
  fungicides: fungicidesCategorySchema,
  fertilizers: fertilizersCategorySchema,
  seeds: seedsCategorySchema
}
