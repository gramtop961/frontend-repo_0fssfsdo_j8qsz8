import { motion } from 'framer-motion'

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{product.title}</h3>
          <span className="text-gray-800">${product.price.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <button onClick={() => onAdd(product)} className="mt-3 w-full rounded-full bg-gray-900 text-white py-2 text-sm hover:bg-gray-800 transition-colors">
          Add to Bag
        </button>
      </div>
    </motion.div>
  )
}
