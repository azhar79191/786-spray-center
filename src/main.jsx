import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import { DataProvider } from './contexts/DataContext.jsx'
import { startKeepAlive } from './utils/keepAlive.js'
import './styles/globals.css'

const rootElement = document.getElementById('root')

// Start backend keepalive service to prevent cold starts
const stopKeepAlive = startKeepAlive()

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <DataProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastStyle={{
              background: '#0F172A',
              color: '#F8FAFC',
              border: '1px solid #D4A017',
            }}
          />
        </DataProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    stopKeepAlive?.()
  })
}
