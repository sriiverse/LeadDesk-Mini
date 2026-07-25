import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Check } from 'lucide-react'
import MagneticButton from '../effects/MagneticButton'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'For solo operators validating demand.',
    features: ['Lead capture form', 'Admin dashboard', 'Status updates', 'Email search'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$29',
    period: '/month',
    description: 'For teams that live in the pipeline daily.',
    features: [
      'Everything in Starter',
      'Priority support',
      'Advanced filters',
      'Team-ready workflow',
    ],
    cta: 'Start Growth',
    featured: true,
  },
  {
    name: 'Scale',
    price: '$79',
    period: '/month',
    description: 'For agencies managing multiple desks.',
    features: [
      'Everything in Growth',
      'Custom onboarding',
      'SLA response',
      'Deployment assistance',
    ],
    cta: 'Talk to Us',
    featured: false,
  },
]

export default function Pricing() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-[120px]" />
      </div>

      <div className="container-app relative">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-300/80">
            Pricing
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Simple plans. <span className="text-gradient">Premium feel.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3 lg:gap-6 lg:items-center">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan, index, reduced }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.16), transparent 55%)`

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: plan.featured ? 1.04 : 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 80, damping: 16 }}
      whileHover={reduced ? undefined : { y: -10 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        mouseX.set(event.clientX - rect.left)
        mouseY.set(event.clientY - rect.top)
      }}
      className={`relative rounded-[1.8rem] p-[1px] ${
        plan.featured
          ? 'z-10 bg-gradient-to-b from-indigo-400 via-cyan-400/50 to-violet-500 shadow-[0_0_80px_rgba(99,102,241,0.25)]'
          : 'bg-white/10'
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-3 py-1 text-xs font-medium text-white shadow-lg">
          Most Popular
        </span>
      )}
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#080d1a] p-6 sm:p-8">
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
        <div className="relative z-10">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            {plan.name}
          </h3>
          <p className="mt-2 text-sm text-white/45">{plan.description}</p>
          <div className="mt-6 flex items-end gap-1">
            <span className="font-[family-name:var(--font-display)] text-5xl font-semibold text-white">
              {plan.price}
            </span>
            <span className="pb-1 text-sm text-white/40">{plan.period}</span>
          </div>
          <ul className="mt-6 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                <Check className="h-4 w-4 shrink-0 text-cyan-300" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {plan.name === 'Scale' ? (
              <MagneticButton
                href="#contact"
                strength={0.2}
                className="glass inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 font-medium text-white"
              >
                {plan.cta}
              </MagneticButton>
            ) : (
              <MagneticButton
                as="link"
                to="/login"
                strength={0.2}
                className={`inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 font-semibold text-white ${
                  plan.featured ? 'liquid-btn' : 'glass'
                }`}
              >
                {plan.cta}
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
