'use client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

function getVariants(pathname, reduced) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }

  if (/^\/projets\/.+/.test(pathname)) {
    return {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
      exit:    { opacity: 0, x: -30, transition: { duration: 0.25, ease: 'easeIn' } },
    }
  }
  if (pathname === '/projets') {
    return {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: 'easeOut' } },
      exit:    { opacity: 0, y: -10, transition: { duration: 0.25 } },
    }
  }
  if (pathname === '/contact') {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
      exit:    { opacity: 0, transition: { duration: 0.3 } },
    }
  }
  // HOME, ABOUT, fallback
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit:    { opacity: 0, transition: { duration: 0.25 } },
  }
}

export default function PageTransition({ children }) {
  const pathname = usePathname()
  const reduced   = useReducedMotion()
  const v = getVariants(pathname, reduced)

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
