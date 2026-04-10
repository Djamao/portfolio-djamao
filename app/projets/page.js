'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Bonsai from '../components/Bonsai'
import { useMobile } from '../hooks/useMobile'

const projects = [
  {
    id: 'djamao',
    name: 'DJAMAO PIERRE',
    accent: '#2D5016',
    logo: '/bonsai.webp',
    logoType: 'img',
    category: 'PORTFOLIO PERSONNEL',
    year: '2026',
    href: '/projets/djamao',
  },
  {
    id: 'sam',
    name: 'SAM QUILES',
    accent: '#6B3A65',
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
    logo: '/bbc-logo-hq.png',
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
  const w = size === 'large' ? (isVideo ? '100%' : 'clamp(70%, 90%, 100%)') : isVideo ? '100%' : project.id === 'djamao' ? 'clamp(70px, 12vw, 120px)' : 'clamp(50px, 10vw, 80px)'
  const h = size === 'large' ? (isVideo ? 'clamp(400px, 70vh, 750px)' : 'clamp(300px, 60vh, 500px)') : isVideo ? 'clamp(300px, 50vh, 550px)' : project.id === 'djamao' ? 'clamp(80px, 14vw, 140px)' : 'clamp(60px, 12vw, 90px)'
  const filter = isVideo ? 'none'
    : project.id === 'djamao' ? (!isActive ? 'grayscale(1) brightness(0.15)' : 'none')
    : isActive ? 'brightness(0) invert(1)' : 'none'

  const inactiveShift = !isActive && size !== 'large' && (project.id === 'bbc' || project.id === 'staeky') ? 'translateY(clamp(4px, 1vw, 8px))' : undefined
  const containerStyle = {
    width: w,
    height: h,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transform: inactiveShift ?? (!isVideo && project.id === 'djamao' ? (size !== 'large' ? 'translateY(clamp(-6px, -1vw, -10px))' : 'translateY(clamp(-15px, -2vw, -25px))') : undefined),
  }

  if (project.logoType === 'video') {
    const blockShift = size !== 'large' ? `translate(clamp(0px, 2vw, 10px), clamp(-185px, -20vh, -235px)) scale(0.7)` : `translate(clamp(25px, 3vw, 40px), clamp(-100px, -15vh, -140px)) scale(1.4)`
    const videoFilter = size !== 'large' ? 'grayscale(1)' : 'none'
    return (
      <div style={containerStyle}>
        <div style={{ position: 'relative', width: '100%', height: '100%', transform: blockShift, filter: videoFilter }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'translate(2.5px, -1px)' }}
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
  const isMobile = useMobile()
  const [activeIndex, setActiveIndex] = useState(null)
  const indexRef = useRef(null)
  const locked = useRef(false)
  const accDelta = useRef(0)
  const lastWheelTime = useRef(0)
  const router = useRouter()

  const go = useCallback((delta) => {
    if (locked.current) return
    const current = indexRef.current ?? -1
    const next = Math.max(0, Math.min(projects.length - 1, current + delta))
    if (next === indexRef.current) return
    locked.current = true
    setActiveIndex(next)
    indexRef.current = next
    setTimeout(() => { locked.current = false }, 500)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const onWheel = (e) => {
      e.preventDefault()
      if (e.deltaMode !== 0) {
        go(e.deltaY > 0 ? 1 : -1)
        return
      }
      const now = Date.now()
      if (now - lastWheelTime.current > 150) accDelta.current = 0
      lastWheelTime.current = now
      if (locked.current) return
      accDelta.current += e.deltaY
      if (Math.abs(accDelta.current) >= 50) {
        go(accDelta.current > 0 ? 1 : -1)
        accDelta.current = 0
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [go, isMobile])

  // — MOBILE —
  if (isMobile) {
    return (
      <main
        style={{
          height: 'calc(100vh - var(--navbar-height))',
          width: '100%',
          backgroundColor: '#ffffff',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          <Bonsai />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.1rem var(--padding-x)',
                borderBottom: '1px solid #0a0a0a',
                textDecoration: 'none',
                color: '#0a0a0a',
                backgroundColor: 'rgba(255,255,255,0.85)',
              }}
            >
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: project.accent,
                flexShrink: 0,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-clash)', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  {project.name}
                </p>
                <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.72rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)', marginTop: '0.15rem' }}>
                  {project.category} — {project.year}
                </p>
              </div>
              <span style={{ fontFamily: 'var(--font-satoshi)', fontSize: '1rem', flexShrink: 0 }}>→</span>
            </Link>
          ))}
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
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'calc(100vh - var(--navbar-height))', pointerEvents: 'none', zIndex: 1 }}>
        <Bonsai />
      </div>

      <div style={{
        flexBasis: activeIndex === null ? 'clamp(30%, 40vw, 60%)' : 'clamp(20%, 30vw, 40%)',
        flexShrink: 0,
        flexGrow: activeIndex === null ? 1 : 0,
        transition: 'flex-basis 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }} />

      {projects.map((project, i) => {
        const isActive = i === activeIndex

        return (
          <div
            key={project.id}
            onClick={() => isActive ? router.push(project.href) : go(i - (activeIndex ?? -1))}
            style={{
              flexGrow: isActive ? 1 : 0,
              flexShrink: 0,
              flexBasis: isActive ? 0 : '14%',
              transition: 'flex-grow 0.5s cubic-bezier(0.16, 1, 0.3, 1), flex-basis 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease',
              backgroundColor: isActive ? project.accent : '#ffffff',
              borderLeft: '1px solid #0a0a0a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: isActive ? 'clamp(0.75rem, 1.5vw, 1.25rem) clamp(0.4rem, 1vw, 0.75rem)' : 'clamp(0.75rem, 1.5vw, 1.25rem) clamp(0.2rem, 0.5vw, 0.4rem)',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
            }}
          >
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

            <div
              style={{
                textAlign: 'center',
                color: isActive ? '#ffffff' : '#0a0a0a',
                flexShrink: 0,
                width: '100%',
              }}
            >
              <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.4, marginBottom: '0.15rem' }}>
                {project.category}
              </p>
              <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', marginBottom: '0.15rem' }}>
                {project.year}
              </p>
              <p style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', marginTop: '0.75rem' }}>
                {isActive ? '→' : '↓'}
              </p>
            </div>
          </div>
        )
      })}
    </main>
  )
}
