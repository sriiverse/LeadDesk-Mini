export default function Input({
  id,
  label,
  error,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-11 w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-white placeholder:text-white/35 outline-none transition focus:border-indigo-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20 ${
          error ? 'border-rose-400/50' : 'border-white/10'
        }`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-300" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
