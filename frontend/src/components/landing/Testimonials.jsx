import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const testimonials = [
  {
    quote:
      'LeadDesk Mini feels like a product we would put in front of clients tomorrow. Fast, clear, beautiful.',
    name: 'Ava Chen',
    role: 'Growth Lead, Northline',
  },
  {
    quote:
      'Finally a lead form that does not look academic. The glass UI and status workflow are excellent.',
    name: 'Marcus Reed',
    role: 'Founder, Orbit Studio',
  },
  {
    quote:
      'Auth, search, and pipeline updates just work. A rare qualification build that feels production-ready.',
    name: 'Priya Nair',
    role: 'Product Manager, Signal Ops',
  },
  {
    quote:
      'The motion design alone raises the bar. Every interaction feels intentional and premium.',
    name: 'Jordan Lee',
    role: 'Design Director, Halo',
  },
]

export default function Testimonials() {
  const reduced = usePrefersReducedMotion()
  const loop = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="container-app relative">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-300/80">
            Testimonials
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Operators who live in the pipeline
          </h2>
        </motion.div>
      </div>

      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#03040a] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#03040a] to-transparent sm:w-28" />

        <div className={`flex gap-4 px-4 ${reduced ? 'flex-wrap justify-center' : 'marquee-track'}`}>
          {(reduced ? testimonials : loop).map((item, index) => (
            <motion.figure
              key={`${item.name}-${index}`}
              whileHover={reduced ? undefined : { scale: 1.04, rotate: 0, y: -6 }}
              className="glass w-[300px] shrink-0 rounded-3xl p-6 sm:w-[340px]"
              style={{ rotate: reduced ? 0 : index % 2 === 0 ? -1.5 : 1.5 }}
            >
              <Quote className="mb-4 h-5 w-5 text-cyan-300/80" aria-hidden="true" />
              <blockquote className="text-sm leading-relaxed text-white/70">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4">
                <p className="font-medium text-white">{item.name}</p>
                <p className="mt-1 text-xs text-white/40">{item.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
