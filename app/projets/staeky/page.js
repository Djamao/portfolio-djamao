'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import VerticalWords from '../../components/VerticalWords'

const ACCENT = '#4A6FE3'
const images = [
  { src: '/staeky-thumb.webp',        alt: 'Staeky' },
  { src: '/staeky-mockup.webp',       alt: 'Staeky mockup' },
  { src: '/staeky-site.webp',         alt: 'Staeky site' },
]

const label = { fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.5rem', fontWeight: 600, display: 'block' }
const item  = { fontFamily: 'var(--font-satoshi)',  fontSize: '0.8rem',  color: '#0a0a0a', lineHeight: 1.4, letterSpacing: 0 }

export default function Staeky() {
  const [activeImg, setActiveImg] = useState(images[0])
  const mid = (images.length - 1) / 2

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
        <VerticalWords name="STAEKY" color={ACCENT} size={90} />
      </div>

      {/* Center — main image + fan */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Main image */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImg.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <Image src={activeImg.src} alt={activeImg.alt} fill sizes="calc(100vw - 580px)" style={{ objectFit: 'contain' }} priority />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fan thumbnails */}
        <div style={{ height: '190px', flexShrink: 0, position: 'relative', borderTop: '1px solid #0a0a0a' }}>
          {images.map((img, i) => {
            const angle   = (i - mid) * 14
            const offsetX = (i - mid) * 80
            const isActive = activeImg.src === img.src
            return (
              <div
                key={img.src}
                onClick={() => setActiveImg(img)}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  width: '108px',
                  height: '144px',
                  transform: `translateX(calc(-50% + ${offsetX}px)) rotate(${angle}deg)`,
                  transformOrigin: 'bottom center',
                  cursor: 'pointer',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'opacity 0.25s, box-shadow 0.25s',
                  boxShadow: isActive ? '0 8px 24px rgba(0,0,0,0.22)' : '0 3px 12px rgba(0,0,0,0.12)',
                  zIndex: isActive ? images.length + 1 : i,
                  outline: isActive ? `2px solid ${ACCENT}` : 'none',
                  overflow: 'hidden',
                  borderRadius: '2px',
                }}
              >
                <Image src={img.src} alt={img.alt} fill sizes="108px" style={{ objectFit: 'cover' }} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Right — info panel */}
      <div style={{ width: '480px', borderLeft: '1px solid #0a0a0a', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>

          {/* Left sub-col: TÂCHES + LOGICIELS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflow: 'hidden' }}>
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
          </div>

          {/* Right sub-col: title + desc + date */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h2 style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', color: '#0a0a0a', marginBottom: '0.75rem', lineHeight: 1.2, textTransform: 'uppercase' }}>
              CRÉATION DU LOGO STAEKY
            </h2>
            <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0 }}>
              Staeky est une plateforme d&apos;organisation dédiée aux étudiants, centralisant gestion des tâches, emploi du temps et planification en un seul endroit.
            </p>
            <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0, marginTop: '0.75rem' }}>
              La mission : un logo picogramme tech, centré sur le «&nbsp;S&nbsp;» de Staeky, dans un bleu défini par le client. En découpant le «&nbsp;S&nbsp;» au bon endroit, la forme laisse naturellement apparaître le symbole de l&apos;infini (∞).
            </p>
            <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)', marginTop: 'auto' }}>
              Février 2026
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}
