import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#05070e]">
      <div className="container-app py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 font-[family-name:var(--font-display)] text-sm font-bold text-white">
                L
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                LeadDesk Mini
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
              A modern lead management platform built to capture interest, organize
              conversations, and help teams convert faster.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/40">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/70 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/40">
              Access
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/login"
                  className="inline-flex min-h-11 items-center text-sm text-white/70 transition hover:text-white"
                >
                  Admin Login
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center text-sm text-white/70 transition hover:text-white"
                >
                  Contact Sales
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </p>
          <p className="text-sm text-white/55">
            Built for{' '}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-300 underline-offset-4 transition hover:text-indigo-200 hover:underline"
            >
              Digital Heroes Training Task
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
