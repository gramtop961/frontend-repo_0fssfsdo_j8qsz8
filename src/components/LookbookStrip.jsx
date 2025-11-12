import { motion } from 'framer-motion'

const IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1600&auto=format&fit=crop',
]

export default function LookbookStrip() {
  return (
    <section className="py-12 bg-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
        <motion.div
          className="flex gap-4 will-change-transform"
          initial={{ x: 0 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          aria-hidden
        >
          {[...IMAGES, ...IMAGES].map((src, i) => (
            <div key={i} className="shrink-0 h-48 sm:h-56 md:h-64 aspect-[4/3] overflow-hidden rounded-xl border border-gray-100">
              <img src={src} alt="Lookbook" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
