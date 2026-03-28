import Image from 'next/image'

export default function Bonsai() {
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
        style={{ objectFit: 'contain', objectPosition: 'bottom left', filter: 'brightness(1.15) saturate(1.6) sepia(0.25) contrast(1.05)' }}
        priority
      />
    </div>
  )
}
