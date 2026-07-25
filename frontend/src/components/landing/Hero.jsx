import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react'
import Button from '../ui/Button'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const floatingCards = [
  {
    title: 'Conversion Rate',
    value: '+38%',
    subtitle: 'This month',
    icon: TrendingUp,
    className: 'left-[4%] top-[22%] sm:left-[6%] sm:top-[28%]',
  },
  {
    title: 'Active Pipeline',
    value: '128',
    subtitle: 'Qualified leads',
    icon: Users,
    className: 'right-[4%] top-[18%] sm:right-[7%] sm:top-[24%]',
  },
  {
    title: 'Response Time',
    value: '2.4h',
    subtitle: 'Avg. follow-up',
    icon: Sparkles,
    className:
      'bottom-[14%] left-1/2 -translate-x-1/2 sm:bottom-[18%] sm:left-auto sm:right-[12%] sm:translate-x-0',
  },
]

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 })
  const inverseX = useTransform(springX, (value) => -value)

  useEffect(() => {
    if (reduced) return undefined

    const onMove = (event) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((event.clientX / innerWidth - 0.5) * 28)
      mouseY.set((event.clientY / innerHeight - 0.5) * 20)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY, reduced])

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 pb-16 sm:pt-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl"
          style={reduced ? undefined : { x: springX, y: springY }}
          animate={
            reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-4rem] top-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl"
          style={reduced ? undefined : { x: inverseX, y: springY }}
          animate={
            reduced ? undefined : { scale: [1.1, 0.95, 1.1], opacity: [0.3, 0.5, 0.3] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
          animate={reduced ? undefined : { y: [0, -24, 0], x: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.14),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(7,10,18,0.55)_70%,#070a12)]" />
      </div>

      {!reduced &&
        floatingCards.map((card, index) => (
          <motion.div
            key={card.title}
            className={`pointer-events-none absolute z-10 hidden w-[180px] sm:block lg:w-[210px] ${card.className}`}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + index * 0.12, duration: 0.6 }}
          >
            <div className="gradient-border p-[1px] shadow-2xl shadow-indigo-500/10">
              <div className="rounded-[1.2rem] bg-[#0d1220]/80 p-4 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2 text-indigo-300">
                  <card.icon className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.14em] text-white/45">
                    {card.title}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-white/45">{card.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}

      <div className="container-app relative z-20 flex min-h-[calc(100svh-8rem)] flex-col items-center justify-center text-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-indigo-200/90"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Lead Management, Reimagined
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block text-white">LeadDesk Mini</span>
          <span className="mt-2 block text-gradient">Capture. Track. Convert.</span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-6 max-w-2xl text-base text-white/60 sm:text-lg md:text-xl"
        >
          A premium lead desk for modern teams — glass-smooth workflows, instant
          insights, and a CRM-light experience that feels built for operators.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <Button as="a" href="#contact" size="lg" className="w-full sm:w-auto">
            Start Capturing Leads
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            as={Link}
            to="/login"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            View Admin Panel
          </Button>
        </motion.div>

        <motion.a
          href="#features"
          className="mt-14 inline-flex min-h-11 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 transition hover:text-white/70"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          aria-label="Scroll to features"
        >
          <span>Scroll</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
