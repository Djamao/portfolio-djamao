'use client'
import Bonsai from '../components/Bonsai'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const footerLabel = {
  fontFamily: 'var(--font-cabinet)',
  fontWeight: 600,
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#ffffff',
  display: 'block',
  marginBottom: 0,
}

const field = {
  fontFamily: 'var(--font-satoshi)',
  fontSize: '0.9rem',
  color: '#ffffff',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid #ffffff',
  outline: 'none',
  padding: '0 0 0.3rem 0',
  width: '100%',
  caretColor: '#ffffff',
}

// vis indices:
// 0  DJAMAO PIERRE
// 1  NOM
// 2  MAIL (form)
// 3  MESSAGE
// 4  ENVOYER
// 5  CV
// 6  Lien
// 7  MAIL (footer)
// 8  djamaopro@gmail.com
// 9  RÉSEAUX SOCIAUX
// 10 Instagram
// 11 Linkedin
// 12 Twitter
// 13 TikTok
const REST_TEXTS = [
  'DJAMAO PIERRE',
  'NOM',
  'MAIL',
  'MESSAGE',
  'ENVOYER',
  'CV',
  'Lien',
  'MAIL',
  'djamaopro@gmail.com',
  'RÉSEAUX SOCIAUX',
  'Instagram',
  'Linkedin',
  'Twitter',
  'TikTok',
]
const REST_TOTAL = REST_TEXTS.reduce((acc, t) => acc + t.length, 0)

const TITLE_DONE = 1300

function TypeText({ full, visible, style, as: Tag = 'span' }) {
  return (
    <Tag style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span style={{ visibility: 'hidden' }}>{full}</span>
      <span style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'pre' }}>{visible}</span>
    </Tag>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ nom: '', mail: '', message: '' })
  const [focused, setFocused] = useState({ nom: false, mail: false, message: false })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const onFocus = (e) => setFocused(p => ({ ...p, [e.target.name]: true }))
  const onBlur  = (e) => setFocused(p => ({ ...p, [e.target.name]: false }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.nom || !form.mail || !form.message) return
    setStatus('sending')
    const res = await fetch('https://formspree.io/f/mqegeovp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom: form.nom, email: form.mail, message: form.message }),
    })
    if (res.ok) {
      setStatus('sent')
      setForm({ nom: '', mail: '', message: '' })
    } else {
      setStatus('error')
    }
  }
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    document.documentElement.style.background = '#000000'
    return () => { document.documentElement.style.background = '' }
  }, [])

  useEffect(() => {
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCharCount(c => {
          if (c >= REST_TOTAL) { clearInterval(interval); return c }
          return c + 1
        })
      }, 35)
    }, TITLE_DONE)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [])

  let rem = charCount
  const vis = REST_TEXTS.map(text => {
    const n = Math.min(rem, text.length)
    rem = Math.max(0, rem - text.length)
    return text.slice(0, n)
  })

  const showPlaceholder = (name, idx) => !focused[name] && form[name] === ''
    ? vis[idx]
    : ''

  return (
    <>
    <style>{`
      .contact-input::placeholder { color: transparent; }
    `}</style>
    <main
      style={{
        height: 'calc(var(--vp-height, 100vh) - 68px)',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Titre */}
      <div style={{ textAlign: 'center', padding: '2rem 30px 0' }}>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          style={{
            fontFamily: 'var(--font-clash)',
            fontWeight: 700,
            fontSize: 'clamp(5rem, 12vw, 11rem)',
            lineHeight: 0.88,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          {'CONTACT'.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
              }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <p
          style={{
            fontFamily: 'var(--font-satoshi)',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            color: '#ffffff',
            marginTop: '0.75rem',
            minHeight: '1em',
          }}
        >
          {vis[0]}
        </p>
      </div>

      {/* Formulaire — centré */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <form
          onSubmit={onSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3.5rem',
            width: '100%',
            maxWidth: '520px',
          }}
        >
          {[
            { name: 'nom',     type: 'text',  visIdx: 1 },
            { name: 'mail',    type: 'email', visIdx: 2 },
            { name: 'message', type: 'text',  visIdx: 3 },
          ].map(({ name, type, visIdx }) => (
            <div key={name} style={{ position: 'relative' }}>
              {/* Placeholder animé */}
              {showPlaceholder(name, visIdx) && (
                <span style={{
                  position: 'absolute',
                  bottom: '0.3rem',
                  left: 0,
                  fontFamily: 'var(--font-satoshi)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  pointerEvents: 'none',
                }}>
                  {showPlaceholder(name, visIdx)}
                </span>
              )}
              <input
                className="contact-input"
                name={name}
                type={type}
                value={form[name]}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                style={field}
                autoComplete="off"
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              alignSelf: 'center',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ffffff',
            }}
          >
            <span style={{ fontFamily: 'var(--font-cabinet)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {status === 'sending' ? 'ENVOI...' : status === 'sent' ? 'ENVOYÉ ✓' : status === 'error' ? 'ERREUR' : <TypeText full="ENVOYER" visible={vis[4]} />}
            </span>
          </button>
        </form>
      </div>

      {/* Footer — 3 colonnes */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '1.5rem 30px',
        }}
      >
        {/* CV */}
        <div>
          <p style={footerLabel}><TypeText full="CV" visible={vis[5]} /></p>
          <a href="/cv.pdf" download style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#ffffff', textDecoration: 'none', display: 'inline-block' }}>
            <TypeText full="Lien" visible={vis[6]} />
          </a>
        </div>

        {/* Mail */}
        <div>
          <p style={footerLabel}><TypeText full="MAIL" visible={vis[7]} /></p>
          <a href="mailto:djamaopro@gmail.com" style={{ fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#ffffff', textDecoration: 'none', display: 'inline-block' }}>
            <TypeText full="djamaopro@gmail.com" visible={vis[8]} />
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <p style={footerLabel}><TypeText full="RÉSEAUX SOCIAUX" visible={vis[9]} /></p>
          {[
            { label: 'Instagram', href: 'https://www.instagram.com/djamaoprr/',                i: 10 },
            { label: 'Linkedin',  href: 'https://www.linkedin.com/in/djamao-pierre-06733b325/', i: 11 },
            { label: 'Twitter',   href: '#',                                                    i: 12 },
            { label: 'TikTok',    href: '#',                                                    i: 13 },
          ].map(r => (
            <a
              key={r.label}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', fontFamily: 'var(--font-satoshi)', fontSize: '0.875rem', color: '#ffffff', textDecoration: 'none', lineHeight: 1.6 }}
            >
              <TypeText full={r.label} visible={vis[r.i]} />
            </a>
          ))}
        </div>
      </div>

      <Bonsai />
    </main>
    </>
  )
}
