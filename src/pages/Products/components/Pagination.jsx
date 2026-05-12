import { memo } from 'react'

/**
 * Pagination Component
 * Page navigation for products
 */
const Pagination = memo(({ pagination, handlePageChange }) => {
  if (pagination.totalPages <= 1) {
    return null
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={!pagination.hasPrevPage}
        className="px-4 py-2 bg-white rounded-lg shadow-card text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
        aria-label="Previous page"
      >
        Previous
      </button>

      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
            page === pagination.currentPage
              ? 'bg-gold text-primary'
              : 'bg-white text-primary-300 hover:bg-primary-700'
          }`}
          aria-label={`Page ${page}`}
          aria-current={page === pagination.currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={!pagination.hasNextPage}
        className="px-4 py-2 bg-white rounded-lg shadow-card text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  )
})

Pagination.displayName = 'Pagination'

export default Pagination
