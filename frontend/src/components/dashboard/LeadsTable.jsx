import { STATUS_STYLES } from '../../utils/constants'
import { formatDate, formatShortDate } from '../../utils/format'
import EmptyState from '../ui/EmptyState'
import Skeleton from '../ui/Skeleton'

export default function LeadsTable({ leads, loading, onStatusChange, updatingId }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full md:h-16" />
        ))}
      </div>
    )
  }

  if (!leads.length) {
    return (
      <EmptyState
        title="No leads found"
        description="Try adjusting your search or status filter, or wait for new contact submissions."
      />
    )
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-white/8 md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.12em] text-white/40">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Budget</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-white/6 transition hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-4 font-medium text-white">{lead.name}</td>
                  <td className="px-4 py-4 text-white/70">{lead.email}</td>
                  <td className="px-4 py-4 text-white/70">{lead.budget}</td>
                  <td className="px-4 py-4">
                    <StatusSelect
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={(status) => onStatusChange(lead.id, status)}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-white/55">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="max-w-xs px-4 py-4 text-white/55">
                    <span className="line-clamp-2">{lead.message}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {leads.map((lead) => (
          <article
            key={lead.id}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-white">{lead.name}</h3>
                <p className="mt-1 truncate text-sm text-white/55">{lead.email}</p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs ${STATUS_STYLES[lead.status]}`}
              >
                {lead.status}
              </span>
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="text-white/40">Budget</dt>
                <dd className="mt-1 text-white/80">{lead.budget}</dd>
              </div>
              <div>
                <dt className="text-white/40">Created</dt>
                <dd className="mt-1 text-white/80">{formatShortDate(lead.created_at)}</dd>
              </div>
              <div>
                <dt className="text-white/40">Message</dt>
                <dd className="mt-1 text-white/70">{lead.message}</dd>
              </div>
              <div>
                <dt className="mb-1.5 text-white/40">Update status</dt>
                <StatusSelect
                  value={lead.status}
                  disabled={updatingId === lead.id}
                  onChange={(status) => onStatusChange(lead.id, status)}
                />
              </div>
            </dl>
          </article>
        ))}
      </div>
    </>
  )
}

function StatusSelect({ value, onChange, disabled }) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Update lead status"
      className={`min-h-11 rounded-xl border bg-white/[0.04] px-3 py-2 text-sm outline-none transition focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60 ${STATUS_STYLES[value] || 'border-white/10 text-white'}`}
    >
      <option value="New" className="bg-[#0d1220]">
        New
      </option>
      <option value="Contacted" className="bg-[#0d1220]">
        Contacted
      </option>
      <option value="Closed" className="bg-[#0d1220]">
        Closed
      </option>
    </select>
  )
}
