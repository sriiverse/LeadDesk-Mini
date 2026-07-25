import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Button from '../components/ui/Button'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px)')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const drawerOpen = !isDesktop && mobileOpen
  const sidebarCollapsed = isDesktop ? collapsed : isTablet ? collapsed : false

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-4">
        <Link to="/" className="flex min-h-11 items-center gap-2.5 overflow-hidden">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 font-[family-name:var(--font-display)] text-sm font-bold text-white">
            L
          </span>
          {!sidebarCollapsed && (
            <span className="truncate font-[family-name:var(--font-display)] text-base font-semibold text-white">
              LeadDesk Mini
            </span>
          )}
        </Link>
        {isDesktop && (
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/5 hover:text-white"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
        )}
        {!isDesktop && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Dashboard">
        <NavLink
          to="/admin"
          end
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition ${
              isActive
                ? 'bg-indigo-500/15 text-indigo-200'
                : 'text-white/65 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <LayoutDashboard className="h-5 w-5 shrink-0" />
          {!sidebarCollapsed && <span>Overview</span>}
        </NavLink>
      </nav>

      <div className="border-t border-white/8 p-3">
        {!sidebarCollapsed && (
          <p className="mb-3 truncate px-2 text-xs text-white/40">{user?.email}</p>
        )}
        <Button
          variant="secondary"
          className="w-full"
          onClick={logout}
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
          {!sidebarCollapsed && 'Logout'}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#070a12] text-white">
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute left-[-8%] top-[-8%] h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden border-r border-white/8 bg-[#0b1020]/95 backdrop-blur-xl transition-all duration-300 md:block ${
          sidebarCollapsed ? 'w-[88px]' : 'w-64'
        }`}
      >
        {SidebarContent}
      </aside>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close sidebar overlay"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[min(18rem,88vw)] border-r border-white/8 bg-[#0b1020] md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div
        className={`relative transition-all duration-300 ${
          sidebarCollapsed ? 'md:pl-[88px]' : 'md:pl-64'
        }`}
      >
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-white/8 bg-[#070a12]/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
              aria-label="Open sidebar"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-lg font-semibold sm:text-xl">
                Dashboard
              </h1>
              <p className="hidden text-xs text-white/45 sm:block">
                Monitor and manage your lead pipeline
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/55 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Authenticated
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
