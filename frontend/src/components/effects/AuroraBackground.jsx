import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

export default function AuroraBackground({ className = '' }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="aurora-mesh absolute inset-0" />
      <motion.div
        className="absolute -left-[10%] top-[-10%] h-[55vmax] w-[55vmax] rounded-full bg-indigo-500/30 blur-[100px]"
        animate={
          reduced
            ? undefined
            : { x: [0, 80, -40, 0], y: [0, 40, -30, 0], scale: [1, 1.15, 0.95, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-15%] top-[5%] h-[50vmax] w-[50vmax] rounded-full bg-cyan-400/20 blur-[110px]"
        animate={
          reduced
            ? undefined
            : { x: [0, -60, 30, 0], y: [0, 60, -20, 0], scale: [1.1, 0.9, 1.2, 1.1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[25%] h-[45vmax] w-[45vmax] rounded-full bg-violet-600/25 blur-[120px]"
        animate={
          reduced ? undefined : { x: [0, 50, -70, 0], y: [0, -40, 30, 0], opacity: [0.35, 0.6, 0.4, 0.35] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,4,10,0.55)_55%,rgba(3,4,10,0.92)_100%)]" />
      <div className="noise-overlay" />
    </div>
  )
}
