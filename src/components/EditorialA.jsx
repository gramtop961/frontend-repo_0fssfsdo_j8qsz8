import { motion } from 'framer-motion'

export default function EditorialA() {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white" />
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100">
          <motion.video
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="https://cdn.coverr.co/videos/coverr-soft-fabric-waves-8292/1080p.mp4"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute bottom-4 left-4 right-4 text-white"
          >
            <h3 className="text-xl font-semibold tracking-tight">ANOMIE — Editorial A</h3>
            <p className="mt-1 text-sm text-white/80">Movement studies in technical fabrics. Minimal, functional, precise.</p>
          </motion.div>
        </div>
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold"
          >
            The ANOMIE World
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-gray-600"
          >
            A calm palette of onyx, bone, and sand. Elevated basics cut with intention. Utility details hidden in plain sight.
          </motion.p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              'https://images.unsplash.com/photo-1520975922215-c0f03d8c4d32?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1200&auto=format&fit=crop',
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="aspect-[4/5] overflow-hidden rounded-xl border border-gray-100"
              >
                <img src={src} alt={`Editorial ${i+1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
