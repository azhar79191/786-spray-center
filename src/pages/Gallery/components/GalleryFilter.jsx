import { memo } from 'react'

const GalleryFilter = memo(({ categories, activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveFilter(category)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
            activeFilter === category
              ? 'bg-gold text-primary border-gold shadow-lg scale-105'
              : 'bg-white text-primary border-primary-100 hover:border-gold hover:text-gold shadow-card hover:shadow-card-hover'
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
