export default function Select({
  id,
  label,
  error,
  options = [],
  placeholder = 'Select an option',
  className = '',
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-11 w-full appearance-none rounded-xl border bg-white/[0.03] px-4 py-2.5 text-white outline-none transition focus:border-indigo-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20 ${
          error ? 'border-rose-400/50' : 'border-white/10'
        }`}
        {...props}
      >
        <option value="" className="bg-[#0d1220] text-white">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0d1220] text-white">
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-300" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
