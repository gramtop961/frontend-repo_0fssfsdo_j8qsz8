import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './Hero'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import CollectionFilters from './components/CollectionFilters'
import SectionMarquee from './components/SectionMarquee'
import LookbookStrip from './components/LookbookStrip'
import ParallaxGrid from './components/ParallaxGrid'
import EditorialA from './components/EditorialA'
import Footer from './components/Footer'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const [filters, setFilters] = useState({})

  const cartId = useMemo(() => {
    const key = 'anomie_cart_id'
    const existing = localStorage.getItem(key)
    if (existing) return existing
    const id = crypto.randomUUID()
    localStorage.setItem(key, id)
    return id
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/products`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setError('Could not load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetch(`${API}/cart/items?cart_id=${cartId}`)
        const data = await res.json()
        setCartItems(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
      }
    }
    loadCart()
  }, [cartId])

  const addToCart = async (p) => {
    try {
      await fetch(`${API}/cart/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_id: cartId, product_id: p.id, quantity: 1 }),
      })
      const res = await fetch(`${API}/cart/items?cart_id=${cartId}`)
      const data = await res.json()
      setCartItems(Array.isArray(data) ? data : [])
      setCartOpen(true)
    } catch (e) {
      console.error(e)
    }
  }

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (filters.category && p.category !== filters.category) return false
      if (filters.size && !(p.sizes || []).includes(filters.size)) return false
      if (typeof filters.min === 'number' && p.price < filters.min) return false
      if (typeof filters.max === 'number' && p.price > filters.max) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const txt = `${p.title} ${p.description || ''} ${p.category}`.toLowerCase()
        if (!txt.includes(q)) return false
      }
      return true
    })

    if (filters.sort === 'price-asc') list.sort((a,b) => a.price - b.price)
    if (filters.sort === 'price-desc') list.sort((a,b) => b.price - a.price)
    if (filters.sort === 'title-asc') list.sort((a,b) => a.title.localeCompare(b.title))

    return list
  }, [products, filters])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar onCartToggle={() => setCartOpen(true)} />
      <Hero />

      <SectionMarquee />
      <LookbookStrip />

      <section id="collection" className="relative py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Featured</h2>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">View all</a>
          </div>

          <div className="mt-8 lg:grid lg:grid-cols-[16rem,1fr] lg:gap-8">
            <div className="mb-6 lg:mb-0">
              <CollectionFilters products={products} filters={filters} setFilters={setFilters} />
            </div>

            <div>
              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse rounded-xl border border-gray-100 p-4">
                      <div className="aspect-[4/5] rounded-lg bg-gray-100" />
                      <div className="mt-4 h-4 w-2/3 bg-gray-100 rounded" />
                      <div className="mt-2 h-3 w-1/3 bg-gray-100 rounded" />
                      <div className="mt-4 h-9 w-full bg-gray-100 rounded-full" />
                    </div>
                  ))}
                </div>
              )}

              {!loading && filtered.length === 0 && (
                <div className="rounded-2xl border border-gray-100 p-8 text-center">
                  <p className="font-medium">No products found.</p>
                  <p className="mt-1 text-sm text-gray-600">Try adjusting filters or seeding sample data.</p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={async () => {
                        try {
                          await fetch(`${API}/seed`, { method: 'POST' })
                          await fetchProducts()
                        } catch (e) {
                          console.error(e)
                        }
                      }}
                      className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm hover:bg-gray-800"
                    >
                      Seed Catalog
                    </button>
                    <button
                      onClick={() => setFilters({})}
                      className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}

              {!loading && filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={addToCart} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"
        />
      </section>

      <ParallaxGrid />
      <EditorialA />

      <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-semibold"
            >
              The fragrance of creativity
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-3 text-gray-600"
            >
              Minimal silhouettes. Technical fabrics. Premium finishing. Designed for movement.
            </motion.p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'].map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-zinc-900 text-white text-xs">{t}</span>
              ))}
            </div>
          </div>
          <div className="aspect-[16/12] rounded-2xl overflow-hidden border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1520975922215-c0f03d8c4d32?q=80&w=1600&auto=format&fit=crop"
              alt="Editorial"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h3 className="text-2xl font-semibold">Join the list</h3>
          <p className="mt-2 text-gray-600">Early access to drops, events, and exclusive edits.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing.'); }}
            className="mt-6 flex gap-2 max-w-md mx-auto"
          >
            <input required type="email" placeholder="you@domain.com" className="flex-1 rounded-full border border-gray-200 px-4 py-3" />
            <button className="px-5 py-3 rounded-full bg-gray-900 text-white text-sm">Subscribe</button>
          </form>
        </div>
      </section>

      <Footer />

      <CartDrawer open={cartOpen} items={cartItems} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default App
