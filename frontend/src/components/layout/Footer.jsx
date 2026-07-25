import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#02030a]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-indigo-500/10 to-transparent"
        aria-hidden="true"
      />

      <div className="container-app relative py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                L
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                LeadDesk Mini
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45">
              A cinematic lead management platform for teams who want clarity, speed, and
              conversion without the clutter.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Product
            </h3>
            <ul className="mt-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Access
            </h3>
            <ul className="mt-4 space-y-1">
              <li>
                <Link
                  to="/login"
                  className="inline-flex min-h-11 items-center text-sm text-white/60 transition hover:text-white"
                >
                  Admin Login
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center text-sm text-white/60 transition hover:text-white"
                >
                  Contact Sales
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-white/35">
            © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            Built for{' '}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cyan-300 underline-offset-4 transition hover:text-cyan-200 hover:underline"
            >
              Digital Heroes Training Task
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
