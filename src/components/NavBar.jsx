import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'

export default function NavBar({ onCartToggle }) {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'New', href: '#new' },
    { label: 'Shop', href: '#collection' },
    { label: 'About', href: '#about' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-wider">ANOMIE</a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              {l.label}
            </a>
          ))}
          <button onClick={onCartToggle} className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ShoppingBag size={20} />
          </button>
        </nav>

        <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/80 backdrop-blur border-t border-gray-100"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="py-2 text-gray-800">
                  {l.label}
                </a>
              ))}
              <button onClick={() => { setOpen(false); onCartToggle?.() }} className="flex items-center gap-2 py-2">
                <ShoppingBag size={18} /> Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
