import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'
import LoadingScreen from '../components/loaders/LoadingScreen'
import PageTransition from '../components/common/PageTransition'
import ProtectedRoute from '../components/common/ProtectedRoute'

// Lazy load public pages
const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Products = lazy(() => import('../pages/Products'))
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'))
const Services = lazy(() => import('../pages/Services'))
const Brands = lazy(() => import('../pages/Brands'))
const Gallery = lazy(() => import('../pages/Gallery'))
const Contact = lazy(() => import('../pages/Contact'))
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('../pages/Terms'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

// Lazy load admin pages
const AdminLogin = lazy(() => import('../pages/Admin/Login'))
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'))
const ProductList = lazy(() => import('../pages/Admin/Products/ProductList'))
const ProductForm = lazy(() => import('../pages/Admin/Products/ProductForm'))
const GalleryList = lazy(() => import('../pages/Admin/Gallery/GalleryList'))
const GalleryForm = lazy(() => import('../pages/Admin/Gallery/GalleryForm'))
const BrandList = lazy(() => import('../pages/Admin/Brands/BrandList'))
const BrandForm = lazy(() => import('../pages/Admin/Brands/BrandForm'))
const ServiceRequestList = lazy(() => import('../pages/Admin/ServiceRequests/ServiceRequestList'))
const TestimonialList = lazy(() => import('../pages/Admin/Testimonials/TestimonialList'))
const FAQList = lazy(() => import('../pages/Admin/FAQs/FAQList'))
const FAQForm = lazy(() => import('../pages/Admin/FAQs/FAQForm'))
const ContactList = lazy(() => import('../pages/Admin/Contacts/ContactList'))

/**
 * Application Routes
 * Defines all routes with lazy loading and suspense fallback
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Suspense fallback={<LoadingScreen />}><PageTransition><Home /></PageTransition></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<LoadingScreen />}><PageTransition><About /></PageTransition></Suspense>} />
        <Route path="/products" element={<Suspense fallback={<LoadingScreen />}><PageTransition><Products /></PageTransition></Suspense>} />
        <Route path="/products/:id" element={<Suspense fallback={<LoadingScreen />}><PageTransition><ProductDetails /></PageTransition></Suspense>} />
        <Route path="/services" element={<Suspense fallback={<LoadingScreen />}><PageTransition><Services /></PageTransition></Suspense>} />
        <Route path="/brands" element={<Suspense fallback={<LoadingScreen />}><PageTransition><Brands /></PageTransition></Suspense>} />
        <Route path="/gallery" element={<Suspense fallback={<LoadingScreen />}><PageTransition><Gallery /></PageTransition></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<LoadingScreen />}><PageTransition><Contact /></PageTransition></Suspense>} />
        <Route path="/privacy-policy" element={<Suspense fallback={<LoadingScreen />}><PageTransition><PrivacyPolicy /></PageTransition></Suspense>} />
        <Route path="/terms-and-conditions" element={<Suspense fallback={<LoadingScreen />}><PageTransition><TermsAndConditions /></PageTransition></Suspense>} />
      </Route>

      {/* Admin Login (No Layout) */}
      <Route path="/admin/login" element={<Suspense fallback={<LoadingScreen />}><AdminLogin /></Suspense>} />

      {/* Admin Routes (Protected) */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Suspense fallback={<LoadingScreen />}><AdminDashboard /></Suspense>} />
        <Route path="products" element={<Suspense fallback={<LoadingScreen />}><ProductList /></Suspense>} />
        <Route path="products/new" element={<Suspense fallback={<LoadingScreen />}><ProductForm /></Suspense>} />
        <Route path="products/:id/edit" element={<Suspense fallback={<LoadingScreen />}><ProductForm /></Suspense>} />
        <Route path="gallery" element={<Suspense fallback={<LoadingScreen />}><GalleryList /></Suspense>} />
        <Route path="gallery/new" element={<Suspense fallback={<LoadingScreen />}><GalleryForm /></Suspense>} />
        <Route path="gallery/edit/:id" element={<Suspense fallback={<LoadingScreen />}><GalleryForm /></Suspense>} />
        <Route path="brands" element={<Suspense fallback={<LoadingScreen />}><BrandList /></Suspense>} />
        <Route path="brands/new" element={<Suspense fallback={<LoadingScreen />}><BrandForm /></Suspense>} />
        <Route path="brands/edit/:id" element={<Suspense fallback={<LoadingScreen />}><BrandForm /></Suspense>} />
        <Route path="service-requests" element={<Suspense fallback={<LoadingScreen />}><ServiceRequestList /></Suspense>} />
        <Route path="testimonials" element={<Suspense fallback={<LoadingScreen />}><TestimonialList /></Suspense>} />
        <Route path="faqs" element={<Suspense fallback={<LoadingScreen />}><FAQList /></Suspense>} />
        <Route path="faqs/new" element={<Suspense fallback={<LoadingScreen />}><FAQForm /></Suspense>} />
        <Route path="faqs/:id/edit" element={<Suspense fallback={<LoadingScreen />}><FAQForm /></Suspense>} />
        <Route path="contacts" element={<Suspense fallback={<LoadingScreen />}><ContactList /></Suspense>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Suspense fallback={<LoadingScreen />}><NotFound /></Suspense>} />
    </Routes>
  )
}

export default AppRoutes
