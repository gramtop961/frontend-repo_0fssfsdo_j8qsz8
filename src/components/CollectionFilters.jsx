import { useMemo } from 'react'

export default function CollectionFilters({ products, filters, setFilters }) {
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))).sort(), [products])
  const sizes = useMemo(() => Array.from(new Set(products.flatMap(p => p.sizes || []))).sort(), [products])
  const priceMin = useMemo(() => Math.min(...products.map(p => p.price || 0)), [products])
  const priceMax = useMemo(() => Math.max(...products.map(p => p.price || 0)), [products])

  const toggleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? undefined : value }))
  }

  const clearAll = () => setFilters({})

  const activeChips = [
    filters.search ? { k: 'search', label: `“${filters.search}”` } : null,
    filters.category ? { k: 'category', label: filters.category } : null,
    filters.size ? { k: 'size', label: filters.size } : null,
    typeof filters.min === 'number' ? { k: 'min', label: `Min $${filters.min}` } : null,
    typeof filters.max === 'number' ? { k: 'max', label: `Max $${filters.max}` } : null,
    filters.sort ? { k: 'sort', label: (
      filters.sort === 'price-asc' ? 'Price ↑' :
      filters.sort === 'price-desc' ? 'Price ↓' :
      filters.sort === 'title-asc' ? 'Title A–Z' : 'Featured'
    ) } : null,
  ].filter(Boolean)

  return (
    <aside className="w-full lg:w-64 lg:sticky lg:top-20 self-start">
      <div className="rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between gap-3">
          <h4 className="font-semibold">Filter</h4>
          <button onClick={clearAll} className="text-xs text-gray-600 hover:text-gray-900">Clear all</button>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeChips.map((c, i) => (
              <button
                key={i}
                onClick={() => setFilters(f => ({ ...f, [c.k]: undefined }))}
                className="group inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs hover:bg-gray-50"
              >
                <span>{c.label}</span>
                <svg className="h-3 w-3 text-gray-500 group-hover:text-gray-900" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-5">
          {/* Search */}
          <div>
            <label className="text-sm text-gray-600">Search</label>
            <div className="mt-1 relative">
              <input
                type="text"
                placeholder="Search products"
                className="mt-0 w-full rounded-full border border-gray-200 px-4 py-2 pl-9 focus:border-gray-300 focus:outline-none"
                value={filters.search || ''}
                onChange={(e) => setFilters(f => ({ ...f, search: e.target.value || undefined }))}
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="none"><path d="M9 15a6 6 0 100-12 6 6 0 000 12z" stroke="currentColor" strokeWidth="1.5"/><path d="M15 15l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>

          {/* Category pills */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">Category</label>
            </div>
            <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => toggleFilter('category', undefined)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs border ${!filters.category ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}
              >All</button>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => toggleFilter('category', c)}
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs border ${filters.category === c ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}
                >{c}</button>
              ))}
            </div>
          </div>

          {/* Size pills */}
          <div>
            <label className="text-sm text-gray-600">Size</label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => toggleFilter('size', undefined)}
                className={`rounded-full px-3 py-1 text-xs border ${!filters.size ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}
              >All</button>
              {sizes.map(s => (
                <button
                  key={s}
                  onClick={() => toggleFilter('size', s)}
                  className={`rounded-full px-3 py-1 text-xs border ${filters.size === s ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-600">Price</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">Min</span>
                <input
                  type="number"
                  className="w-full rounded-full border border-gray-200 pl-10 pr-3 py-2 text-sm"
                  placeholder={String(priceMin)}
                  value={filters.min ?? ''}
                  onChange={(e) => setFilters(f => ({ ...f, min: e.target.value ? Number(e.target.value) : undefined }))}
                />
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">Max</span>
                <input
                  type="number"
                  className="w-full rounded-full border border-gray-200 pl-10 pr-3 py-2 text-sm"
                  placeholder={String(priceMax)}
                  value={filters.max ?? ''}
                  onChange={(e) => setFilters(f => ({ ...f, max: e.target.value ? Number(e.target.value) : undefined }))}
                />
              </div>
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="text-sm text-gray-600">Sort</label>
            <select
              className="mt-1 w-full rounded-full border border-gray-200 px-3 py-2 text-sm"
              value={filters.sort || ''}
              onChange={(e) => setFilters(f => ({ ...f, sort: e.target.value || undefined }))}
            >
              <option value="">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title: A–Z</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  )
}
