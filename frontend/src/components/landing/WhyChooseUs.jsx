import { motion } from 'framer-motion'
import { CheckCircle2, Gauge, Layers3, ShieldCheck } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const reasons = [
  {
    icon: Gauge,
    title: 'Operator-first speed',
    text: 'Keyboard-friendly flows, instant feedback, and zero clutter between you and the next lead.',
  },
  {
    icon: Layers3,
    title: 'Layered premium UI',
    text: 'Glass panels, gradient borders, and depth-driven visuals inspired by Linear, Vercel, and Stripe.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-grade auth',
    text: 'JWT-protected routes with bcrypt password hashing — no demo shortcuts, no fake sessions.',
  },
]

const bullets = [
  'Mobile-first across 15+ breakpoints',
  'Accessible controls and ARIA labels',
  'Toast-driven success and error states',
  'Clean architecture ready for handoff',
]

export default function WhyChooseUs() {
  const reveal = useScrollReveal()

  return (
    <section id="why-us" className="relative py-20 sm:py-24 lg:py-28">
      <div className="container-app">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div {...reveal}>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
              Why Choose Us
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Built like a shipped SaaS product
            </h2>
            <p className="mt-4 text-base text-white/55 sm:text-lg">
              LeadDesk Mini is not a prototype shell. It is a complete capture-to-dashboard
              system with real validation, durable auth, and a polished dark interface.
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-white/70 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid gap-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="glass rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <reason.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                      {reason.text}
                    </p>
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
