import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'
import LoadingScreen from '../components/loaders/LoadingScreen'

// Lazy load public pages
const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const Products = lazy(() => import('../pages/Products/Products'))
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'))
const Services = lazy(() => import('../pages/Services/Services'))
const Brands = lazy(() => import('../pages/Brands/Brands'))
const FAQ = lazy(() => import('../pages/FAQ/FAQ'))
const Gallery = lazy(() => import('../pages/Gallery/Gallery'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
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
        <Route path="/" element={<Suspense fallback={<LoadingScreen />}><Home /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<LoadingScreen />}><About /></Suspense>} />
        <Route path="/products" element={<Suspense fallback={<LoadingScreen />}><Products /></Suspense>} />
        <Route path="/products/:id" element={<Suspense fallback={<LoadingScreen />}><ProductDetails /></Suspense>} />
        <Route path="/services" element={<Suspense fallback={<LoadingScreen />}><Services /></Suspense>} />
        <Route path="/brands" element={<Suspense fallback={<LoadingScreen />}><Brands /></Suspense>} />
        <Route path="/faq" element={<Suspense fallback={<LoadingScreen />}><FAQ /></Suspense>} />
        <Route path="/gallery" element={<Suspense fallback={<LoadingScreen />}><Gallery /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<LoadingScreen />}><Contact /></Suspense>} />
      </Route>

      {/* Admin Login (No Layout) */}
      <Route path="/admin/login" element={<Suspense fallback={<LoadingScreen />}><AdminLogin /></Suspense>} />

      {/* Admin Routes (Protected) */}
      <Route path="/admin" element={<AdminLayout />}>
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
