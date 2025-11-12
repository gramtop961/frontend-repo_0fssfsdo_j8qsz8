import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -80])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.75])

  return (
    <section className="relative h-[92vh] w-full overflow-hidden bg-gradient-to-b from-indigo-50 via-violet-50 to-white">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Spline scene="https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-black tracking-tight text-gray-900"
          >
            ANOMIE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
            className="mt-3 text-lg md:text-2xl text-gray-700"
          >
            STANDARD DEVIATION
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="mt-8 flex gap-4"
          >
            <a href="#collection" className="px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              Shop Collection
            </a>
            <a href="#about" className="px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-gray-200 text-gray-900 hover:bg-white transition-colors">
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
