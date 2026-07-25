import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

export default function StatCard({ label, value, icon: Icon, accent = 'indigo' }) {
  const reduced = usePrefersReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const accents = {
    indigo: 'from-indigo-500/20 to-indigo-500/5 text-indigo-300',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-300',
    violet: 'from-violet-500/20 to-violet-500/5 text-violet-300',
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-300',
  }

  useEffect(() => {
    if (reduced) {
      count.set(value || 0)
      return undefined
    }
    const controls = animate(count, value || 0, { duration: 0.9, ease: 'easeOut' })
    return controls.stop
  }, [value, count, reduced])

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -4 }}
      className="gradient-border p-[1px]"
    >
      <div className="rounded-[1.2rem] bg-[#0d1220]/85 p-5 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-white/45">{label}</p>
            <motion.p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
              {rounded}
            </motion.p>
          </div>
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accents[accent]}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
