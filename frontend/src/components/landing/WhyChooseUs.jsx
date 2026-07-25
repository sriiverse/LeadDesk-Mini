import { motion } from 'framer-motion'
import { CheckCircle2, Gauge, Layers3, ShieldCheck } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const reasons = [
  {
    icon: Gauge,
    title: 'Operator-first speed',
    text: 'Zero clutter between you and the next conversion.',
  },
  {
    icon: Layers3,
    title: 'Layered premium UI',
    text: 'Depth, glass, and motion that feel product-native.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-grade auth',
    text: 'Real JWT sessions and bcrypt — no shortcuts.',
  },
]

const bullets = [
  'Mobile-first across 15+ breakpoints',
  'Accessible controls and ARIA labels',
  'Toast-driven success and error states',
  'Clean architecture ready for handoff',
]

export default function WhyChooseUs() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="why-us" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-500/15 blur-[110px]" />
      </div>

      <div className="container-app relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 70, damping: 16 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-300/80">
            Why Choose Us
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Designed like a
            <span className="block text-gradient">shipped product.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base text-white/50 sm:text-lg">
            LeadDesk Mini is a complete capture-to-dashboard system with durable auth and a
            cinematic operator interface.
          </p>

          <ul className="mt-8 space-y-3">
            {bullets.map((bullet, index) => (
              <motion.li
                key={bullet}
                initial={reduced ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-3 text-sm text-white/70 sm:text-base"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <motion.path
              d="M40,80 C120,40 180,200 280,120"
              fill="none"
              stroke="url(#whyLine)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="whyLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative space-y-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={reduced ? false : { opacity: 0, y: 30, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 90, damping: 16 }}
                whileHover={reduced ? undefined : { x: 8, scale: 1.02 }}
                className="glass preserve-3d rounded-2xl p-5 sm:p-6"
                style={{ rotate: index % 2 === 0 ? -1.2 : 1.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-cyan-400/15 text-cyan-300">
                    <reason.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">{reason.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
