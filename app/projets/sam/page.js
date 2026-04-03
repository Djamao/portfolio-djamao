'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import VerticalWords from '../../components/VerticalWords'

const ACCENT = '#0a0a0a'
const images = [
  { src: '/sam-thumb.webp',    alt: 'Sam Quiles' },
  { src: '/sam-logo.webp',     alt: 'Sam logo',  unoptimized: true },
  { src: '/sam-cd.webm',       alt: 'Sam CD',    isVideo: true },
  { src: '/sam-archive1.webp', alt: 'Sam archive 1' },
  { src: '/sam-archive2.webp', alt: 'Sam archive 2' },
]

const label = { fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.5rem', fontWeight: 600, display: 'block' }
const item  = { fontFamily: 'var(--font-cabinet)',  fontSize: '0.8rem',  color: '#0a0a0a', lineHeight: 1.4, letterSpacing: 0 }

export default function Sam() {
  const [activeImg, setActiveImg] = useState(images[0])

  return (
    <main
      style={{
        height: 'calc(100vh - 49px)',
        width: '100%',
        backgroundColor: '#ffffff',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, auto) minmax(0, 1fr) minmax(0, auto)',
        overflow: 'hidden',
      }}
    >
      {/* Left — retour + vertical title */}
      <div style={{ borderRight: '1px solid #0a0a0a', padding: 'clamp(0.5rem, 1.5vw, 1rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1vw, 0.75rem)', overflow: 'hidden', minWidth: 'clamp(100px, 15vw, 200px)' }}>
        <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2, ease: 'easeOut' }} style={{ display: 'inline-block' }}>
          <Link href="/projets" style={{ fontFamily: 'var(--font-cabinet)', fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)', color: '#0a0a0a', letterSpacing: 0, textDecoration: 'none' }}>
            ← retour
          </Link>
        </motion.div>
        <VerticalWords name="SAM QUILES" color={ACCENT} size={90} />
      </div>

      {/* Center — main image + horizontal strip */}
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
              {activeImg.isVideo ? (
                <video
                  autoPlay loop muted playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                >
                  <source src="/sam-cd.mp4" type="video/mp4" />
                  <source src="/sam-cd.webm" type="video/webm" />
                </video>
              ) : (
                <Image
                  src={activeImg.src}
                  alt={activeImg.alt}
                  fill
                  sizes="calc(100vw - 580px)"
                  style={{ objectFit: 'contain' }}
                  unoptimized={!!activeImg.unoptimized}
                  priority
                />
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
                width: 'clamp(60px, 10vw, 80px)',
                height: 'clamp(72px, 12vw, 96px)',
                position: 'relative',
                flexShrink: 0,
                cursor: 'pointer',
                border: activeImg.src === img.src ? `1.5px solid ${ACCENT}` : '1.5px solid transparent',
                opacity: activeImg.src === img.src ? 1 : 0.5,
                transition: 'opacity 0.2s, border-color 0.2s',
                padding: 0,
                backgroundColor: 'transparent',
                borderRadius: '2px',
                overflow: 'hidden',
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
      <div style={{ width: 'clamp(280px, 30vw, 480px)', borderLeft: '1px solid #0a0a0a', padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 2vw, 2rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(100px, 1fr, 200px) 1.2fr', gap: 'clamp(0.75rem, 1.5vw, 1.5rem)', flex: 1, minHeight: 0 }}>

          {/* Left sub-col: TÂCHES + LOGICIELS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflow: 'hidden' }}>
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

          {/* Right sub-col: title + desc + date */}
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
