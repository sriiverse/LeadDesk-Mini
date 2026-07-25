import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Activity, ArrowUpRight, Bell, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const kpis = [
  { label: 'Total Leads', value: '1,248', delta: '+18%', color: 'text-emerald-300' },
  { label: 'Conversion', value: '38%', delta: '+6%', color: 'text-cyan-300' },
  { label: 'Pipeline', value: '$284k', delta: '+12%', color: 'text-indigo-300' },
]

const chartPoints = [28, 36, 32, 48, 42, 58, 52, 68, 62, 78, 72, 88]

export default function HeroDashboard() {
  const reduced = usePrefersReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [18, 8]), { stiffness: 60, damping: 16 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 60, damping: 16 })

  useEffect(() => {
    if (reduced) return undefined
    const onMove = (event) => {
      mx.set(event.clientX / window.innerWidth - 0.5)
      my.set(event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, reduced])

  return (
    <div className="perspective-stage relative mx-auto w-full max-w-5xl">
      <motion.div
        className="absolute inset-x-[10%] bottom-[-8%] h-24 rounded-[100%] bg-cyan-400/30 blur-3xl"
        animate={reduced ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-x-[18%] bottom-[-2%] h-10 rounded-[100%] bg-indigo-500/40 blur-2xl"
        animate={reduced ? undefined : { opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.div
        style={
          reduced
            ? { rotateX: 14, rotateY: -8 }
            : { rotateX, rotateY, transformPerspective: 1400 }
        }
        className="preserve-3d relative"
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.25 }}
      >
        <FloatingNote
          className="-left-2 top-8 sm:-left-8 sm:top-12 lg:-left-16"
          delay={0.8}
          title="New lead captured"
          subtitle="Ava Chen · Growth"
        />
        <FloatingNote
          className="-right-1 top-20 sm:-right-6 sm:top-16 lg:-right-14"
          delay={1.05}
          title="Status updated"
          subtitle="Contacted → Closed"
          accent="cyan"
        />

        <div className="gradient-border relative overflow-hidden rounded-[1.6rem] p-[1px] shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
          <div className="relative overflow-hidden rounded-[1.55rem] bg-[#070b16]/90 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(99,102,241,0.22),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,0.14),transparent_35%)]" />
            <div className="noise-overlay opacity-[0.03]" />

            <div className="relative flex items-center justify-between border-b border-white/8 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Live pipeline
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <Bell className="h-3.5 w-3.5 text-white/60" />
              </div>
            </div>

            <div className="relative grid gap-3 p-3 sm:gap-4 sm:p-5 lg:grid-cols-[1.35fr_0.9fr]">
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {kpis.map((kpi, index) => (
                    <motion.div
                      key={kpi.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 sm:p-3"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + index * 0.08, type: 'spring', stiffness: 120 }}
                    >
                      <p className="truncate text-[10px] uppercase tracking-[0.14em] text-white/40 sm:text-xs">
                        {kpi.label}
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-display)] text-base font-semibold text-white sm:text-xl">
                        {kpi.value}
                      </p>
                      <p className={`mt-0.5 flex items-center gap-1 text-[10px] sm:text-xs ${kpi.color}`}>
                        <ArrowUpRight className="h-3 w-3" />
                        {kpi.delta}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs text-white/50 sm:text-sm">Pipeline Overview</p>
                    <Activity className="h-4 w-4 text-indigo-300" />
                  </div>
                  <div className="relative h-28 sm:h-36">
                    <svg viewBox="0 0 240 100" className="h-full w-full overflow-visible" aria-hidden="true">
                      <defs>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="50%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
                          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d={buildAreaPath(chartPoints)}
                        fill="url(#areaGrad)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                      <motion.path
                        d={buildLinePath(chartPoints)}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.7, duration: 1.4, ease: 'easeInOut' }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
                  <p className="mb-3 text-xs text-white/50 sm:text-sm">Top Sources</p>
                  <div className="flex items-center gap-4">
                    <ProgressRing value={72} />
                    <div className="space-y-2 text-xs sm:text-sm">
                      <LegendDot color="bg-indigo-400" label="Website" value="42%" />
                      <LegendDot color="bg-cyan-400" label="Referrals" value="30%" />
                      <LegendDot color="bg-violet-400" label="Outbound" value="28%" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
                  <p className="mb-3 text-xs text-white/50 sm:text-sm">Live activity</p>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Marcus Reed', status: 'New', tone: 'text-indigo-300' },
                      { name: 'Priya Nair', status: 'Contacted', tone: 'text-cyan-300' },
                      { name: 'Noah Blake', status: 'Closed', tone: 'text-emerald-300' },
                    ].map((row, index) => (
                      <motion.div
                        key={row.name}
                        className="flex items-center justify-between rounded-xl bg-white/[0.03] px-2.5 py-2"
                        animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
                        transition={{ duration: 3.2, delay: index * 0.4, repeat: Infinity }}
                      >
                        <span className="text-xs text-white/75 sm:text-sm">{row.name}</span>
                        <span className={`text-[10px] uppercase tracking-wider ${row.tone}`}>
                          {row.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function FloatingNote({ className, title, subtitle, delay = 0, accent = 'indigo' }) {
  const glow =
    accent === 'cyan'
      ? 'shadow-cyan-400/20 border-cyan-300/20'
      : 'shadow-indigo-400/20 border-indigo-300/20'

  return (
    <motion.div
      className={`absolute z-20 hidden w-44 rounded-2xl border bg-[#0b1224]/85 p-3 shadow-2xl backdrop-blur-xl sm:block ${glow} ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, type: 'spring', stiffness: 120 },
        y: { delay: delay + 0.4, duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <p className="text-xs font-medium text-white">{title}</p>
      <p className="mt-1 text-[11px] text-white/45">{subtitle}</p>
    </motion.div>
  )
}

function ProgressRing({ value }) {
  const radius = 34
  const circ = 2 * Math.PI * radius
  const offset = circ - (value / 100) * circ

  return (
    <svg width="84" height="84" viewBox="0 0 84 84" className="shrink-0" aria-hidden="true">
      <circle cx="42" cy="42" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
      <motion.circle
        cx="42"
        cy="42"
        r={radius}
        stroke="url(#ringGrad)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ delay: 0.9, duration: 1.4, ease: 'easeOut' }}
        transform="rotate(-90 42 42)"
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <text x="42" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">
        {value}%
      </text>
    </svg>
  )
}

function LegendDot({ color, label, value }) {
  return (
    <div className="flex items-center gap-2 text-white/70">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="flex-1">{label}</span>
      <span className="text-white/90">{value}</span>
    </div>
  )
}

function buildLinePath(points) {
  const step = 240 / (points.length - 1)
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${100 - p}`)
    .join(' ')
}

function buildAreaPath(points) {
  const line = buildLinePath(points)
  return `${line} L 240 100 L 0 100 Z`
}
