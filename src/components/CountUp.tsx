'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string   // ex: "50+", "97%", "2+"
  duration?: number
}

export default function CountUp({ value, duration = 1500 }: Props) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Extraire la partie numérique et le suffixe
    const match = value.match(/^(\d+)(.*)$/)
    if (!match) { setDisplay(value); return }

    const target = parseInt(match[1])
    const suffix = match[2]

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        function step(now: number) {
          const progress = Math.min((now - start) / duration, 1)
          // easeOutQuart
          const eased = 1 - Math.pow(1 - progress, 4)
          setDisplay(Math.floor(eased * target) + suffix)
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={ref}>{display}</span>
}
