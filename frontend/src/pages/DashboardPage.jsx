import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { CheckCircle2, Inbox, Search, Users, UserCheck } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import LeadsTable from '../components/dashboard/LeadsTable'
import { leadsApi } from '../services/api'
import { LEAD_STATUSES } from '../utils/constants'

export default function DashboardPage() {
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0 })
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (search.trim()) params.search = search.trim()
      if (status) params.status = status
      const { data } = await leadsApi.list(params)
      setLeads(data.leads || [])
      setStats(data.stats || { total: 0, new: 0, contacted: 0, closed: 0 })
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load leads.')
    } finally {
      setLoading(false)
    }
  }, [search, status])

  useEffect(() => {
    const timer = setTimeout(fetchLeads, 250)
    return () => clearTimeout(timer)
  }, [fetchLeads])

  const onStatusChange = async (id, nextStatus) => {
    setUpdatingId(id)
    try {
      const { data } = await leadsApi.updateStatus(id, nextStatus)
      setLeads((prev) => prev.map((lead) => (lead.id === id ? data.lead : lead)))
      const { data: statsData } = await leadsApi.stats()
      setStats(statsData.stats)
      toast.success('Lead status updated.')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Unable to update status.')
    } finally {
      setUpdatingId(null)
    }
  }

  const statItems = useMemo(
    () => [
      { label: 'Total Leads', value: stats.total, icon: Users, accent: 'indigo' },
      { label: 'New Leads', value: stats.new, icon: Inbox, accent: 'blue' },
      { label: 'Contacted', value: stats.contacted, icon: UserCheck, accent: 'violet' },
      { label: 'Closed', value: stats.closed, icon: CheckCircle2, accent: 'emerald' },
    ],
    [stats],
  )

  return (
    <div className="space-y-6 lg:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {statItems.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="gradient-border p-[1px]"
      >
        <div className="rounded-[1.2rem] bg-[#0d1220]/85 p-4 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                Leads
              </h2>
              <p className="mt-1 text-sm text-white/45">
                Search, filter, and update lead statuses in real time.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-[1fr_auto] lg:w-auto lg:min-w-[28rem]">
              <label className="relative block">
                <span className="sr-only">Search leads</span>
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, email, message…"
                  className="min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pr-4 pl-10 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20"
                />
              </label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                aria-label="Filter by status"
                className="min-h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="" className="bg-[#0d1220]">
                  All statuses
                </option>
                {LEAD_STATUSES.map((item) => (
                  <option key={item} value={item} className="bg-[#0d1220]">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <LeadsTable
              leads={leads}
              loading={loading}
              onStatusChange={onStatusChange}
              updatingId={updatingId}
            />
          </div>
        </div>
      </motion.section>
    </div>
  )
}
