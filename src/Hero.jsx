import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -80])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.8])
  const scale = useTransform(scrollY, [0, 500], [1, 1.05])

  return (
    <section className="relative h-[92vh] w-full overflow-hidden bg-gradient-to-b from-stone-50 via-zinc-50 to-white">
      {/* Fabric/cloth visual background with subtle parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjI5MTcyNDJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')",
          }}
        />
      </motion.div>

      {/* Soft gradient veil to keep type legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/80 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900"
          >
            ANOMIE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
            className="mt-3 text-lg md:text-2xl text-zinc-700"
          >
            STANDARD DEVIATION — Menswear
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="mt-8 flex gap-4"
          >
            <a href="#collection" className="px-6 py-3 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors">
              Shop Collection
            </a>
            <a href="#about" className="px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-zinc-200 text-zinc-900 hover:bg-white transition-colors">
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
