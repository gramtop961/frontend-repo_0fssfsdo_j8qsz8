import { motion } from 'framer-motion'

export default function SectionMarquee() {
  const words = ['Technical', 'Minimal', 'Tailored', 'Modular', 'Elevated']
  return (
    <section className="py-16 bg-white">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8 text-5xl md:text-6xl font-black text-zinc-100 whitespace-nowrap select-none"
          initial={{ x: 0 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 12, repeat: Infinity }}
        >
          {[...Array(8)].flatMap((_, i) => words.map((w, idx) => (
            <span key={`${i}-${idx}`} className="px-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-100">
                {w}
              </span>
            </span>
          )))}
        </motion.div>
      </div>
    </section>
  )
}
