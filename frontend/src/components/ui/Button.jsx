import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40',
  secondary:
    'glass text-white hover:bg-white/10 border border-white/10',
  ghost: 'bg-transparent text-white/80 hover:text-white hover:bg-white/5',
  danger: 'bg-rose-500/90 text-white hover:bg-rose-500',
}

const sizes = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm sm:text-base',
  lg: 'min-h-12 px-6 text-base',
}

const MotionButton = motion.button
const MotionAnchor = motion.a
const MotionLink = motion.create(Link)

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    disabled = false,
    type = 'button',
    as = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading
  const sharedClassName = `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`
  const motionProps = {
    whileHover: isDisabled ? undefined : { y: -2, scale: 1.01 },
    whileTap: isDisabled ? undefined : { scale: 0.98 },
    className: sharedClassName,
    'aria-busy': loading || undefined,
    ref,
    ...props,
  }

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </>
  )

  if (as === 'a') {
    return <MotionAnchor {...motionProps}>{content}</MotionAnchor>
  }

  if (as === Link) {
    return <MotionLink {...motionProps}>{content}</MotionLink>
  }

  return (
    <MotionButton type={type} disabled={isDisabled} {...motionProps}>
      {content}
    </MotionButton>
  )
})

export default Button
