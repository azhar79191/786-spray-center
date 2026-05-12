import { memo } from 'react'

const GalleryFilter = memo(({ categories, activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveFilter(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === category
              ? 'bg-gold text-primary'
              : 'bg-white text-primary-300 hover:bg-primary-700 shadow-card'
          }`}
          aria-pressed={activeFilter === category}
        >
          {category}
        </button>
      ))}
    </div>
  )
})

GalleryFilter.displayName = 'GalleryFilter'

export default GalleryFilter
