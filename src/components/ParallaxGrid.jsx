import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxGrid() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40])

  const IMG_A = 'https://images.unsplash.com/photo-1520975922215-c0f03d8c4d32?q=80&w=1600&auto=format&fit=crop'
  const IMG_B = 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1600&auto=format&fit=crop'
  const IMG_C = 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1600&auto=format&fit=crop'

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-4">
        <motion.div style={{ y: y1 }} className="md:col-span-2 aspect-[16/10] overflow-hidden rounded-2xl border border-gray-100">
          <img src={IMG_A} alt="Editorial A" className="w-full h-full object-cover" />
        </motion.div>
        <div className="grid gap-4">
          <motion.div style={{ y: y2 }} className="aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100">
            <img src={IMG_B} alt="Editorial B" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y1 }} className="aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100">
            <img src={IMG_C} alt="Editorial C" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
