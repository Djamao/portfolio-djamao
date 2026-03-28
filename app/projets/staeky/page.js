'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import VerticalWords from '../../components/VerticalWords'

const ACCENT = '#4A6FE3'
const images = [
  { src: '/staeky-presentation.webp', alt: 'Staeky présentation' },
  { src: '/staeky-mockup.webp', alt: 'Staeky mockup' },
  { src: '/staeky-site.webp', alt: 'Staeky site' },
]

const label = { fontFamily: 'var(--font-cabinet)', fontSize: '0.875rem', letterSpacing: 0, textTransform: 'uppercase', color: ACCENT, marginBottom: '0.6rem', fontWeight: 600, display: 'block' }
const item = { fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#0a0a0a', lineHeight: 1.23, letterSpacing: 0 }

export default function Staeky() {
  const [activeImg, setActiveImg] = useState(images[0])

  return (
    <main
      style={{
        height: 'calc(var(--vp-height, 100vh) - 68px)',
        backgroundColor: '#ffffff',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gridTemplateRows: '1fr auto',
        overflow: 'hidden',
      }}
    >
      {/* Left column — retour + vertical title */}
      <div
        style={{
          gridRow: '1 / 3',
          borderRight: '1px solid #0a0a0a',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          overflow: 'hidden',
        }}
      >
        <motion.div
          whileHover={{ x: -4 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ display: 'inline-block' }}
        >
          <Link
            href="/projets"
            style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#0a0a0a', letterSpacing: 0, textDecoration: 'none' }}
          >
            ← retour
          </Link>
        </motion.div>
        <VerticalWords name="STAEKY" color={ACCENT} size={90} />
      </div>

      {/* Center — main image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImg.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={activeImg.src}
              alt={activeImg.alt}
              fill
              sizes="calc(100vw - 560px)"
              style={{ objectFit: 'contain' }}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right column — info */}
      <div
        style={{
          gridRow: '1 / 3',
          width: '280px',
          borderLeft: '1px solid #0a0a0a',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          overflowY: 'auto',
        }}
      >
        <div>
          <span style={label}>TÂCHES EFFECTUÉES</span>
          {['Veille', 'Logo et ses déclinaisons', 'Mockup'].map((t) => (
            <p key={t} style={item}>{t}</p>
          ))}
        </div>
        <div>
          <span style={label}>LOGICIELS</span>
          {['Figma', 'Illustrator', 'Photoshop'].map((t) => (
            <p key={t} style={item}>{t}</p>
          ))}
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.02em', color: '#0a0a0a', marginBottom: '1rem', lineHeight: 1.2 }}>
            CRÉATION LOGO STAEKY
          </h2>
          <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.845rem', color: '#0a0a0a', lineHeight: 1.23, letterSpacing: 0 }}>
            Staeky est une plateforme d&apos;organisation dédiée aux étudiants, centralisant gestion des tâches, emploi du temps et planification en un seul endroit.
          </p>
          <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.845rem', color: '#0a0a0a', lineHeight: 1.23, letterSpacing: 0, marginTop: '0.75rem' }}>
            La mission : un logo picogramme tech, centré sur le «&nbsp;S&nbsp;» de Staeky, dans un bleu défini par le client. En découpant le «&nbsp;S&nbsp;» au bon endroit, la forme laisse naturellement apparaître le symbole de l&apos;infini (∞).
          </p>
        </div>
        <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.75rem', color: 'rgba(0,0,0,0.4)', marginTop: 'auto' }}>
          Février 2026
        </p>
      </div>

      {/* Bottom — thumbnails */}
      <div
        style={{
          gridColumn: '2 / 3',
          borderTop: '1px solid #0a0a0a',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          overflowX: 'auto',
        }}
      >
        {images.map((img) => (
          <button
            key={img.src}
            onClick={() => setActiveImg(img)}
            style={{
              width: '80px',
              height: '96px',
              position: 'relative',
              flexShrink: 0,
              cursor: 'pointer',
              border: activeImg.src === img.src ? '1px solid #0a0a0a' : '1px solid transparent',
              opacity: activeImg.src === img.src ? 1 : 0.5,
              transition: 'opacity 0.2s, border-color 0.2s',
              padding: 0,
              backgroundColor: 'transparent',
            }}
          >
            <Image src={img.src} alt={img.alt} fill sizes="80px" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </main>
  )
}
