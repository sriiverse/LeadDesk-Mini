import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const MotionAnchor = motion.a
const MotionLink = motion.create(Link)
const MotionButton = motion.button

export default function MagneticButton({
  children,
  className = '',
  as = 'a',
  strength = 0.35,
  ...props
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (event) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const shared = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: springX, y: springY },
    whileHover: reduced ? undefined : { scale: 1.03 },
    whileTap: reduced ? undefined : { scale: 0.98 },
    className,
    ...props,
  }

  if (as === 'link' || as === Link) {
    return <MotionLink {...shared}>{children}</MotionLink>
  }
  if (as === 'button') {
    return <MotionButton {...shared}>{children}</MotionButton>
  }
  return <MotionAnchor {...shared}>{children}</MotionAnchor>
}
