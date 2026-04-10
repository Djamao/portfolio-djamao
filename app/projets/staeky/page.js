'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import VerticalWords from '../../components/VerticalWords'
import { PROJECT_LABEL, PROJECT_ITEM } from '../../styles/constants'
import { useMobile } from '../../hooks/useMobile'

const ACCENT = '#4A6FE3'
const images = [
  { src: '/staeky-thumb.webp',        alt: 'Staeky' },
  { src: '/staeky-mockup.webp',       alt: 'Staeky mockup' },
  { src: '/staeky-site.webp',         alt: 'Staeky site' },
]

const label = { ...PROJECT_LABEL, color: ACCENT }
const item  = PROJECT_ITEM

export default function Staeky() {
  const isMobile = useMobile()
  const [activeImg, setActiveImg] = useState(images[0])
  const mid = (images.length - 1) / 2

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
            STAEKY
          </span>
        </div>

        {/* Main image */}
        <div style={{ position: 'relative', width: '100%', height: '55vw', flexShrink: 0, backgroundColor: '#f5f5f5' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeImg.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0 }}>
              <Image src={activeImg.src} alt={activeImg.alt} fill sizes="100vw" style={{ objectFit: 'contain' }} priority />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem var(--padding-x)', overflowX: 'auto', borderTop: '1px solid #0a0a0a', borderBottom: '1px solid #0a0a0a', flexShrink: 0 }}>
          {images.map((img) => (
            <button
              key={img.src}
              onClick={() => setActiveImg(img)}
              style={{
                width: 56, height: 68, position: 'relative', flexShrink: 0, cursor: 'pointer',
                border: activeImg.src === img.src ? `1.5px solid ${ACCENT}` : '1.5px solid transparent',
                opacity: activeImg.src === img.src ? 1 : 0.5,
                padding: 0, backgroundColor: 'transparent', borderRadius: '2px', overflow: 'hidden',
              }}
            >
              <Image src={img.src} alt={img.alt} fill sizes="56px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem var(--padding-x) 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', color: '#0a0a0a', lineHeight: 1.2, textTransform: 'uppercase' }}>
            CRÉATION DU LOGO STAEKY
          </h2>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5 }}>
            Staeky est une plateforme d&apos;organisation dédiée aux étudiants, centralisant gestion des tâches, emploi du temps et planification en un seul endroit.
          </p>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5 }}>
            La mission : un logo picogramme tech, centré sur le «&nbsp;S&nbsp;» de Staeky, dans un bleu défini par le client. En découpant le «&nbsp;S&nbsp;» au bon endroit, la forme laisse naturellement apparaître le symbole de l&apos;infini (∞).
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <span style={label}>TÂCHES</span>
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
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)' }}>
            Février 2026
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
        <VerticalWords name="STAEKY" color={ACCENT} size={90} />
      </div>

      {/* Center — main image + fan */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
              <Image src={activeImg.src} alt={activeImg.alt} fill sizes="(max-width: 768px) 60vw, 70vw" style={{ objectFit: 'contain' }} priority />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fan thumbnails */}
        <div style={{ height: 'clamp(140px, 25vh, 300px)', flexShrink: 0, position: 'relative', borderTop: '1px solid #0a0a0a' }}>
          {images.map((img, i) => {
            const angle   = (i - mid) * 14
            const offsetX = (i - mid) * 90
            const isActive = activeImg.src === img.src
            return (
              <div
                key={img.src}
                onClick={() => setActiveImg(img)}
                style={{
                  position: 'absolute', bottom: 'clamp(10px, 2vh, 20px)', left: '50%',
                  width: 'clamp(80px, 15vw, 180px)', height: 'clamp(106px, 20vh, 240px)',
                  transform: `translateX(calc(-50% + ${offsetX}px)) rotate(${angle}deg)`,
                  transformOrigin: 'bottom center', cursor: 'pointer',
                  opacity: isActive ? 1 : 0.6, transition: 'opacity 0.25s, box-shadow 0.25s',
                  boxShadow: isActive ? '0 8px 24px rgba(0,0,0,0.22)' : '0 3px 12px rgba(0,0,0,0.12)',
                  zIndex: isActive ? images.length + 1 : i,
                  outline: isActive ? `2px solid ${ACCENT}` : 'none',
                  overflow: 'hidden', borderRadius: '2px',
                }}
              >
                <Image src={img.src} alt={img.alt} fill sizes="clamp(80px, 15vw, 180px)" style={{ objectFit: 'cover' }} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Right — info panel */}
      <div style={{ width: 'clamp(220px, 28vw, 450px)', borderLeft: '1px solid #0a0a0a', padding: 'var(--spacing-md) clamp(var(--padding-x), 5%, 10vw)', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(0.5rem, 1vw, 1rem)', flex: 1, minHeight: 0 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h2 style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', color: '#0a0a0a', marginBottom: '0.75rem', lineHeight: 1.2, textTransform: 'uppercase' }}>
              CRÉATION DU LOGO STAEKY
            </h2>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0 }}>
              Staeky est une plateforme d&apos;organisation dédiée aux étudiants, centralisant gestion des tâches, emploi du temps et planification en un seul endroit.
            </p>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0, marginTop: '0.75rem' }}>
              La mission : un logo picogramme tech, centré sur le «&nbsp;S&nbsp;» de Staeky, dans un bleu défini par le client. En découpant le «&nbsp;S&nbsp;» au bon endroit, la forme laisse naturellement apparaître le symbole de l&apos;infini (∞).
            </p>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)', marginTop: 'auto' }}>
              Février 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
