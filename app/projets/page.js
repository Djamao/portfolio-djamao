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
    category: 'PORTFOLIO PERSONNEL',
    year: '2026',
    href: '/projets/djamao',
  },
  {
    id: 'sam',
    name: 'SAM QUILES',
    accent: '#0a0a0a',
    logo: '/sam-thumb.webp',
    category: 'PORTFOLIO WEBSITE',
    year: '2026',
    href: '/projets/sam',
  },
  {
    id: 'bbc',
    name: 'BAKERY BLISS CAFÉ',
    accent: '#C94B1F',
    logo: '/bbc-thumb.webp',
    category: 'IDENTITÉ VISUELLE /DA/DESIGNER',
    year: '2024',
    href: '/projets/bbc',
  },
  {
    id: 'staeky',
    name: 'STAEKY',
    accent: '#4A6FE3',
    logo: '/staeky-thumb.webp',
    category: 'LOGO DESIGNER',
    year: '2026',
    href: '/projets/staeky',
  },
]

export default function ProjetsIndex() {
  const [activeIndex, setActiveIndex] = useState(0)
  const indexRef = useRef(0)
  const locked = useRef(false)
  const router = useRouter()

  const go = useCallback((delta) => {
    if (locked.current) return
    const next = Math.max(0, Math.min(projects.length - 1, indexRef.current + delta))
    if (next === indexRef.current) return
    locked.current = true
    setActiveIndex(next)
    indexRef.current = next
    setTimeout(() => { locked.current = false }, 600)
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
        height: 'calc(100vh - 49px)',
        backgroundColor: '#ffffff',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Bonsai />

      {projects.map((project, i) => {
        const isActive = i === activeIndex

        return (
          <div
            key={project.id}
            onClick={() => isActive ? router.push(project.href) : go(i - activeIndex)}
            style={{
              flexGrow: isActive ? 2 : 1,
              flexShrink: 0,
              flexBasis: 0,
              transition: 'flex-grow 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease',
              backgroundColor: isActive
                ? project.accent
                : project.id === 'djamao'
                ? 'rgba(255,255,255,0.45)'
                : '#ffffff',
              borderRight: i < projects.length - 1 ? '1px solid #0a0a0a' : 'none',
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
                {/* Project name */}
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

                {/* Logo */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0.75rem' }}>
                  <div style={{ position: 'relative', width: '75%', height: '160px' }}>
                    <Image
                      src={project.logo}
                      alt={project.name}
                      fill
                      sizes="200px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Small logo */}
                <div
                  style={{
                    position: 'relative',
                    width: 44,
                    height: 50,
                    marginTop: '0.75rem',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={project.logo}
                    alt={project.name}
                    fill
                    sizes="44px"
                    style={{ objectFit: 'contain' }}
                  />
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
                  fontSize: isActive ? '0.6rem' : '0.5rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                  marginBottom: '0.15rem',
                  opacity: isActive ? 1 : 0.65,
                }}
              >
                {project.category}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: isActive ? '0.7rem' : '0.6rem',
                  marginBottom: '0.15rem',
                  opacity: isActive ? 1 : 0.65,
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
