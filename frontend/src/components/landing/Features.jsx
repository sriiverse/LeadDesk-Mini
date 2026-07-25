import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { BarChart3, Filter, Lock, Rocket, Search, Zap } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const features = [
  {
    icon: Zap,
    title: 'Instant Capture',
    description: 'Frictionless forms that turn interest into structured pipeline entries in seconds.',
    span: 'lg:col-span-2 lg:row-span-2',
    visual: 'form',
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find anyone by name, email, or message instantly.',
    span: 'lg:col-span-1',
    visual: 'search',
  },
  {
    icon: Filter,
    title: 'Pipeline Control',
    description: 'Move New → Contacted → Closed with one click.',
    span: 'lg:col-span-1',
    visual: 'pipeline',
  },
  {
    icon: BarChart3,
    title: 'Live Analytics',
    description: 'Glanceable stats that keep conversion health visible.',
    span: 'lg:col-span-2',
    visual: 'chart',
  },
  {
    icon: Lock,
    title: 'Secure Access',
    description: 'JWT auth and bcrypt hashing — production grade.',
    span: 'lg:col-span-1',
    visual: 'secure',
  },
  {
    icon: Rocket,
    title: 'Deploy Ready',
    description: 'Netlify + Render architecture from day one.',
    span: 'lg:col-span-1',
    visual: 'deploy',
  },
]

export default function Features() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[100px]" />
      </div>

      <div className="container-app relative">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-300/80">
            Features
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Built as a <span className="text-gradient">bento of power</span>
          </h2>
          <p className="mt-4 text-base text-white/50 sm:text-lg">
            Interactive modules that feel like product surfaces — not marketing tiles.
          </p>
        </motion.div>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature, index) => (
            <BentoCard key={feature.title} feature={feature} index={index} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BentoCard({ feature, index, reduced }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(129,140,248,0.18), transparent 55%)`

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 90, damping: 16 }}
      whileHover={reduced ? undefined : { y: -6, scale: 1.01 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        mouseX.set(event.clientX - rect.left)
        mouseY.set(event.clientY - rect.top)
      }}
      className={`group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#080d1a]/70 p-[1px] ${feature.span}`}
    >
      <div className="relative h-full overflow-hidden rounded-[1.55rem] bg-[#080d1a]/90 p-5 sm:p-6">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
            <feature.icon className="h-5 w-5" />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/50">{feature.description}</p>
          <div className="mt-auto pt-5">
            <BentoVisual type={feature.visual} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function BentoVisual({ type }) {
  if (type === 'form') {
    return (
      <div className="space-y-2 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
        {['Name', 'Email', 'Budget'].map((label, i) => (
          <motion.div
            key={label}
            className="h-8 rounded-xl border border-white/8 bg-white/[0.03] px-3 text-[11px] leading-8 text-white/35"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.8, delay: i * 0.25, repeat: Infinity }}
          >
            {label}
          </motion.div>
        ))}
        <div className="h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-center text-xs font-medium leading-9 text-white">
          Submit lead
        </div>
      </div>
    )
  }

  if (type === 'chart') {
    const bars = [40, 65, 45, 80, 55, 90, 70]
    return (
      <div className="flex h-20 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500/40 to-cyan-300/80"
            initial={{ height: 8 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, type: 'spring', stiffness: 120, damping: 14 }}
          />
        ))}
      </div>
    )
  }

  if (type === 'pipeline') {
    return (
      <div className="flex items-center gap-2">
        {['New', 'Contacted', 'Closed'].map((step, i) => (
          <motion.span
            key={step}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/70"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.2, delay: i * 0.2, repeat: Infinity }}
          >
            {step}
          </motion.span>
        ))}
      </div>
    )
  }

  if (type === 'search') {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/40">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          Searching leads…
        </motion.span>
      </div>
    )
  }

  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300"
        animate={{ x: ['-40%', '120%'] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
