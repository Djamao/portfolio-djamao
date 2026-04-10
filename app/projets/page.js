'use client'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Bonsai from '../components/Bonsai'
import { useMobile } from '../hooks/useMobile'

const projects = [
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
    id: 'staeky',
    name: 'STAEKY',
    accent: '#4A6FE3',
    logo: '/staeky-logo.svg',
    logoType: 'svg',
    category: 'LOGO DESIGNER',
    year: '2026',
    href: '/projets/staeky',
  },
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
    id: 'bbc',
    name: 'BAKERY BLISS CAFÉ',
    accent: '#C94B1F',
    logo: '/bbc-logo-hq.png',
    logoType: 'img',
    category: 'IDENTITÉ VISUELLE /DA/DESIGNER',
    year: '2024',
    href: '/projets/bbc',
  },
]

function ProjectLogo({ project, isActive, size }) {
  const isVideo = project.logoType === 'video'
  // Tailles par projet : large (sélectionné) | small (inactif)
  const logoSizes = {
    sam:    { large: { w: '100%',                 h: 'clamp(385px, calc(70vh - 15px), 735px)' }, small: { w: '100%',                    h: 'clamp(300px, 50vh, 550px)'  } },
    staeky: { large: { w: 'clamp(36%, 46%, 51%)', h: 'clamp(153px, 30.6vh, 255px)'           }, small: { w: 'clamp(50px, 10vw, 80px)', h: 'clamp(60px, 12vw, 90px)'   } },
    djamao: { large: { w: 'clamp(52.5%, 67.5%, 75%)', h: 'clamp(225px, 45vh, 375px)'         }, small: { w: 'clamp(70px, 12vw, 120px)',h: 'clamp(80px, 14vw, 140px)'  } },
    bbc:    { large: { w: '45%',                  h: '45%'                                    }, small: { w: 'clamp(50px, 10vw, 80px)', h: 'clamp(60px, 12vw, 90px)'   } },
  }
  const { w, h } = logoSizes[project.id][size]
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
    margin: '0 auto',
    transform: inactiveShift ?? (!isVideo && project.id === 'djamao' ? (size !== 'large' ? 'translateY(clamp(-6px, -1vw, -10px))' : 'translateY(clamp(-15px, -2vw, -25px))') : (!isVideo && project.id === 'bbc' && size === 'large' ? 'translate(30px, -75px)' : undefined)),
  }

  if (project.logoType === 'video') {
    // Position du bloc entier (inactif uniquement)
    const blockShift = size !== 'large' ? `translate(clamp(0px, 2vw, 10px), clamp(-185px, -20vh, -235px)) scale(0.7)` : `translate(clamp(25px, 3vw, 40px), clamp(-25px, -15vh, -65px))`

    // Disque CD — position et scale indépendants
    const discX = '6.5px'
    const discY = '-1px'
    const discScale = size === 'large' ? 1.08 : 1
    const discTransform = `scale(${discScale}) translate(${discX}, ${discY})`

    // Cover — position indépendante
    const coverX = '0px'
    const coverY = '0px'
    const coverTransform = `translate(calc(-50% + ${coverX}), calc(-50% + ${coverY}))`
    const videoFilter = size !== 'large' ? 'grayscale(1)' : 'none'
    return (
      <div style={containerStyle}>
        <div style={{ position: 'relative', width: '100%', height: '100%', transform: blockShift, filter: videoFilter }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain', transform: discTransform }}
          >
            <source src={project.logo} type="video/webm" />
          </video>
          {project.overlay && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.overlay}
              alt=""
              style={{ position: 'absolute', top: '50%', left: '50%', transform: coverTransform, width: '94%', height: '94%', objectFit: 'contain', pointerEvents: 'none' }}
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
        transition: 'flex-basis 0.5s cubic-bezier(0.16, 1, 0.3, 1), flex-grow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
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
              transition: 'flex-grow 0.5s cubic-bezier(0.16, 1, 0.3, 1), flex-basis 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
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

            <AnimatePresence mode="sync" initial={false}>
              {isActive ? (
                <div
                  key={`active-${project.id}`}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', overflow: 'hidden' }}
                >
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
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`logo-active-${project.id}`}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
                        transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.1 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', willChange: 'transform, opacity' }}
                      >
                        <ProjectLogo project={project} isActive size="large" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div
                  key={`inactive-${project.id}`}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                  <div style={{ marginTop: '0.75rem' }}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`logo-inactive-${project.id}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.14, ease: [0.4, 0, 1, 1] } }}
                        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <ProjectLogo project={project} isActive={false} size="small" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div style={{ flex: 1 }} />
                </div>
              )}
            </AnimatePresence>

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
