// JSON-LD Structured Data Schemas for Bismillah Spray Center

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  "@id": "https://bismillahspraycenter.vercel.app/#business",
  "name": "Bismillah Spray Center",
  "alternateName": "بسم اللہ سپرے سینٹر",
  "description": "Authorized dealer of pesticides, insecticides, herbicides, fungicides, fertilizers and seeds in Minchinabad, Bahawalnagar. Serving cotton, wheat, sugarcane, rice and vegetable farmers across Punjab, Pakistan with quality agricultural products from Warble, Agrow Mark, FFC, Engro, and Abdullah Haseeb.",
  "url": "https://bismillahspraycenter.vercel.app/",
  "logo": "https://bismillahspraycenter.vercel.app/logo.png",
  "image": [
    "https://bismillahspraycenter.vercel.app/og-image.png",
    "https://bismillahspraycenter.vercel.app/shop-front.jpg"
  ],
  "telephone": "+923001331616",
  "email": "zafarwattoo@gmail.com",
  "priceRange": "$$",
  "currenciesAccepted": "PKR",
  "paymentAccepted": "Cash, Bank Transfer, Mobile Payment",
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
  "areaServed": [
    {
      "@type": "City",
      "name": "Minchinabad"
    },
    {
      "@type": "City",
      "name": "Bahawalnagar"
    },
    {
      "@type": "City",
      "name": "Chishtian"
    },
    {
      "@type": "City",
      "name": "Haroonabad"
    },
    {
      "@type": "City",
      "name": "Fort Abbas"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Punjab, Pakistan"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/bismillahspraycenter",
    "https://www.instagram.com/bismillahspraycenter",
    "https://wa.me/923001331616"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Agricultural Products",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Pesticides",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Cotton Pesticides"
            }
          }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Fertilizers",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "NPK Fertilizers"
            }
          }
        ]
      }
    ]
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://bismillahspraycenter.vercel.app/#organization",
  "name": "Bismillah Spray Center",
  "url": "https://bismillahspraycenter.vercel.app/",
  "logo": "https://bismillahspraycenter.vercel.app/logo.png",
  "description": "Leading agricultural products supplier in Bahawalnagar district, Pakistan. Authorized dealer of top pesticide, fertilizer and seed brands.",
  "foundingDate": "2018",
  "founder": {
    "@type": "Person",
    "name": "Zafar Wattoo"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+923001331616",
    "contactType": "Customer Service",
    "email": "zafarwattoo@gmail.com",
    "areaServed": "PK",
    "availableLanguage": ["English", "Urdu", "Punjabi"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Behramka Hithar, Tehsil Minchinabad",
    "addressLocality": "Bahawalnagar",
    "addressRegion": "Punjab",
    "addressCountry": "PK"
  },
  "sameAs": [
    "https://www.facebook.com/bismillahspraycenter",
    "https://www.instagram.com/bismillahspraycenter"
  ]
};

export const pesticideProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Agricultural Pesticides",
  "description": "High-quality pesticides for cotton, wheat, rice, sugarcane and vegetable crops. Effective pest control solutions for Pakistani farmers.",
  "brand": [
    {
      "@type": "Brand",
      "name": "Warble"
    },
    {
      "@type": "Brand",
      "name": "Agrow Mark"
    },
    {
      "@type": "Brand",
      "name": "FFC"
    },
    {
      "@type": "Brand",
      "name": "Engro"
    }
  ],
  "category": "Agricultural Chemicals",
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "PKR",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Bismillah Spray Center"
    }
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Suitable For",
      "value": "Cotton, Wheat, Rice, Sugarcane, Vegetables"
    },
    {
      "@type": "PropertyValue",
      "name": "Target Pests",
      "value": "Bollworm, Whitefly, Aphids, Jassids"
    }
  ]
};

export const insecticideProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Insecticides for Cotton and Wheat",
  "description": "Powerful insecticides for controlling bollworm, whitefly, aphids, jassids and other pests in cotton, wheat and other major crops in Pakistan.",
  "brand": [
    {
      "@type": "Brand",
      "name": "Warble"
    },
    {
      "@type": "Brand",
      "name": "FFC"
    },
    {
      "@type": "Brand",
      "name": "Agrow Mark"
    }
  ],
  "category": "Insecticides",
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "PKR",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Bismillah Spray Center"
    }
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Crop Application",
      "value": "Cotton, Wheat, Rice, Vegetables"
    }
  ]
};

export const herbicideProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Herbicides and Weedicides",
  "description": "Effective herbicides and weedicides for weed control in wheat, rice, sugarcane and cotton fields. Pre and post-emergence solutions available.",
  "brand": [
    {
      "@type": "Brand",
      "name": "FFC"
    },
    {
      "@type": "Brand",
      "name": "Engro"
    },
    {
      "@type": "Brand",
      "name": "Agrow Mark"
    }
  ],
  "category": "Herbicides",
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "PKR",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Bismillah Spray Center"
    }
  }
};

