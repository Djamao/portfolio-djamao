'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Bonsai from '../components/Bonsai'
import { useMobile } from '../hooks/useMobile'

const MOI_TEXTS = [
  "Designer digital français, nourri chaque jour par le hiphop. La musique, la mode, la danse, le djing. La spiritualité, les couleurs et la culture japonaise m'alimentent tout autant. Nujabes, Hayao Miyazaki et Nigo côté Japon. Katy_V4, Balo côté français.",
  "Mon process : une veille approfondie, puis je crée directement ce qui me vient. Le moodboard et la direction artistique viennent ensuite, avant les wireframes et la finalisation.",
  "Depuis petit, le mouvement fait partie de moi. Hiphop, breakdance, foot, basket, théâtre. Une blessure m'a éloigné de tout ça, mais l'esprit compétiteur est resté. C'est lui qui me pousse à tout donner sur chaque projet, avec rigueur.",
]
const TOTAL_CHARS = MOI_TEXTS.reduce((acc, t) => acc + t.length, 0)

export default function About() {
  const isMobile = useMobile()
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCharCount(c => {
          if (c >= TOTAL_CHARS) { clearInterval(interval); return c }
          return c + 1
        })
      }, isMobile ? 12 : 22)
    }, isMobile ? 400 : 1950)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [isMobile])

  let rem = charCount
  const visibleTexts = MOI_TEXTS.map(text => {
    const vis = Math.min(rem, text.length)
    rem = Math.max(0, rem - text.length)
    return text.slice(0, vis)
  })

  // — MOBILE —
  if (isMobile) {
    return (
      <main
        style={{
          height: 'calc(100vh - var(--navbar-height))',
          width: '100%',
          backgroundColor: '#ffffff',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div style={{ padding: 'var(--spacing-md) var(--padding-x) var(--spacing-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {/* COMPÉTENCES */}
          <div>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', color: '#0a0a0a', marginBottom: '0.75rem' }}>
              COMPÉTENCES
            </p>
            {['UI Design', 'UX Design', 'Motion design'].map((s) => (
              <p key={s} style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#0a0a0a', lineHeight: 1.6 }}>{s}</p>
            ))}
          </div>

          {/* LOGICIELS */}
          <div>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', color: '#0a0a0a', marginBottom: '0.75rem' }}>
              LOGICIELS
            </p>
            {['Figma', 'Photoshop', 'After Effect', 'Illustrator'].map((s) => (
              <p key={s} style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#0a0a0a', lineHeight: 1.6 }}>{s}</p>
            ))}
          </div>

          {/* MOI */}
          <div>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', color: '#0a0a0a', marginBottom: '0.75rem' }}>
              MOI
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {MOI_TEXTS.map((fullText, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.845rem', lineHeight: 1.5, visibility: 'hidden' }}>
                    {fullText}
                  </p>
                  <p style={{ position: 'absolute', top: 0, left: 0, width: '100%', fontFamily: 'var(--font-satoshi)', fontSize: '0.845rem', color: '#0a0a0a', lineHeight: 1.5 }}>
                    {visibleTexts[i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* projets → */}
        <Link
          href="/projets"
          style={{
            display: 'block',
            textAlign: 'right',
            padding: '0 var(--padding-x) var(--spacing-md)',
            fontFamily: 'var(--font-cabinet)',
            fontWeight: 500,
            fontSize: '1rem',
            color: '#0a0a0a',
            textDecoration: 'none',
          }}
        >
          projets →
        </Link>
      </main>
    )
  }

  // — DESKTOP —
  return (
    <main
      style={{
        height: 'calc(100vh - var(--navbar-height))',
        width: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Main row */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)',
          minHeight: 0,
          width: '100%',
          gap: 0,
        }}
      >
        {/* Left — animation + ABOUT ME flottant */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            marginLeft: 'clamp(-1rem, -2vw, -2rem)',
            minWidth: 0,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: 'scale(0.95)',
              transformOrigin: 'center center',
            }}
          >
            <source src="/mac-spinning.mp4" type="video/mp4" />
            <source src="/mac-spinning.webm" type="video/webm" />
          </video>
        </motion.div>

        {/* Right — skills + bio */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: 'var(--spacing-xl) var(--padding-x) var(--spacing-md) var(--spacing-md)',
            gap: 'clamp(1rem, 1.5vw, 1.5rem)',
            alignContent: 'space-between',
            minWidth: 0,
            overflow: 'auto',
          }}
        >
          {/* COMPÉTENCES + LOGICIELS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 8vw, 5rem)', marginLeft: 'clamp(-0.75rem, -1vw, -1.5rem)' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cabinet)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: 0, textTransform: 'uppercase', color: '#0a0a0a', marginBottom: '40px' }}>
                {'COMPÉTENCES'.split('').map((char, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.2, ease: 'easeOut' }} style={{ display: 'inline-block', whiteSpace: 'pre' }}>{char}</motion.span>
                ))}
              </p>
              {['UI Design', 'UX Design', 'Motion design'].map((s, i) => (
                <p key={s} style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#0a0a0a', lineHeight: 1.23, letterSpacing: 0 }}>
                  {s.split('').map((char, j) => (
                    <motion.span key={j} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.95 + i * 0.18 + j * 0.03, duration: 0.15, ease: 'easeOut' }} style={{ display: 'inline-block', whiteSpace: 'pre' }}>{char}</motion.span>
                  ))}
                </p>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-cabinet)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: 0, textTransform: 'uppercase', color: '#0a0a0a', marginBottom: '40px' }}>
                {'LOGICIELS'.split('').map((char, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.1, duration: 0.2, ease: 'easeOut' }} style={{ display: 'inline-block', whiteSpace: 'pre' }}>{char}</motion.span>
                ))}
              </p>
              {['Figma', 'Photoshop', 'After Effect', 'Illustrator'].map((s, i) => (
                <p key={s} style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#0a0a0a', lineHeight: 1.23, letterSpacing: 0 }}>
                  {s.split('').map((char, j) => (
                    <motion.span key={j} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.95 + i * 0.18 + j * 0.03, duration: 0.15, ease: 'easeOut' }} style={{ display: 'inline-block', whiteSpace: 'pre' }}>{char}</motion.span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* MOI */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 'auto' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cabinet)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: 0, textTransform: 'uppercase', color: '#0a0a0a', marginBottom: '40px' }}>
                {'MOI'.split('').map((char, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.4, duration: 0.2, ease: 'easeOut' }} style={{ display: 'inline-block', whiteSpace: 'pre' }}>{char}</motion.span>
                ))}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 'clamp(140px, 90%, 200px)' }}>
                {MOI_TEXTS.map((fullText, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.845rem', lineHeight: 1.23, letterSpacing: 0, visibility: 'hidden' }}>
                      {fullText}
                    </p>
                    <p style={{ position: 'absolute', top: 0, left: 0, width: '100%', fontFamily: 'var(--font-satoshi)', fontSize: '0.845rem', color: '#0a0a0a', lineHeight: 1.23, letterSpacing: 0 }}>
                      {visibleTexts[i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* projet → bottom right */}
      <Link
        href="/projets"
        style={{
          position: 'absolute',
          bottom: 'var(--spacing-lg)',
          right: 'clamp(var(--spacing-lg), 5%, 10vw)',
          zIndex: 3,
          fontFamily: 'var(--font-cabinet)',
          fontWeight: 500,
          fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
          color: '#0a0a0a',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        projets →
      </Link>

      {/* Bonsai */}
      <Bonsai />
    </main>
  )
}
