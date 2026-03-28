'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Bonsai from './components/Bonsai'

export default function Home() {
  return (
    <main
      style={{
        height: 'calc(var(--vp-height, 100vh) - 68px)',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* about me ——→ top right */}
      <div style={{ position: 'absolute', top: '2rem', right: '3rem', zIndex: 3 }}>
        <Link
          href="/about"
          style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'var(--font-cabinet)',
            fontWeight: 500,
            fontSize: '1.15rem',
            color: '#0a0a0a',
            textDecoration: 'none',
          }}
        >
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 2.1 } },
            }}
            style={{ display: 'inline-flex' }}
          >
            {'about me →'.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.01 } },
                }}
                style={{ whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </Link>
      </div>

      {/* Title block */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          style={{
            fontFamily: 'var(--font-clash)',
            fontWeight: 600,
            fontSize: 'clamp(4rem, 13vw, 16rem)',
            lineHeight: 0.88,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          {'DJAMAO PIERRE'.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
              }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
          }}
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontWeight: 500,
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            color: '#0a0a0a',
            marginTop: '1rem',
            textAlign: 'center',
          }}
        >
          {'DESIGNER DIGITAL'.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
              }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
      </div>

      {/* Bonsai */}
      <Bonsai />
    </main>
  )
}
