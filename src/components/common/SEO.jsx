import { Helmet } from 'react-helmet-async'

/**
 * SEO component for dynamic meta tags
 * Improves search engine visibility and social sharing
 */
const SEO = ({ 
  title, 
  description, 
  keywords = '', 
  ogImage = '', 
  ogType = 'website',
  canonical = '',
}) => {
  const siteName = import.meta.env.VITE_APP_NAME || 'Bismillah Spray Center'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const defaultDescription = 'Premium agricultural pesticides, fertilizers, and seeds in Minchinabad, Pakistan. Trusted by farmers since 2010.'

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={`${keywords}, pesticides, fertilizers, seeds, agriculture, Minchinabad, Pakistan, Syngenta, Bayer, Engro`} />
      <meta name="author" content={siteName} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_PK" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  )
}

export default SEO
