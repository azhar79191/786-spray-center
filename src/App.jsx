import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './components/common/ScrollToTop'
import GoogleAnalytics from './components/common/GoogleAnalytics'
import AppErrorBoundary from './components/common/AppErrorBoundary'
import LoadingScreen from './components/loaders/LoadingScreen'
import { useData } from './contexts/DataContext'

function App() {
  const { loading } = useData()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <AppErrorBoundary>
      <GoogleAnalytics />
      <ScrollToTop />
      <AppRoutes />
    </AppErrorBoundary>
  )
}

export default App
