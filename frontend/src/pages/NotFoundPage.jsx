import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070a12] px-4">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-lg text-center"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-indigo-300/80">404</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-white/55">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button as={Link} to="/">
            Go Home
          </Button>
          <Button as={Link} to="/login" variant="secondary">
            Admin Login
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
