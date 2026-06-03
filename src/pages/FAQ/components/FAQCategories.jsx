import { memo } from 'react'

const FAQCategories = memo(({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
            activeCategory === category
              ? 'bg-gold text-primary border-gold shadow-lg scale-105'
              : 'bg-white text-primary border-primary-100 hover:border-gold hover:text-gold shadow-card hover:shadow-card-hover'
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
