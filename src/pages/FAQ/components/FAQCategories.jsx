import { memo } from 'react'

const FAQCategories = memo(({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? 'bg-gold text-primary'
              : 'bg-white text-primary-300 hover:bg-primary-700 shadow-card'
          }`}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  )
})

FAQCategories.displayName = 'FAQCategories'

export default FAQCategories
