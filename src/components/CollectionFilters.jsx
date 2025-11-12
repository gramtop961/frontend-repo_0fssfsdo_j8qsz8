import { useMemo } from 'react'

export default function CollectionFilters({ products, filters, setFilters }) {
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))).sort(), [products])
  const sizes = useMemo(() => Array.from(new Set(products.flatMap(p => p.sizes || []))).sort(), [products])
  const priceMin = useMemo(() => Math.min(...products.map(p => p.price || 0)), [products])
  const priceMax = useMemo(() => Math.max(...products.map(p => p.price || 0)), [products])

  return (
    <aside className="w-full lg:w-64 lg:sticky lg:top-20 self-start">
      <div className="rounded-2xl border border-gray-100 p-4">
        <h4 className="font-semibold">Filter</h4>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              className="mt-1 w-full rounded-md border-gray-200"
              value={filters.category || ''}
              onChange={(e) => setFilters(f => ({ ...f, category: e.target.value || undefined }))}
            >
              <option value="">All</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Size</label>
            <select
              className="mt-1 w-full rounded-md border-gray-200"
              value={filters.size || ''}
              onChange={(e) => setFilters(f => ({ ...f, size: e.target.value || undefined }))}
            >
              <option value="">All</option>
              {sizes.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Price</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                className="w-full rounded-md border-gray-200"
                placeholder={String(priceMin)}
                value={filters.min ?? ''}
                onChange={(e) => setFilters(f => ({ ...f, min: e.target.value ? Number(e.target.value) : undefined }))}
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                className="w-full rounded-md border-gray-200"
                placeholder={String(priceMax)}
                value={filters.max ?? ''}
                onChange={(e) => setFilters(f => ({ ...f, max: e.target.value ? Number(e.target.value) : undefined }))}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
