'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import VerticalWords from '../../components/VerticalWords'
import { PROJECT_LABEL, PROJECT_ITEM } from '../../styles/constants'
import { useMobile } from '../../hooks/useMobile'

const ACCENT = '#0a0a0a'
const images = [
  { src: '/sam-thumb.webp',    alt: 'Sam Quiles' },
  { src: '/sam-logo.webp',     alt: 'Sam logo',  unoptimized: true },
  { src: '/sam-cd.webm',       alt: 'Sam CD',    isVideo: true },
  { src: '/sam-archive1.webp', alt: 'Sam archive 1' },
  { src: '/sam-archive2.webp', alt: 'Sam archive 2' },
]

const label = { ...PROJECT_LABEL, color: ACCENT }
const item = PROJECT_ITEM

export default function Sam() {
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
            SAM QUILES
          </span>
        </div>

        {/* Main image */}
        <div style={{ position: 'relative', width: '100%', height: '55vw', flexShrink: 0, backgroundColor: '#f5f5f5' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeImg.src} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', inset: 0 }}>
              {activeImg.isVideo ? (
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                  <source src="/sam-cd.mp4" type="video/mp4" />
                  <source src="/sam-cd.webm" type="video/webm" />
                </video>
              ) : (
                <Image src={activeImg.src} alt={activeImg.alt} fill sizes="100vw" style={{ objectFit: 'contain' }} unoptimized={!!activeImg.unoptimized} priority />
              )}
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
              {img.isVideo ? (
                <video muted playsInline loop style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}>
                  <source src="/sam-cd.mp4" type="video/mp4" />
                  <source src="/sam-cd.webm" type="video/webm" />
                </video>
              ) : (
                <Image src={img.src} alt={img.alt} fill sizes="56px" style={{ objectFit: 'cover' }} unoptimized={!!img.unoptimized} />
              )}
            </button>
          ))}
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem var(--padding-x) 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em', color: '#0a0a0a', lineHeight: 1.2, textTransform: 'uppercase' }}>
            CRÉATION DU SITE WEB ET DU LOGO DE SAM QUILES
          </h2>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5 }}>
            Sam Quiles est un photographe, filmmaker, sound creator et visual director, dont l&apos;univers artistique est fortement influencé par la culture hip-hop, les jeux vidéo et l&apos;art contemporain.
          </p>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5 }}>
            La mission : concevoir un portfolio en ligne immersif capable de réfléter son identité visuelle et la diversité de ses projets — interface dynamique et artistique, logo inclus.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <span style={label}>TÂCHES</span>
              {['Logo et ses déclinaisons', 'Charte graphique', 'Maquettes web (Figma)', 'Animation vidéo'].map((t) => (
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
        <VerticalWords name="SAM QUILES" color={ACCENT} size={90} />
      </div>

      {/* Center — main image + horizontal strip */}
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
              {activeImg.isVideo ? (
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                  <source src="/sam-cd.mp4" type="video/mp4" />
                  <source src="/sam-cd.webm" type="video/webm" />
                </video>
              ) : (
                <Image src={activeImg.src} alt={activeImg.alt} fill sizes="(max-width: 768px) 60vw, 70vw" style={{ objectFit: 'contain' }} unoptimized={!!activeImg.unoptimized} priority />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Horizontal thumbnail strip */}
        <div style={{ height: 'clamp(80px, 20vh, 120px)', flexShrink: 0, borderTop: '1px solid #0a0a0a', display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1vw, 12px)', padding: 'clamp(8px, 1vw, 12px)', overflowX: 'auto' }}>
          {images.map((img) => (
            <button
              key={img.src}
              onClick={() => setActiveImg(img)}
              style={{
                width: 'clamp(60px, 10vw, 80px)', height: 'clamp(72px, 12vw, 96px)', position: 'relative', flexShrink: 0, cursor: 'pointer',
                border: activeImg.src === img.src ? `1.5px solid ${ACCENT}` : '1.5px solid transparent',
                opacity: activeImg.src === img.src ? 1 : 0.5, transition: 'opacity 0.2s, border-color 0.2s',
                padding: 0, backgroundColor: 'transparent', borderRadius: '2px', overflow: 'hidden',
              }}
            >
              {img.isVideo ? (
                <video muted playsInline loop style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}>
                  <source src="/sam-cd.mp4" type="video/mp4" />
                  <source src="/sam-cd.webm" type="video/webm" />
                </video>
              ) : (
                <Image src={img.src} alt={img.alt} fill sizes="80px" style={{ objectFit: 'cover' }} unoptimized={!!img.unoptimized} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right — info panel */}
      <div style={{ width: 'clamp(220px, 28vw, 450px)', borderLeft: '1px solid #0a0a0a', padding: 'var(--spacing-md) clamp(var(--padding-x), 5%, 10vw)', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(0.5rem, 1vw, 1rem)', flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.5rem)', overflow: 'hidden' }}>
            <div>
              <span style={label}>TÂCHES EFFECTUÉES</span>
              {['Logo et ses déclinaisons', 'Charte graphique', 'Maquettes web (Figma)', 'Animation vidéo'].map((t) => (
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
              CRÉATION DU SITE WEB ET DU LOGO DE SAM QUILES
            </h2>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0 }}>
              Sam Quiles est un photographe, filmmaker, sound creator et visual director, dont l&apos;univers artistique est fortement influencé par la culture hip-hop, les jeux vidéo et l&apos;art contemporain.
            </p>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0, marginTop: '0.75rem' }}>
              La mission : concevoir un portfolio en ligne immersif capable de réfléter son identité visuelle et la diversité de ses projets — interface dynamique et artistique, logo inclus.
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
