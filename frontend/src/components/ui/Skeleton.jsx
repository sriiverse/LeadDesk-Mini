export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/[0.06] ${className}`}
      aria-hidden="true"
    />
  )
}
