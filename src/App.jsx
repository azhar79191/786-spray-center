import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './components/common/ScrollToTop'
import GoogleAnalytics from './components/common/GoogleAnalytics'
import AppErrorBoundary from './components/common/AppErrorBoundary'

function App() {
  return (
    <AppErrorBoundary>
      <GoogleAnalytics />
      <ScrollToTop />
      <AppRoutes />
    </AppErrorBoundary>
  )
}

export default App
