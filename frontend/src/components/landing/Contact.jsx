import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Mail, MessageSquare, Send, Wallet } from 'lucide-react'
import MagneticButton from '../effects/MagneticButton'
import { BUDGET_OPTIONS } from '../../utils/constants'
import { validateContactForm } from '../../utils/validators'
import { leadsApi } from '../../services/api'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const initialValues = {
  name: '',
  email: '',
  budget: '',
  message: '',
}

export default function Contact() {
  const reduced = usePrefersReducedMotion()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const result = validateContactForm(values)
    if (!result.valid) {
      setErrors(result.errors)
      toast.error('Please fix the highlighted fields.')
      return
    }

    setLoading(true)
    try {
      const { data } = await leadsApi.create(result.values)
      toast.success(data.message || 'Message submitted successfully!')
      setValues(initialValues)
      setErrors({})
    } catch (error) {
      const details = error.response?.data?.details
      if (details) setErrors(details)
      toast.error(error.response?.data?.error || 'Unable to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[110px]" />
      </div>

      <div className="container-app relative grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-300/80">
            Contact
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Tell us about your
            <span className="block text-gradient">next opportunity</span>
          </h2>
          <p className="mt-5 text-base text-white/50 sm:text-lg">
            Share a few details and we will route your lead into the pipeline instantly.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { icon: Mail, label: 'Direct inbox', value: 'hello@leaddesk.app' },
              { icon: Wallet, label: 'Budget-aware routing', value: 'Matched to your range' },
              {
                icon: MessageSquare,
                label: 'Human follow-up',
                value: 'Tracked from New → Closed',
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={reduced ? undefined : { x: 6 }}
                className="glass flex items-center gap-4 rounded-2xl p-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-cyan-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/40">{item.label}</p>
                  <p className="font-medium text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          className="gradient-border p-[1px]"
        >
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative overflow-hidden rounded-[1.4rem] bg-[#080d1a]/92 p-5 backdrop-blur-2xl sm:p-8"
          >
            <div className="noise-overlay opacity-[0.03]" />
            <div className="relative z-10 grid gap-5 sm:grid-cols-2">
              <FloatingField
                id="name"
                name="name"
                label="Name"
                value={values.name}
                error={errors.name}
                focused={focused === 'name'}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                onChange={onChange}
                autoComplete="name"
              />
              <FloatingField
                id="email"
                name="email"
                type="email"
                label="Email"
                value={values.email}
                error={errors.email}
                focused={focused === 'email'}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                onChange={onChange}
                autoComplete="email"
              />
            </div>

            <div className="relative z-10 mt-5">
              <label htmlFor="budget" className="mb-2 block text-sm text-white/55">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={values.budget}
                onChange={onChange}
                aria-invalid={Boolean(errors.budget)}
                className={`min-h-12 w-full appearance-none rounded-2xl border bg-white/[0.03] px-4 text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 ${
                  errors.budget ? 'border-rose-400/50' : 'border-white/10'
                }`}
              >
                <option value="" className="bg-[#0d1220]">
                  Select your budget
                </option>
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-[#0d1220]">
                    {option}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="mt-1.5 text-sm text-rose-300" role="alert">
                  {errors.budget}
                </p>
              )}
            </div>

            <div className="relative z-10 mt-5">
              <FloatingField
                id="message"
                name="message"
                label="Message"
                value={values.message}
                error={errors.message}
                focused={focused === 'message'}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                onChange={onChange}
                multiline
              />
            </div>

            <MagneticButton
              as="button"
              type="submit"
              strength={0.18}
              disabled={loading}
              className="liquid-btn relative z-10 mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {loading ? 'Sending…' : 'Send Message'}
            </MagneticButton>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function FloatingField({
  id,
  name,
  label,
  value,
  error,
  focused,
  onFocus,
  onBlur,
  onChange,
  type = 'text',
  autoComplete,
  multiline = false,
}) {
  const active = focused || Boolean(value)
  const shared = {
    id,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    autoComplete,
    'aria-invalid': Boolean(error),
    className: `peer w-full rounded-2xl border bg-white/[0.03] px-4 pt-6 pb-2 text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 ${
      error ? 'border-rose-400/50' : 'border-white/10'
    } ${multiline ? 'min-h-[140px] resize-y' : 'min-h-14'}`,
  }

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 z-10 origin-left transition-all duration-200 ${
          active ? 'top-2 text-[11px] text-cyan-300/80' : 'top-1/2 -translate-y-1/2 text-sm text-white/40'
        } ${multiline && !active ? 'top-5 translate-y-0' : ''}`}
      >
        {label}
      </label>
      {multiline ? <textarea {...shared} rows={5} /> : <input type={type} {...shared} />}
      {error && (
        <p className="mt-1.5 text-sm text-rose-300" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
