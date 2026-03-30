'use client'
import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Bonsai from '../components/Bonsai'

const projects = [
  {
    id: 'djamao',
    name: 'DJAMAO PIERRE',
    accent: '#2D5016',
    logo: '/bonsai-vert.png',
    logoType: 'img',
    category: 'PORTFOLIO PERSONNEL',
    year: '2026',
    href: '/projets/djamao',
  },
  {
    id: 'sam',
    name: 'SAM QUILES',
    accent: '#0a0a0a',
    logo: '/sam-disc.webm',
    logoType: 'video',
    overlay: '/sam-cd-case.webp',
    category: 'PORTFOLIO WEBSITE',
    year: '2026',
    href: '/projets/sam',
  },
  {
    id: 'bbc',
    name: 'BAKERY BLISS CAFÉ',
    accent: '#C94B1F',
    logo: '/bbc-logo.png',
    logoType: 'img',
    category: 'IDENTITÉ VISUELLE /DA/DESIGNER',
    year: '2024',
    href: '/projets/bbc',
  },
  {
    id: 'staeky',
    name: 'STAEKY',
    accent: '#4A6FE3',
    logo: '/staeky-logo.svg',
    logoType: 'svg',
    category: 'LOGO DESIGNER',
    year: '2026',
    href: '/projets/staeky',
  },
]

function ProjectLogo({ project, isActive, size }) {
  const isVideo = project.logoType === 'video'
  const w = size === 'large' ? '80%' : isVideo ? '230px' : '44px'
  const h = size === 'large' ? '400px' : isVideo ? '250px' : '48px'
  const filter = isActive && !isVideo ? 'brightness(0) invert(1)' : 'none'

  const containerStyle = {
    width: w,
    height: h,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }

  if (project.logoType === 'video') {
    return (
      <div style={containerStyle}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'translateY(-5px)' }}
        >
          <source src={project.logo} type="video/webm" />
        </video>
        {project.overlay && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.overlay}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
          />
        )}
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.logo}
        alt={project.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter,
          transition: 'filter 0.3s ease',
        }}
      />
    </div>
  )
}

export default function ProjetsIndex() {
  const [activeIndex, setActiveIndex] = useState(null)
  const indexRef = useRef(null)
  const locked = useRef(false)
  const router = useRouter()

  const go = useCallback((delta) => {
    if (locked.current) return
    const current = indexRef.current ?? -1
    const next = Math.max(0, Math.min(projects.length - 1, current + delta))
    if (next === indexRef.current) return
    locked.current = true
    setActiveIndex(next)
    indexRef.current = next
    setTimeout(() => { locked.current = false }, 350)
  }, [])

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      go(e.deltaY > 0 ? 1 : -1)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [go])

  return (
    <main
      style={{
        height: 'calc(var(--vp-height, 100vh) - 49px)',
        backgroundColor: '#ffffff',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Bonsai — même hauteur de référence que la homepage */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 'calc(var(--vp-height, 100vh) - 68px)', pointerEvents: 'none', zIndex: 1 }}>
        <Bonsai />
      </div>

      {/* Left spacer — espace pour le bonsai */}
      <div style={{ flexBasis: '50%', flexShrink: 0, flexGrow: 0 }} />

      {/* Colonnes projets */}
      {projects.map((project, i) => {
        const isActive = i === activeIndex

        return (
          <div
            key={project.id}
            onClick={() => isActive ? router.push(project.href) : go(i - (activeIndex ?? -1))}
            style={{
              flexGrow: isActive ? 2 : 1,
              flexShrink: 0,
              flexBasis: 0,
              transition: 'flex-grow 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease',
              backgroundColor: isActive ? project.accent : '#ffffff',
              borderLeft: '1px solid #0a0a0a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.25rem 0.75rem',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Dot */}
            <div
              style={{
                width: isActive ? 10 : 7,
                height: isActive ? 10 : 7,
                borderRadius: '50%',
                backgroundColor: isActive ? '#ffffff' : project.accent,
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            />

            {isActive ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-clash)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.6rem, 2.6vw, 2.8rem)',
                    color: '#ffffff',
                    textAlign: 'center',
                    lineHeight: 1.0,
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    marginTop: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  {project.name.split(' ').map((word, j) => (
                    <span key={j} style={{ display: 'block' }}>{word}</span>
                  ))}
                </h2>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <ProjectLogo project={project} isActive size="large" />
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginTop: '0.75rem' }}>
                  <ProjectLogo project={project} isActive={false} size="small" />
                </div>
                <div style={{ flex: 1 }} />
              </>
            )}

            {/* Bottom info */}
            <div
              style={{
                textAlign: 'center',
                color: isActive ? '#ffffff' : '#0a0a0a',
                flexShrink: 0,
                width: '100%',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-cabinet)',
                  fontSize: isActive ? '0.75rem' : '0.65rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                  marginBottom: '0.15rem',
                  opacity: 1,
                }}
              >
                {project.category}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: isActive ? '0.85rem' : '0.75rem',
                  marginBottom: '0.15rem',
                  opacity: 1,
                }}
              >
                {project.year}
              </p>
              <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem' }}>
                {isActive ? '→' : '↓'}
              </p>
            </div>
          </div>
        )
      })}
    </main>
  )
}
