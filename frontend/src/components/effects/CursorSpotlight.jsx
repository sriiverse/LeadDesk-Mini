import { useEffect, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

export default function CursorSpotlight({ className = '' }) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 80, damping: 20 })
  const springY = useSpring(y, { stiffness: 80, damping: 20 })
  const [visible, setVisible] = useState(false)
  const background = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(129,140,248,0.14), rgba(34,211,238,0.06) 35%, transparent 60%)`

  useEffect(() => {
    if (reduced) return undefined

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500 ${className}`}
      style={{
        background,
        opacity: visible ? 1 : 0,
      }}
    />
  )
}
