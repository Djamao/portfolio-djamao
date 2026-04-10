'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import VerticalWords from '../../components/VerticalWords'
import { PROJECT_LABEL, PROJECT_ITEM } from '../../styles/constants'
import { useMobile } from '../../hooks/useMobile'

const ACCENT = '#2D5016'
const images = [
  { src: '/vagabond.webp', alt: 'Djamao portfolio' },
]

const label = { ...PROJECT_LABEL, color: ACCENT }
const item = PROJECT_ITEM

export default function DjamaoPierre() {
  const isMobile = useMobile()
  const [activeImg, setActiveImg] = useState(images[0])

  // — MOBILE —
  if (isMobile) {
    return (
      <main style={{ height: 'calc(100vh - var(--navbar-height))', width: '100%', backgroundColor: '#ffffff', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem var(--padding-x)', borderBottom: '1px solid #0a0a0a', flexShrink: 0 }}>
          <Link href="/projets" style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.875rem', color: '#0a0a0a', textDecoration: 'none', flexShrink: 0 }}>
            ← retour
          </Link>
          <span style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '-0.01em', color: ACCENT }}>
            DJAMAO PIERRE
          </span>
        </div>

        {/* Main image */}
        <div style={{ position: 'relative', width: '100%', height: '55vw', flexShrink: 0, backgroundColor: '#f5f5f0' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeImg.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0 }}>
              <Image src={activeImg.src} alt={activeImg.alt} fill sizes="100vw" style={{ objectFit: 'contain', padding: '1rem' }} priority />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem var(--padding-x) 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', color: '#0a0a0a', lineHeight: 1.2, textTransform: 'uppercase' }}>
            CRÉATION DU PORTFOLIO DJAMAO PIERRE
          </h2>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5 }}>
            Djamao Pierre est designer digital français, nourri par le hiphop, la culture japonaise et le wabi-sabi. La mission : concevoir un portfolio qui reflète une identité forte — minimaliste mais énergique.
          </p>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5 }}>
            L&apos;univers visuel s&apos;est construit autour d&apos;un monochrome accentué : une base noir et blanc, avec une couleur Sanzo Wada propre à chaque projet.
          </p>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5 }}>
            Un portfolio pensé comme un album — chaque page est une piste, chaque projet une énergie différente.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <span style={label}>TÂCHES</span>
              {['Veille', 'Moodboard & direction artistique', 'Wireframes', 'Design haute fidélité', 'Motion design'].map((t) => (
                <p key={t} style={item}>{t}</p>
              ))}
            </div>
            <div>
              <span style={label}>LOGICIELS</span>
              {['Figma', 'Illustrator', 'Photoshop', 'After Effect'].map((t) => (
                <p key={t} style={item}>{t}</p>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)' }}>
            Mars 2026
          </p>
        </div>
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
        display: 'grid',
        gridTemplateColumns: 'minmax(0, auto) minmax(0, 1fr) minmax(0, auto)',
        overflow: 'hidden',
      }}
    >
      {/* Left — retour + vertical title */}
      <div style={{ borderRight: '1px solid #0a0a0a', padding: 'var(--spacing-sm)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vw, 1rem)', overflow: 'hidden', minWidth: 'clamp(80px, 12vw, 250px)' }}>
        <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2, ease: 'easeOut' }} style={{ display: 'inline-block' }}>
          <Link href="/projets" style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', color: '#0a0a0a', letterSpacing: 0, textDecoration: 'none' }}>
            ← retour
          </Link>
        </motion.div>
        <VerticalWords name="DJAMAO PIERRE" color={ACCENT} size={90} />
      </div>

      {/* Center — main image (single image) */}
      <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f5f5f0' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImg.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image src={activeImg.src} alt={activeImg.alt} fill sizes="(max-width: 768px) 60vw, 70vw" style={{ objectFit: 'contain', padding: '2rem' }} priority />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right — info panel */}
      <div style={{ width: 'clamp(220px, 28vw, 450px)', borderLeft: '1px solid #0a0a0a', padding: 'var(--spacing-md) clamp(var(--padding-x), 5%, 10vw)', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(0.5rem, 1vw, 1rem)', flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.5rem)', overflow: 'hidden' }}>
            <div>
              <span style={label}>TÂCHES EFFECTUÉES</span>
              {['Veille', 'Moodboard & direction artistique', 'Wireframes', 'Design haute fidélité', 'Motion design'].map((t) => (
                <p key={t} style={item}>{t}</p>
              ))}
            </div>
            <div>
              <span style={label}>LOGICIELS</span>
              {['Figma', 'Illustrator', 'Photoshop', 'After Effect'].map((t) => (
                <p key={t} style={item}>{t}</p>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h2 style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', color: '#0a0a0a', marginBottom: '0.75rem', lineHeight: 1.2, textTransform: 'uppercase' }}>
              CRÉATION DU PORTFOLIO DJAMAO PIERRE
            </h2>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0 }}>
              Djamao Pierre est designer digital français, nourri par le hiphop, la culture japonaise et le wabi-sabi. La mission : concevoir un portfolio qui reflète une identité forte — minimaliste mais énergique.
            </p>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0, marginTop: '0.75rem' }}>
              L&apos;univers visuel s&apos;est construit autour d&apos;un monochrome accentué : une base noir et blanc, avec une couleur Sanzo Wada propre à chaque projet. Le bonsaï comme fil rouge, la typographie verticale comme signature.
            </p>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0, marginTop: '0.75rem' }}>
              Un portfolio pensé comme un album — chaque page est une piste, chaque projet une énergie différente.
            </p>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)', marginTop: 'auto' }}>
              Mars 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
