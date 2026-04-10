// ============================================
// DESIGN SYSTEM CONSTANTS
// Styles réutilisables pour éliminer les répétitions
// ============================================

// ===== TYPOGRAPHY =====
export const FONT = {
  clash: 'var(--font-clash)',
  cabinet: 'var(--font-cabinet)',
  satoshi: 'var(--font-satoshi)',
}

// ===== SPACING PRESETS =====
export const SPACING = {
  xs: 'clamp(0.25rem, 0.5vw, 0.5rem)',
  sm: 'clamp(0.5rem, 1vw, 1rem)',
  md: 'clamp(1rem, 2vw, 1.5rem)',
  lg: 'clamp(1.5rem, 3vw, 2.5rem)',
  xl: 'clamp(2rem, 4vw, 3rem)',
}

export const PADDING_X = 'clamp(0.75rem, 3vw, 2rem)'

// ===== LAYOUT PATTERNS =====
export const FLEX_COL = {
  display: 'flex',
  flexDirection: 'column',
}

export const FLEX_CENTER = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const GRID_3COL = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, auto) minmax(0, 1fr) minmax(0, auto)',
  overflow: 'hidden',
}

export const OVERFLOW_HIDDEN = { overflow: 'hidden' }

// ===== PROJECT DETAIL STYLES =====
// Utilisé dans staeky, sam, bbc, djamao
export const PROJECT_LABEL = {
  fontFamily: FONT.cabinet,
  fontSize: '0.72rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
  fontWeight: 600,
  display: 'block',
}

export const PROJECT_ITEM = {
  fontFamily: FONT.cabinet,
  fontSize: '0.8rem',
  color: '#0a0a0a',
  lineHeight: 1.4,
  letterSpacing: 0,
}

export const PROJECT_LEFT_PANEL = {
  borderRight: '1px solid #0a0a0a',
  padding: SPACING.sm,
  ...FLEX_COL,
  gap: 'clamp(0.5rem, 1vw, 1rem)',
  ...OVERFLOW_HIDDEN,
  minWidth: 'clamp(80px, 12vw, 250px)',
}

export const PROJECT_RIGHT_PANEL = (color) => ({
  width: 'clamp(220px, 28vw, 450px)',
  borderLeft: '1px solid #0a0a0a',
  padding: `${SPACING.md} clamp(${PADDING_X}, 5%, 10vw)`,
  ...FLEX_COL,
  ...OVERFLOW_HIDDEN,
})

// ===== MOTION VARIANTS =====
export const VARIANT_FADE_SLIDE = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
}

export const VARIANT_FADE_STAGGER = (delayChildren = 0.3, staggerChildren = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

export const VARIANT_FADE_CHAR = (delay) => ({
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut', delay },
  },
})

// ===== NAVBAR =====
export const NAV_ACTIVE_UNDERLINE = {
  display: 'block',
  height: '1px',
  backgroundColor: 'currentColor',
  transformOrigin: 'left',
  marginTop: '-3px',
}

// ===== FORM STYLES =====
export const FORM_INPUT_BASE = {
  fontFamily: FONT.satoshi,
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

export const FORM_PLACEHOLDER = {
  position: 'absolute',
  bottom: '0.3rem',
  left: 0,
  fontFamily: FONT.satoshi,
  fontSize: '0.9rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
  pointerEvents: 'none',
}

// ===== MAIN CONTAINER PATTERNS =====
export const MAIN_BASE = {
  height: 'calc(100vh - var(--navbar-height))',
  width: '100%',
  backgroundColor: '#ffffff',
  position: 'relative',
  ...OVERFLOW_HIDDEN,
}

export const MAIN_DARK = {
  ...MAIN_BASE,
  backgroundColor: '#000000',
}
