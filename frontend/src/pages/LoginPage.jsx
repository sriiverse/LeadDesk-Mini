import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { ArrowLeft, LogIn } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingScreen from '../components/ui/LoadingScreen'
import { useAuth } from '../contexts/AuthContext'
import { validateLoginForm } from '../utils/validators'

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (authLoading) return <LoadingScreen label="Checking session…" />
  if (isAuthenticated) return <Navigate to="/admin" replace />

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const result = validateLoginForm(values)
    if (!result.valid) {
      setErrors(result.errors)
      return
    }

    setLoading(true)
    try {
      await login(result.values.email, result.values.password)
      toast.success('Welcome back!')
      navigate('/admin', { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070a12]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="container-app relative z-10 flex min-h-screen flex-col justify-center py-10">
        <Link
          to="/"
          className="mb-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm text-white/55 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 font-[family-name:var(--font-display)] text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
              L
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
              Admin Sign In
            </h1>
            <p className="mt-2 text-sm text-white/55">
              Access your LeadDesk Mini dashboard with JWT authentication.
            </p>
          </div>

          <div className="gradient-border p-[1px]">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-[1.2rem] bg-[#0d1220]/90 p-6 backdrop-blur-xl sm:p-8"
            >
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="admin@leaddesk.com"
                value={values.email}
                onChange={onChange}
                error={errors.email}
                autoComplete="email"
              />
              <div className="mt-4">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={onChange}
                  error={errors.password}
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" loading={loading} className="mt-6 w-full" size="lg">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>

              <p className="mt-5 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-white/45">
                Demo credentials: <span className="text-white/70">admin@leaddesk.com</span> /{' '}
                <span className="text-white/70">Admin@123456</span>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