export const fungicideProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Fungicides for Crop Protection",
  "description": "Premium fungicides for controlling wheat rust, leaf blight, powdery mildew and other fungal diseases in wheat, rice and vegetables.",
  "brand": [
    {
      "@type": "Brand",
      "name": "Warble"
    },
    {
      "@type": "Brand",
      "name": "FFC"
    },
    {
      "@type": "Brand",
      "name": "Abdullah Haseeb"
    }
  ],
  "category": "Fungicides",
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "PKR",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Bismillah Spray Center"
    }
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Disease Control",
      "value": "Rust, Blight, Mildew, Smut"
    }
  ]
};

export const fertilizerProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Agricultural Fertilizers",
  "description": "Complete range of NPK fertilizers, DAP, Urea, and micronutrients from Engro and FFC for all crops. Authorized dealer in Bahawalnagar.",
  "brand": [
    {
      "@type": "Brand",
      "name": "Engro"
    },
    {
      "@type": "Brand",
      "name": "FFC"
    }
  ],
  "category": "Fertilizers",
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "PKR",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Bismillah Spray Center"
    }
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Types Available",
      "value": "NPK, DAP, Urea, SSP, Micronutrients"
    }
  ]
};

export const seedProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Certified Crop Seeds",
  "description": "Certified and high-yield seeds for cotton, wheat, rice, sugarcane and vegetables. Quality seeds from authorized brands.",
  "brand": [
    {
      "@type": "Brand",
      "name": "FFC"
    },
    {
      "@type": "Brand",
      "name": "Agro One"
    }
  ],
  "category": "Seeds",
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "PKR",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Bismillah Spray Center"
    }
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you deliver pesticides and fertilizers in Bahawalnagar district?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide delivery services throughout Bahawalnagar district including Minchinabad, Chishtian, Haroonabad, Fort Abbas and surrounding villages. Contact us at +92 300 1331616 for delivery inquiries."
      }
    },
    {
      "@type": "Question",
      "name": "Are you an authorized dealer of Engro and FFC products?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Bismillah Spray Center is an authorized dealer of Warble, Agrow Mark, FFC, Engro, Agro One, and Abdullah Haseeb brands. We only sell genuine, authentic products with proper registration and quality certification."
      }
    },
    {
      "@type": "Question",
      "name": "What are your shop timings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are open Monday to Saturday from 8:00 AM to 8:00 PM, and Sunday from 9:00 AM to 2:00 PM. Visit us at Behramka Hithar, Tehsil Minchinabad, District Bahawalnagar."
      }
    },
    {
      "@type": "Question",
      "name": "Which pesticides are best for cotton bollworm in Punjab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For cotton bollworm control in Punjab, we recommend combination sprays with emamectin benzoate, chlorpyrifos, or cypermethrin-based products. Our agricultural experts can recommend the right product based on your crop stage and pest pressure. Contact us for personalized advice."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide farming advice and technical support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our experienced team provides free agricultural consultation on pest control, disease management, fertilizer application timing, and crop nutrition. Visit our shop or call +92 300 1331616 for expert guidance."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept cash payments, bank transfers, and mobile payment methods like Easypaisa and JazzCash. We also offer credit facility for regular customers."
      }
    },
    {
      "@type": "Question",
      "name": "Can I buy products in bulk for wholesale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer competitive wholesale prices for bulk orders. Whether you're a large farmer, agricultural contractor, or distributor, we can provide attractive rates for volume purchases. Contact us to discuss wholesale pricing."
      }
    },
    {
      "@type": "Question",
      "name": "Which fertilizer is best for wheat crop in Rabi season?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For wheat in Rabi season, we recommend balanced NPK fertilizers at sowing, followed by Urea applications at tillering and booting stages. Engro DAP at sowing and Engro Urea for top dressing give excellent results. Our experts can create a customized fertilizer schedule for your soil type and wheat variety."
      }
    }
  ]
};

export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Breadcrumb examples
export const productsBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://bismillahspraycenter.vercel.app/" },
  { name: "Products", url: "https://bismillahspraycenter.vercel.app/products" }
]);

export const pesticidesBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://bismillahspraycenter.vercel.app/" },
  { name: "Products", url: "https://bismillahspraycenter.vercel.app/products" },
  { name: "Pesticides", url: "https://bismillahspraycenter.vercel.app/products/pesticides" }
]);

export const blogBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://bismillahspraycenter.vercel.app/" },
  { name: "Blog", url: "https://bismillahspraycenter.vercel.app/blog" }
]);
