'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import VerticalWords from '../../components/VerticalWords'

const ACCENT = '#2D5016'
const images = [
  { src: '/vagabond.webp', alt: 'Djamao portfolio' },
]

const label = { fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.5rem', fontWeight: 600, display: 'block' }
const item  = { fontFamily: 'var(--font-satoshi)',  fontSize: '0.8rem',  color: '#0a0a0a', lineHeight: 1.4, letterSpacing: 0 }

export default function DjamaoPierre() {
  const [activeImg, setActiveImg] = useState(images[0])

  return (
    <main
      style={{
        height: 'calc(var(--vp-height, 100vh) - 68px)',
        backgroundColor: '#ffffff',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        overflow: 'hidden',
      }}
    >
      {/* Left — retour + vertical title */}
      <div style={{ borderRight: '1px solid #0a0a0a', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}>
        <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2, ease: 'easeOut' }} style={{ display: 'inline-block' }}>
          <Link href="/projets" style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#0a0a0a', letterSpacing: 0, textDecoration: 'none' }}>
            ← retour
          </Link>
        </motion.div>
        <VerticalWords name="DJAMAO PIERRE" color={ACCENT} size={90} />
      </div>

      {/* Center — main image (no fan, single image) */}
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
            <Image src={activeImg.src} alt={activeImg.alt} fill sizes="calc(100vw - 580px)" style={{ objectFit: 'contain', padding: '2rem' }} priority />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right — info panel */}
      <div style={{ width: '480px', borderLeft: '1px solid #0a0a0a', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>

          {/* Left sub-col: TÂCHES + LOGICIELS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflow: 'hidden' }}>
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

          {/* Right sub-col: title + desc + date */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h2 style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', color: '#0a0a0a', marginBottom: '0.75rem', lineHeight: 1.2, textTransform: 'uppercase' }}>
              CRÉATION DU PORTFOLIO DJAMAO PIERRE
            </h2>
            <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0 }}>
              Djamao Pierre est designer digital français, nourri par le hiphop, la culture japonaise et le wabi-sabi. La mission : concevoir un portfolio qui reflète une identité forte — minimaliste mais énergique.
            </p>
            <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0, marginTop: '0.75rem' }}>
              L&apos;univers visuel s&apos;est construit autour d&apos;un monochrome accentué : une base noir et blanc, avec une couleur Sanzo Wada propre à chaque projet. Le bonsaï comme fil rouge, la typographie verticale comme signature.
            </p>
            <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0, marginTop: '0.75rem' }}>
              Un portfolio pensé comme un album — chaque page est une piste, chaque projet une énergie différente.
            </p>
            <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)', marginTop: 'auto' }}>
              Mars 2026
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}
