'use client'
import { motion, useReducedMotion } from 'framer-motion'

const STAGGER = 0.08
const DURATION = 0.35

export default function VerticalWords({ name, color, size = 60 }) {
  const reduced = useReducedMotion()
  const words = name.split(' ')
  const responsiveSize = Math.max(30, size)
  const wrapH = responsiveSize * 1.15  // hauteur du wrapper : dépasse lineHeight:1 pour ne pas couper les descentes

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(4px, 1.5vw, 10px)', height: '100%' }}>
      {words.map((word, wi) => (
        <div
          key={wi}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          {word.split('').map((char, ci) => (
            // paddingLeft ICI (sur le wrapper) — pas à l'intérieur du overflow:hidden
            <div
              key={ci}
              style={{
                overflow: 'hidden',
                height: `${wrapH}px`,
                paddingLeft: char === 'I' ? `${responsiveSize * 0.18}px` : 0,
              }}
            >
              <motion.span
                initial={reduced ? { y: 0 } : { y: wrapH }}
                animate={{ y: 0 }}
                transition={reduced ? {} : {
                  delay: wi * 0.1 + ci * STAGGER,
                  duration: DURATION,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: 'var(--font-clash)',
                  fontWeight: 700,
                  fontSize: `${responsiveSize}px`,
                  lineHeight: 1,
                  color,
                  display: 'block',
                  letterSpacing: '-0.02em',
                }}
              >
                {char}
              </motion.span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
