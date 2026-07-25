import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Play } from 'lucide-react'
import AuroraBackground from '../effects/AuroraBackground'
import MagneticButton from '../effects/MagneticButton'
import HeroDashboard from './HeroDashboard'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const wordItem = {
  hidden: { y: '110%', opacity: 0, rotateX: 40 },
  show: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 90, damping: 14 },
  },
}

export default function Hero() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-16">
      <AuroraBackground />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-white/50"
            style={{
              left: `${8 + ((index * 17) % 84)}%`,
              top: `${12 + ((index * 23) % 70)}%`,
            }}
            animate={
              reduced
                ? undefined
                : {
                    opacity: [0.15, 0.8, 0.15],
                    y: [0, -18, 0],
                    scale: [1, 1.4, 1],
                  }
            }
            transition={{
              duration: 4 + (index % 5),
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container-app relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-100/90 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/70" />
              <span className="relative h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            Next-gen lead intelligence
          </motion.div>

          <motion.h1
            variants={wordContainer}
            initial={reduced ? false : 'hidden'}
            animate="show"
            className="font-[family-name:var(--font-display)] text-[3rem] leading-[0.92] font-semibold tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[6rem]"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span variants={wordItem} className="inline-block text-gradient-animated">
                Capture.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span variants={wordItem} className="inline-block text-gradient-animated">
                Track.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={wordItem} className="inline-block text-white">
                Convert.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base text-white/55 sm:text-lg md:text-xl"
          >
            A cinematic lead desk for operators who want clarity, speed, and a product that feels
            inevitable.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100, damping: 16 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticButton
              href="#contact"
              className="liquid-btn inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-7 text-base font-semibold text-white sm:w-auto"
            >
              Start Capturing Leads
              <motion.span
                animate={reduced ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </MagneticButton>

            <MagneticButton
              as="link"
              to="/login"
              strength={0.25}
              className="glass inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-7 text-base font-medium text-white/90 sm:w-auto"
            >
              <Play className="h-4 w-4 text-cyan-300" />
              Open Dashboard
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <HeroDashboard />
        </div>

        <motion.a
          href="#features"
          className="mx-auto mt-12 flex min-h-11 w-fit flex-col items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/35 transition hover:text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          aria-label="Scroll to features"
        >
          <span>Scroll</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
