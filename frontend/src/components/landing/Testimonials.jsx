import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const testimonials = [
  {
    quote:
      'LeadDesk Mini feels like a product we would actually put in front of clients. The dashboard is fast, clear, and beautiful.',
    name: 'Ava Chen',
    role: 'Growth Lead, Northline',
  },
  {
    quote:
      'Finally a lead form that does not look like a student project. The glass UI and status workflow are excellent.',
    name: 'Marcus Reed',
    role: 'Founder, Orbit Studio',
  },
  {
    quote:
      'Auth, search, and pipeline updates just work. It is the rare qualification build that feels production-ready.',
    name: 'Priya Nair',
    role: 'Product Manager, Signal Ops',
  },
]

export default function Testimonials() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="testimonials" className="relative py-20 sm:py-24 lg:py-28">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
            Testimonials
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Loved by operators who live in the pipeline
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.name}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={reduced ? undefined : { y: -4 }}
              className="gradient-border flex h-full flex-col p-[1px]"
            >
              <div className="flex h-full flex-col rounded-[1.2rem] bg-[#0d1220]/85 p-6 backdrop-blur-xl">
                <Quote className="mb-4 h-5 w-5 text-indigo-300/80" aria-hidden="true" />
                <blockquote className="flex-1 text-sm leading-relaxed text-white/70">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-white/45">{item.role}</p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
