import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../utils/constants'
import Button from '../ui/Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || open ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <nav
        className="container-app flex min-h-16 items-center justify-between gap-4 py-3"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="group flex min-h-11 items-center gap-2.5"
          onClick={close}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 font-[family-name:var(--font-display)] text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
            L
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white">
            LeadDesk
            <span className="text-indigo-300"> Mini</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex lg:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button as={Link} to="/login" variant="ghost" size="sm">
            Sign in
          </Button>
          <Button as={Link} to="/login" size="sm">
            Open Dashboard
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close menu overlay"
              onClick={close}
            />
            <motion.div
              id="mobile-drawer"
              className="glass-strong absolute inset-x-0 top-full border-t border-white/10 md:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container-app flex flex-col gap-1 py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="inline-flex min-h-11 items-center rounded-xl px-4 text-base text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                  <Button as={Link} to="/login" variant="secondary" onClick={close}>
                    Sign in
                  </Button>
                  <Button as={Link} to="/login" onClick={close}>
                    Open Dashboard
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
