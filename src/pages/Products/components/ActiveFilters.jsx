import { memo } from 'react'
import { FaTimes } from 'react-icons/fa'

/**
 * Active Filters Component
 * Displays currently active filters as badges
 */
const ActiveFilters = memo(({ 
  filters, 
  searchQuery, 
  handleCategoryChange, 
  handleBrandChange, 
  clearSearch 
}) => {
  if (!filters.category && !filters.brand && !searchQuery) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-primary-300 text-sm">Active filters:</span>
      {filters.category && (
        <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium flex items-center gap-1">
          {filters.category}
          <button 
            onClick={() => handleCategoryChange(filters.category)}
            aria-label={`Remove ${filters.category} filter`}
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </span>
      )}
      {filters.brand && (
        <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium flex items-center gap-1">
          {filters.brand}
          <button 
            onClick={() => handleBrandChange(filters.brand)}
            aria-label={`Remove ${filters.brand} filter`}
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </span>
      )}
      {searchQuery && (
        <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium flex items-center gap-1">
          Search: {searchQuery}
          <button 
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        </span>
      )}
    </div>
  )
})

ActiveFilters.displayName = 'ActiveFilters'

export default ActiveFilters
