import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '../ui/Button'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for solo operators validating demand.',
    features: ['Lead capture form', 'Admin dashboard', 'Status updates', 'Email search'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$29',
    period: '/month',
    description: 'For teams that need a polished lead desk every day.',
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
    description: 'For agencies managing multiple pipelines.',
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
    <section id="pricing" className="relative py-20 sm:py-24 lg:py-28">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
            Pricing
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Simple plans. Premium feel.
          </h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">
            Transparent pricing shaped for startups and training teams.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              whileHover={reduced ? undefined : { y: -6 }}
              className={`relative rounded-3xl p-[1px] ${
                plan.featured
                  ? 'bg-gradient-to-b from-indigo-400/70 via-blue-500/40 to-violet-500/30'
                  : 'bg-white/10'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 text-xs font-medium text-white shadow-lg shadow-indigo-500/30">
                  Most Popular
                </span>
              )}
              <div className="flex h-full flex-col rounded-[1.4rem] bg-[#0b1020] p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-white/50">{plan.description}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-white">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-white/45">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/70">
                      <Check className="h-4 w-4 shrink-0 text-indigo-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {plan.name === 'Scale' ? (
                    <Button as="a" href="#contact" variant="secondary" className="w-full">
                      {plan.cta}
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      to="/login"
                      variant={plan.featured ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
