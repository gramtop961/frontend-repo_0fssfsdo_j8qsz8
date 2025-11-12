import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './Hero'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const cartId = useMemo(() => {
    const key = 'anomie_cart_id'
    const existing = localStorage.getItem(key)
    if (existing) return existing
    const id = crypto.randomUUID()
    localStorage.setItem(key, id)
    return id
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetch(`${API}/cart/items?cart_id=${cartId}`)
        const data = await res.json()
        setCartItems(data)
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
      setCartItems(data)
      setCartOpen(true)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar onCartToggle={() => setCartOpen(true)} />
      <Hero />

      <section id="collection" className="relative py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Featured</h2>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">View all</a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
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

      <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
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
        </div>
      </section>

      <CartDrawer open={cartOpen} items={cartItems} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default App
