import { useEffect } from 'react'
import anime from 'animejs'

export const useThemeMotion = (theme) => {
  useEffect(() => {
    anime({
      targets: '.theme-toggle',
      rotate: theme === 'dark' ? 360 : -360,
      scale: [{ value: 0.9, duration: 120 }, { value: 1, duration: 380 }],
      duration: 650,
      easing: 'easeOutElastic(1, .7)',
    })
  }, [theme])
}
