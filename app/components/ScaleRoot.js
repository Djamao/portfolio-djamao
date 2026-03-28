'use client'
import { useEffect, useRef } from 'react'

const DESIGN_WIDTH = 1440

export default function ScaleRoot({ children }) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    function update() {
      const scale = Math.min(1, window.innerWidth / DESIGN_WIDTH)
      const vh = window.innerHeight / scale
      document.documentElement.style.setProperty('--vp-height', `${vh}px`)
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `scale(${scale})`
        wrapperRef.current.style.height = `${vh}px`
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        transformOrigin: 'top left',
        width: `${DESIGN_WIDTH}px`,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
