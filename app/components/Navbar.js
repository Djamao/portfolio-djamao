'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (href) => {
    if (href === '/') return pathname === '/' || pathname === '/about'
    return pathname.startsWith(href)
  }

  const dark = pathname === '/contact'
  const bg = dark ? '#000000' : '#ffffff'
  const border = dark ? '#ffffff' : '#0a0a0a'
  const color = dark ? '#ffffff' : '#0a0a0a'

  return (
    <nav
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: `1px solid ${border}`,
        backgroundColor: bg,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          padding: '0.3rem 1.5rem',
          borderRight: `1px solid ${border}`,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NavLink href="/" active={isActive('/')} color={color}>djamao</NavLink>
      </div>

      <div
        style={{
          padding: '0.3rem 1.5rem',
          borderRight: `1px solid ${border}`,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NavLink href="/projets" active={isActive('/projets')} color={color}>projets</NavLink>
      </div>

      <div
        style={{
          padding: '0.3rem 1.5rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NavLink href="/contact" active={isActive('/contact')} color={color}>contact</NavLink>
      </div>
    </nav>
  )
}

function NavLink({ href, active, color, children }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-clash)',
        fontSize: '22px',
        fontWeight: 500,
        color,
        textDecoration: 'none',
        letterSpacing: '0.02em',
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '0px',
      }}
    >
      <span>{children}</span>
      <motion.span
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'block',
          height: '1px',
          backgroundColor: color,
          transformOrigin: 'left',
          marginTop: '-3px',
        }}
      />
    </Link>
  )
}
