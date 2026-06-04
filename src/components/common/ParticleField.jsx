import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 60

const random = (min, max) => Math.random() * (max - min) + min

const initParticles = (width, height) =>
  Array.from({ length: PARTICLE_COUNT }, () => ({
    x: random(0, width),
    y: random(0, height),
    size: random(1, 3.5),
    speedX: random(-0.3, 0.3),
    speedY: random(-0.6, -0.15),
    opacity: random(0.15, 0.55),
    pulse: random(0, Math.PI * 2), // phase offset for shimmer
    type: Math.random() > 0.5 ? 'dot' : 'wheat', // dot or wheat stalk
  }))

const drawWheat = (ctx, x, y, size, opacity) => {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.strokeStyle = '#D4A017'
  ctx.lineWidth = size * 0.4

  // Stalk
  ctx.beginPath()
  ctx.moveTo(x, y + size * 3)
  ctx.lineTo(x, y - size * 3)
  ctx.stroke()

  // Grain tips
  const grains = 3
  for (let i = 0; i < grains; i++) {
    const gy = y - size * i * 1.2
    ctx.beginPath()
    ctx.moveTo(x, gy)
    ctx.lineTo(x - size * 1.2, gy - size * 0.8)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, gy)
    ctx.lineTo(x + size * 1.2, gy - size * 0.8)
    ctx.stroke()
  }
  ctx.restore()
}

const ParticleField = () => {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      particles.current = initParticles(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    let tick = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      tick++

      particles.current.forEach((p) => {
        // Shimmer opacity
        const shimmer = p.opacity + Math.sin(tick * 0.02 + p.pulse) * 0.1

        if (p.type === 'wheat') {
          drawWheat(ctx, p.x, p.y, p.size, shimmer)
        } else {
          ctx.save()
          ctx.globalAlpha = shimmer
          ctx.fillStyle = '#D4A017'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        // Move
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around
        if (p.y < -20) { p.y = canvas.height + 20; p.x = random(0, canvas.width) }
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
      })

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  )
}

export default ParticleField
