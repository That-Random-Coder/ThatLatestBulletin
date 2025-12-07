import { useEffect } from 'react'
import Lenis from 'lenis'

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}
