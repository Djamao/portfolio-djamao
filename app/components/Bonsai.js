import Image from 'next/image'

export default function Bonsai({ monochrome = false }) {
  const filter = monochrome
    ? 'grayscale(1) brightness(1.05) contrast(1.05)'
    : 'brightness(1.15) saturate(1.6) sepia(0.25) contrast(1.05)'

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 'clamp(-1rem, -2vw, 2rem)',
        width: 'clamp(30%, 40vw, 55%)',
        height: 'clamp(60%, 70vh, 85%)',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Image
        src="/bonsai.webp"
        alt="Bonsai"
        fill
        sizes="(max-width: 768px) 50vw, 45vw"
        style={{ objectFit: 'contain', objectPosition: 'bottom left', filter }}
        priority
      />
    </div>
  )
}
