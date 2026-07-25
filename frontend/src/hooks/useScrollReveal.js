import { usePrefersReducedMotion } from './useMediaQuery'

export function useScrollReveal(delay = 0) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return {
      initial: false,
      whileInView: undefined,
      viewport: undefined,
      transition: undefined,
    }
  }

  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }
}
