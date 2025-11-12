import { AnimatePresence, motion } from 'framer-motion'

export default function CartDrawer({ open, items, onClose }) {
  const total = items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white shadow-2xl"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Bag</h3>
                <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">Close</button>
              </div>
              <div className="mt-4 space-y-4 overflow-auto flex-1">
                {items.length === 0 && (
                  <p className="text-gray-600">Your bag is empty.</p>
                )}
                {items.map((it) => (
                  <div key={it.id} className="flex gap-3">
                    <img src={it.product?.image} alt={it.product?.title} className="w-20 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{it.product?.title}</p>
                          <p className="text-sm text-gray-600">Qty {it.quantity}</p>
                        </div>
                        <p>${(it.product?.price || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <button className="mt-4 w-full rounded-full bg-gray-900 text-white py-3 text-sm hover:bg-gray-800 transition-colors">Checkout</button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
