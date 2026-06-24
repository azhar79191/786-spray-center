import { Helmet } from 'react-helmet-async'

/**
 * Enhanced SEO component for maximum search engine visibility
 * Includes structured data, Open Graph, Twitter Cards, and more
 */
const SEO = ({ 
  title, 
  description, 
  keywords = '', 
  ogImage = 'https://bismillahspraycenter.vercel.app/og-image.png', 
  ogType = 'website',
  canonical = '',
  noIndex = false, // For admin pages
  article = null, // For blog posts: { publishedTime, modifiedTime, author, tags }
  product = null, // For product pages: { name, price, currency, availability, brand, image }
  faqSchema = null, // For FAQ pages: array of { question, answer }
}) => {
  const siteName = import.meta.env.VITE_APP_NAME || 'Bismillah Spray Center'
  const siteUrl = 'https://bismillahspraycenter.vercel.app'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Agricultural Solutions in Pakistan`
  const defaultDescription = 'Leading agricultural supplier in Minchinabad, Pakistan. Premium pesticides, fertilizers, seeds from Syngenta, Bayer, FMC, Engro. Expert advice, quality products, and competitive prices for farmers.'
  const finalDescription = description || defaultDescription
  const finalCanonical = canonical || `${siteUrl}${window.location.pathname}`
  
  // Enhanced keywords for better SEO
  const baseKeywords = 'pesticides Pakistan, fertilizers Minchinabad, agricultural products, Syngenta dealer, Bayer products, FMC pesticides, Engro fertilizers, farming supplies, crop protection, seeds Pakistan, agricultural store Bahawalnagar, insecticides, herbicides, fungicides, farm equipment, agricultural consultation'
  const finalKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords

  // Robots meta tag
  const robotsContent = noIndex 
    ? 'noindex, nofollow' 
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={siteName} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      <link rel="canonical" href={finalCanonical} />

      {/* Search Engine Verification */}
      <meta name="google-site-verification" content="-LZvBkOMbMjeXIpAHr_wKl--H_Ti55F9yQisVu-XMoU" />
      <meta name="msvalidate.01" content="8FC60F89F90D5332CD8A2F26BCC20761" />

      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="PK-BA" />
      <meta name="geo.placename" content="Minchinabad, Bahawalnagar, Punjab, Pakistan" />
      <meta name="geo.position" content="30.225935;73.515619" />
      <meta name="ICBM" content="30.225935, 73.515619" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_PK" />
      <meta property="og:locale:alternate" content="ur_PK" />

      {/* Article specific tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@bismillahspray" />

      {/* Additional SEO Tags */}
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="320" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          "@id": `${siteUrl}/#organization`,
          "name": siteName,
          "url": siteUrl,
          "logo": `${siteUrl}/og-image.png`,
          "image": `${siteUrl}/og-image.png`,
          "description": finalDescription,
          "telephone": "+923001331616",
          "email": "zafarwattoo@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Behramka Hithar",
            "addressLocality": "Minchinabad",
            "addressRegion": "Punjab",
            "postalCode": "63350",
            "addressCountry": "PK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.225935",
            "longitude": "73.515619"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "08:00",
              "closes": "20:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Sunday",
              "opens": "09:00",
              "closes": "14:00"
            }
          ],
          "priceRange": "$$",
          "paymentAccepted": "Cash, Bank Transfer",
          "currenciesAccepted": "PKR",
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "30.225935",
              "longitude": "73.515619"
            },
            "geoRadius": "50000"
          },
          "sameAs": [
            "https://www.facebook.com/profile.php?id=100012235385727",
            "https://www.instagram.com/muhammadzafarwattoo/"
          ]
        })}
      </script>

      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": siteName,
          "image": `${siteUrl}/og-image.png`,
          "url": siteUrl,
          "telephone": "+923001331616",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Behramka Hithar, Tehsil Minchinabad",
            "addressLocality": "Minchinabad",
            "addressRegion": "Punjab",
            "postalCode": "63350",
            "addressCountry": "PK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 30.225935,
            "longitude": 73.515619
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "08:00",
              "closes": "20:00"
            }
          ]
        })}
      </script>

      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": siteUrl
            },
            ...(title ? [{
              "@type": "ListItem",
              "position": 2,
              "name": title,
              "item": finalCanonical
            }] : [])
          ]
        })}
      </script>

      {/* Product Structured Data */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "image": product.image || ogImage,
            "description": product.description || finalDescription,
            "brand": {
              "@type": "Brand",
              "name": product.brand || siteName
            },
            "offers": {
              "@type": "Offer",
              "url": finalCanonical,
              "priceCurrency": product.currency || "PKR",
              "price": product.price,
              "availability": product.availability || "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": siteName
              }
            }
          })}
        </script>
      )}

      {/* FAQ Structured Data */}
      {faqSchema && faqSchema.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSchema.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
