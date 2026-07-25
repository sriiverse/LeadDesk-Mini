import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Mail, MessageSquare, Send, Wallet } from 'lucide-react'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { BUDGET_OPTIONS } from '../../utils/constants'
import { validateContactForm } from '../../utils/validators'
import { leadsApi } from '../../services/api'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const initialValues = {
  name: '',
  email: '',
  budget: '',
  message: '',
}

export default function Contact() {
  const reveal = useScrollReveal()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

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
    <section id="contact" className="relative py-20 sm:py-24 lg:py-28">
      <div className="container-app">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div {...reveal}>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300/80">
              Contact
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Tell us about your next opportunity
            </h2>
            <p className="mt-4 text-base text-white/55 sm:text-lg">
              Share a few details and we will route your lead into the LeadDesk
              pipeline instantly.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: 'Direct inbox', value: 'hello@leaddesk.app' },
                { icon: Wallet, label: 'Budget-aware routing', value: 'Matched to your range' },
                {
                  icon: MessageSquare,
                  label: 'Human follow-up',
                  value: 'Tracked from New → Closed',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/45">{item.label}</p>
                    <p className="font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="gradient-border p-[1px]"
          >
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-[1.2rem] bg-[#0d1220]/90 p-5 backdrop-blur-xl sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Ada Lovelace"
                  value={values.name}
                  onChange={onChange}
                  error={errors.name}
                  autoComplete="name"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="ada@example.com"
                  value={values.email}
                  onChange={onChange}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>

              <div className="mt-4">
                <Select
                  id="budget"
                  name="budget"
                  label="Budget Range"
                  options={BUDGET_OPTIONS}
                  value={values.budget}
                  onChange={onChange}
                  error={errors.budget}
                  placeholder="Select your budget"
                />
              </div>

              <div className="mt-4">
                <Textarea
                  id="message"
                  name="message"
                  label="Message"
                  placeholder="Tell us about your project, timeline, and goals..."
                  value={values.message}
                  onChange={onChange}
                  error={errors.message}
                  rows={5}
                />
              </div>

              <Button type="submit" loading={loading} className="mt-6 w-full" size="lg">
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
