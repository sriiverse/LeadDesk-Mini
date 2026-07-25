import { motion } from 'framer-motion'
import { BarChart3, Filter, Lock, Rocket, Search, Zap } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const features = [
  {
    icon: Zap,
    title: 'Instant Capture',
    description:
      'Beautiful contact flows that convert visitors into structured leads without friction.',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description:
      'Find any lead by name, email, or message in milliseconds with live filtering.',
  },
  {
    icon: Filter,
    title: 'Status Pipeline',
    description:
      'Move leads from New to Contacted to Closed with one-click status updates.',
  },
  {
    icon: BarChart3,
    title: 'Live Analytics',
    description:
      'Glanceable stats cards keep your pipeline health visible at every moment.',
  },
  {
    icon: Lock,
    title: 'Secure Access',
    description:
      'Real JWT authentication, hashed passwords, and protected admin routes.',
  },
  {
    icon: Rocket,
    title: 'Deploy Ready',
    description:
      'Frontend on Netlify, backend on Render — production architecture from day one.',
  },
]

export default function Features() {
  const reveal = useScrollReveal()
  const reduced = usePrefersReducedMotion()

  return (
    <section id="features" className="relative py-20 sm:py-24 lg:py-28">
      <div className="container-app">
        <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
            Features
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything you need to run a modern lead desk
          </h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">
            Designed for clarity, speed, and a premium operator experience.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduced ? undefined : { y: -6 }}
              className="gradient-border group p-[1px]"
            >
              <div className="h-full rounded-[1.2rem] bg-[#0d1220]/80 p-6 backdrop-blur-xl transition group-hover:bg-[#11182a]/90">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
