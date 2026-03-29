'use client'
import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import VerticalWords from '../components/VerticalWords'
import Bonsai from '../components/Bonsai'

const projects = [
  { id: 'staeky', name: 'STAEKY',           accent: '#4A6FE3', image: '/staeky-thumb.webp',       href: '/projets/staeky' },
  { id: 'bbc',    name: 'BAKERY BLISS CAFÉ', accent: '#C94B1F', image: '/bbc-thumb.webp',            href: '/projets/bbc'    },
  { id: 'sam',    name: 'SAM QUILES',        accent: '#0a0a0a', image: '/sam-cd-case.webp',           href: '/projets/sam'    },
  { id: 'djamao', name: 'DJAMAO PIERRE',     accent: '#2D5016', image: '/vagabond.webp',              href: '/projets/djamao' },
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

  const active = projects[activeIndex]
  const maxWordLen = Math.max(...active.name.split(' ').map(w => w.length))
  const fontSize = Math.min(82, Math.max(40, Math.floor(660 / maxWordLen)))

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
      {/* Colonne gauche — titre vertical */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          padding: '30px 1.5rem',
        }}
      >
        <VerticalWords
          key={active.id}
          name={active.name}
          color="#0a0a0a"
          size={fontSize}
        />
      </div>

      {/* Centre — pile de cartes */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'relative', width: '300px', height: '400px' }}>
          {projects.map((project, i) => {
            const dist = i - activeIndex
            const absDist = Math.abs(dist)
            const isActive = dist === 0

            const scale = [1, 0.87, 0.75, 0.63][Math.min(absDist, 3)]
            const translateY = dist < 0
              ? [-55, -90, -115][Math.min(absDist - 1, 2)]
              : dist > 0
              ? [55, 90, 115][Math.min(absDist - 1, 2)]
              : 0
            const opacity = [1, 0.65, 0.45, 0.3][Math.min(absDist, 3)]
            const zIndex = 4 - absDist

            return (
              <div
                key={project.id}
                onClick={() => isActive ? router.push(project.href) : setActiveIndex(i)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '300px',
                  height: '400px',
                  zIndex,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  transformOrigin: 'center center',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="300px"
                  style={{ objectFit: 'cover' }}
                  priority={isActive}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation droite — thumbnails + dots */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'stretch',
          paddingRight: '1.5rem',
        }}
      >
        {/* Thumbnails */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            height: '100%',
            gap: '12px',
          }}
        >
          {projects.map((project, i) => {
            const isActive = activeIndex === i
            return (
              <div
                key={project.id}
                onClick={(e) => { e.stopPropagation(); go(i - activeIndex) }}
                style={{
                  width: '60px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0,
                    width: isActive ? 60 : 48,
                    height: isActive ? 80 : 64,
                    opacity: isActive ? 1 : 0.4,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="60px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Dots */}
        <div
          style={{
            width: '20px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '10%',
              bottom: '10%',
              width: '1px',
              backgroundColor: '#0a0a0a',
            }}
          />
          {projects.map((project, i) => (
            <div key={project.id} style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  borderRadius: '50%',
                  border: '1px solid #0a0a0a',
                  width: activeIndex === i ? 9 : 6,
                  height: activeIndex === i ? 9 : 6,
                  backgroundColor: activeIndex === i ? '#0a0a0a' : '#ffffff',
                  transition: 'all 0.25s ease',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <Bonsai />
    </main>
  )
}
