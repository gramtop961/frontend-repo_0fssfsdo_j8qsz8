import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update)
    }
  }, [])

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -140])
  const opacity = useTransform(scrollY, [0, 600], [1, 0.8])
  const scale = useTransform(scrollY, [0, 600], [1, 1.08])

  return (
    <section className="relative h-[92vh] w-full overflow-hidden bg-gradient-to-b from-stone-50 via-zinc-50 to-white">
      {/* Fabric/cloth visual background with subtle parallax */}
      <motion.div style={isMobile ? undefined : { y, opacity, scale }} className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="https://cdn.coverr.co/videos/coverr-white-fabric-5014/1080p.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"
        />
      </motion.div>

      {/* Soft gradient veil to keep type legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/10 to-white/80 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-5xl md:text-7xl font-black tracking-tight text-zinc-900"
          >
            ANOMIE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ delay: 0.05, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-3 text-lg md:text-2xl text-zinc-700"
          >
            STANDARD DEVIATION — Menswear
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
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
