import { Component } from 'react'
import { Link } from 'react-router-dom'

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('Unhandled application error:', error, errorInfo)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="min-h-screen bg-surface flex items-center justify-center px-4">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-card p-8 text-center">
            <h1 className="text-3xl font-display font-bold text-primary mb-4">
              Something went wrong
            </h1>
            <p className="text-primary-300 mb-6">
              The page hit an unexpected error. You can reload the app or go back to the home page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={this.handleReload} className="btn-primary" type="button">
                Reload Page
              </button>
              <Link to="/" className="btn-secondary">
                Go Home
              </Link>
            </div>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default AppErrorBoundary
