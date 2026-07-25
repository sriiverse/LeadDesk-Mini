import { Inbox } from 'lucide-react'

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'New items will appear here once available.',
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-white/55">{description}</p>
    </div>
  )
}
