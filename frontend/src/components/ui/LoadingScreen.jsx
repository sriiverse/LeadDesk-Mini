import { motion } from 'framer-motion'

export default function LoadingScreen({ label = 'Loading LeadDesk…' }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070a12] px-6"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex w-full max-w-[16rem] flex-col items-center gap-5 text-center">
        <motion.div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-xl shadow-indigo-500/30"
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
            L
          </span>
        </motion.div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <p className="text-sm text-white/55">{label}</p>
      </div>
    </div>
  )
}
