'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import VerticalWords from '../../components/VerticalWords'

const ACCENT = '#C94B1F'
const images = [
  { src: '/bbc-thumb.webp',            alt: 'BBC' },
  { src: '/bbc-vod.webm',              alt: 'BBC présentation', isVideo: true },
  { src: '/bbc-mockup.webp',           alt: 'BBC mockup' },
  { src: '/bbc-charte-graphique.webp', alt: 'BBC charte' },
  { src: '/bbc-contact.webp',          alt: 'BBC contact' },
]

const label = { fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.5rem', fontWeight: 600, display: 'block' }
const item  = { fontFamily: 'var(--font-cabinet)',  fontSize: '0.8rem',  color: '#0a0a0a', lineHeight: 1.4, letterSpacing: 0 }

export default function BBC() {
  const [activeImg, setActiveImg] = useState(images[0])
  const mid = (images.length - 1) / 2

  return (
    <main
      style={{
        height: 'calc(100vh - 49px)',
        backgroundColor: '#ffffff',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        overflow: 'hidden',
      }}
    >
      {/* Left — retour + vertical title */}
      <div style={{ borderRight: '1px solid #0a0a0a', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}>
        <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2, ease: 'easeOut' }} style={{ display: 'inline-block' }}>
          <Link href="/projets" style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.875rem', color: '#0a0a0a', letterSpacing: 0, textDecoration: 'none' }}>
            ← retour
          </Link>
        </motion.div>
        <VerticalWords name="BAKERY BLISS CAFÉ" color={ACCENT} size={90} />
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
              {activeImg.isVideo ? (
                <video
                  autoPlay loop muted playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                >
                  <source src="/bbc-vod.webm" type="video/webm" />
                  <source src="/bbc-vod.mp4" type="video/mp4" />
                </video>
              ) : (
                <Image src={activeImg.src} alt={activeImg.alt} fill sizes="calc(100vw - 580px)" style={{ objectFit: 'contain' }} priority />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fan thumbnails */}
        <div style={{ height: '190px', flexShrink: 0, position: 'relative', borderTop: '1px solid #0a0a0a' }}>
          {images.map((img, i) => {
            const angle   = (i - mid) * 13
            const offsetX = (i - mid) * 75
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
                {img.isVideo ? (
                  <video muted playsInline loop style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}>
                    <source src="/bbc-vod.webm" type="video/webm" />
                    <source src="/bbc-vod.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <Image src={img.src} alt={img.alt} fill sizes="108px" style={{ objectFit: 'cover' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Right — info panel */}
      <div style={{ width: 'clamp(280px, 30vw, 480px)', borderLeft: '1px solid #0a0a0a', padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 2vw, 2rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(100px, 1fr, 200px) 1.2fr', gap: 'clamp(0.75rem, 1.5vw, 1.5rem)', flex: 1, minHeight: 0 }}>

          {/* Left sub-col: TÂCHES + LOGICIELS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflow: 'hidden' }}>
            <div>
              <span style={label}>TÂCHES EFFECTUÉES</span>
              {['Logo et ses déclinaisons', 'Charte graphique', 'Maquettes web (Figma)', 'Animation vidéo', 'Identité visuelle'].map((t) => (
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
              CRÉATION IDENTITÉ VISUELLE DE BLISS CAFÉ
            </h2>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0 }}>
              Bakery Bliss Café est un coffee shop inspiré des traditions basques et de l&apos;univers des bakeries américaines, proposant des produits faits maison à partir d&apos;ingrédients locaux et de saison.
            </p>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.8rem', color: '#0a0a0a', lineHeight: 1.5, letterSpacing: 0, marginTop: '0.75rem' }}>
              La mission : concevoir une identité visuelle complète mêlant chaleur, gourmandise et culture locale, capable de valoriser les produits et l&apos;ambiance du café.
            </p>
            <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)', marginTop: 'auto' }}>
              Décembre 2024
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}
