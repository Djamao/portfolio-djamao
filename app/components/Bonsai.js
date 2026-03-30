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
        left: '-2rem',
        width: '38%',
        height: '72%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Image
        src="/bonsai.webp"
        alt="Bonsai"
        fill
        sizes="46vw"
        style={{ objectFit: 'contain', objectPosition: 'bottom left', filter }}
        priority
      />
    </div>
  )
}
