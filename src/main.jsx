import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import './styles/globals.css'

const rootElement = document.getElementById('root')

// Support for react-snap pre-rendering
// Check if content was pre-rendered (has child nodes)
if (rootElement.hasChildNodes()) {
  // Hydrate pre-rendered content
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
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
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  )
} else {
  // No pre-rendered content, render normally
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
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
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  )
}

