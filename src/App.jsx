import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './components/common/ScrollToTop'
import GoogleAnalytics from './components/common/GoogleAnalytics'

function App() {
  return (
    <>
      <GoogleAnalytics />
      <ScrollToTop />
      <AppRoutes />
    </>
  )
}

export default App
