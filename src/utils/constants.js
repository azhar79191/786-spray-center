/**
 * Application constants
 */

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Bismillah Spray Center'
export const APP_TAGLINE = import.meta.env.VITE_APP_TAGLINE || 'Premium Agricultural Solutions for Pakistan'

// Contact information
export const CONTACT = {
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '923001331616',
  phone: import.meta.env.VITE_PHONE_NUMBER || '+923001331616',
  email: import.meta.env.VITE_EMAIL || 'zafarwattoo@gmail.com',
  address: import.meta.env.VITE_ADDRESS || 'Behramka Hithar Tehsil Minchinabad, Punjab, Pakistan',
  googleMapsEmbed: import.meta.env.VITE_GOOGLE_MAPS_EMBED || '',
}

// Social media links
export const SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=100012235385727',
  instagram: 'https://www.instagram.com/muhammadzafarwattoo/',
  youtube: 'https://youtube.com/bismillahspraycenter',
}

// Business hours
export const BUSINESS_HOURS = [
  { day: 'Monday - Saturday', hours: '8:00 AM - 8:00 PM' },
  { day: 'Sunday', hours: '9:00 AM - 2:00 PM' },
  { day: 'Peak Season', hours: '8:00 AM - 9:00 PM' },
]

// Product categories with icons
export const CATEGORIES = [
  { name: 'Insecticides', icon: 'GiInsectJaws', description: 'Protect crops from harmful insects and pests' },
  { name: 'Herbicides', icon: 'GiPlantRoots', description: 'Effective weed control solutions for all crops' },
  { name: 'Fungicides', icon: 'GiMushroomGills', description: 'Prevent and cure fungal diseases' },
  { name: 'Fertilizers', icon: 'GiFertilizerBag', description: 'Nutrient-rich fertilizers for maximum yield' },
  { name: 'Seeds', icon: 'GiSeedling', description: 'High-quality hybrid and certified seeds' },
]

// Brand partners
export const BRANDS = [
  { name: 'Engro', country: 'Pakistan', logo: 'Engro' },
  { name: 'Warble', country: 'Pakistan', logo: 'Fauji' },
  { name: 'Agrow Mark', country: 'USA', logo: 'Pioneer' },
  { name: 'Abdullah Haseeb', country: 'Japan', logo: 'Honda' },
  { name: 'Agro one', country: 'Germany', logo: 'Stihl' },
]

// Services offered
export const SERVICES = [
  {
    title: 'Crop Consultation',
    description: 'Expert advice on crop protection strategies tailored to your specific farm conditions and pest challenges.',
    icon: 'GiFarmer',
  },
  {
    title: 'Pest Identification',
    description: 'Professional pest and disease identification services with customized treatment recommendations.',
    icon: 'GiMicroscope',
  },
  {
    title: 'Spraying Services',
    description: 'On-field spraying services using modern equipment for precise and efficient application.',
    icon: 'GiSpray',
  },
  {
    title: 'Soil Testing',
    description: 'Comprehensive soil analysis to determine nutrient deficiencies and fertilizer requirements.',
    icon: 'GiTestTubes',
  },
  {
    title: 'Equipment Repair',
    description: 'Repair and maintenance services for all types of agricultural spraying equipment.',
    icon: 'GiWrench',
  },
  {
    title: 'Bulk Orders',
    description: 'Special pricing and delivery arrangements for large quantity orders and wholesale purchases.',
    icon: 'GiDeliveryDrone',
  },
]

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'Muhammad Mudassar',
    role: 'Farmer, Minchinabad',
    content: 'I purchased pest control products and spray medicines from Bismillah Spray Center. The quality was excellent and the results on my crops were very effective. Their guidance and after-sales support are also very helpful.',
    rating: 5,
  },
  {
    name: 'Muhammad Azhar',
    role: 'Rice Farmer, Minchinabad',
    content: 'The best place for quality seeds and pesticides. Their Pioneer rice seeds gave me 20% higher yield compared to local varieties. Fair prices and genuine products.',
    rating: 5,
  },
  {
    name: 'Muhammad Ahmad',
    role: 'Cotton Farmer, Minchinabad',
    content: 'Bismillah Spray Center has been my trusted partner for 5 years. Their Syngenta products have significantly improved my cotton yield. The staff is knowledgeable and always ready to help.',
    rating: 5,
  },
  {
    name: 'Ali Hassan',
    role: 'Vegetable Grower, Minchinabad',
    content: 'Excellent range of fungicides and fertilizers. Their expert advice helped me control late blight in my tomato crop. Highly recommended for all farmers in the region.',
    rating: 5,
  },


]

// Gallery images (using Unsplash agricultural images)
export const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80', title: 'Premium Pesticides', category: 'Products' },
  { src: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80', title: 'Fertilizer Storage', category: 'Products' },
  { src: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80', title: 'Spray Equipment', category: 'Equipment' },
  { src: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80', title: 'Crop Protection', category: 'Field Work' },
  { src: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80', title: 'Agricultural Supplies', category: 'Products' },
  { src: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80', title: 'Corn Field', category: 'Field Work' },
  { src: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80', title: 'Rice Cultivation', category: 'Field Work' },
  { src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80', title: 'Quality Products', category: 'Products' },
]

// Why choose us features
export const WHY_CHOOSE_US = [
  {
    title: 'Genuine Products',
    description: 'All products sourced directly from authorized distributors with original invoices and batch tracking.',
    icon: 'GiCheckMark',
  },
  {
    title: 'Expert Guidance',
    description: 'Certified agronomists and experienced staff providing free crop consultation and pest identification.',
    icon: 'GiTeacher',
  },
  {
    title: 'Competitive Pricing',
    description: 'Best market prices with bulk discounts and seasonal offers for regular customers.',
    icon: 'GiPriceTag',
  },
  {
    title: 'Fast Delivery',
    description: 'Same-day delivery within Minchinabad',
    icon: 'GiTruck',
  },
]

// Helper functions
export const getWhatsAppLink = (phone, message = '') => {
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}

// SEO meta tags helper
export const getMetaTags = (title, description, keywords = '') => ({
  title: `${title} | ${APP_NAME}`,
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: `${keywords}, pesticides, fertilizers, seeds, agriculture, Minchinabad, Pakistan` },
    { property: 'og:title', content: `${title} | ${APP_NAME}` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: APP_NAME },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${title} | ${APP_NAME}` },
    { name: 'twitter:description', content: description },
  ],
})
