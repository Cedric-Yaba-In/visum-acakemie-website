'use client'
import { useEffect, useRef, ReactNode, ElementType } from 'react'

type Animation = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'fade'

interface Props {
  children: ReactNode
  animation?: Animation
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  as?: ElementType
  [key: string]: unknown  // forward any extra props (href, onClick, etc.)
}

const initial: Record<Animation, string> = {
  'fade-up':    'opacity-0 translate-y-8',
  'fade-down':  'opacity-0 -translate-y-8',
  'fade-left':  'opacity-0 translate-x-8',
  'fade-right': 'opacity-0 -translate-x-8',
  'zoom':       'opacity-0 scale-95',
  'fade':       'opacity-0',
}

export default function Reveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  once = true,
  as: Tag = 'div',
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.style.transitionDuration = `${duration}ms`
          el.classList.remove(...initial[animation].split(' '))
          el.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100')
          if (once) observer.disconnect()
        } else if (!once) {
          el.classList.add(...initial[animation].split(' '))
          el.classList.remove('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100')
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animation, delay, duration, once])

  return (
    <Tag
      ref={ref}
      className={`transition-all ease-out will-change-transform ${initial[animation]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
