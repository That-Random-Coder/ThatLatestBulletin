import { useEffect, useMemo, useState } from 'react'
import anime from 'animejs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoaderBar from './components/LoaderBar'
import NewspaperBackground from './components/NewspaperBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Filters from './components/Filters'
import Bulletins from './components/Bulletins'
import About from './components/About'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useThemeMotion } from './hooks/useThemeMotion'
import {
  API_KEY,
  CATEGORY_OPTIONS,
  COUNTRY_OPTIONS,
  DEFAULT_CATEGORIES,
  DEFAULT_COUNTRIES,
  DEFAULT_LANGUAGES,
  LANGUAGE_OPTIONS,
} from './utils/constants'
import { FALLBACK_ARTICLES } from './data/fallbackArticles'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [theme, setTheme] = useState('dark')
  const [articles, setArticles] = useState(FALLBACK_ARTICLES)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(DEFAULT_CATEGORIES)
  const [selectedCountries, setSelectedCountries] = useState(DEFAULT_COUNTRIES)
  const [selectedLanguages, setSelectedLanguages] = useState(DEFAULT_LANGUAGES)
  const [expanded, setExpanded] = useState(null)

  const MAX_PER_GROUP = 5

  const triggerLoading = () => {
    setLoading(true)
    setProgress(0)
  }

  const apiUrl = useMemo(() => {
    const countries = selectedCountries.join(',')
    const languages = selectedLanguages.join(',')
    const categories = selectedCategories.join(',')
    return `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=${countries}&language=${languages}&category=${categories}&removeduplicate=1`
  }, [selectedCategories, selectedCountries, selectedLanguages])

  const toggleWithLimit = (value, selected, setter, label) => {
    if (selected.includes(value)) {
      if (selected.length === 1) {
        setNotice(`Keep at least one ${label}`)
        return
      }
      triggerLoading()
      setter(selected.filter((v) => v !== value))
      return
    }
    if (selected.length >= MAX_PER_GROUP) {
      setNotice(`Max ${MAX_PER_GROUP} ${label}`)
      anime({
        targets: '.notice',
        translateY: [{ value: -4, duration: 120 }, { value: 0, duration: 180 }],
        opacity: [{ value: 0.6, duration: 80 }, { value: 1, duration: 160 }],
        easing: 'easeOutQuad',
      })
      return
    }
    triggerLoading()
    setter([...selected, value])
  }

  useSmoothScroll()
  useThemeMotion(theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!notice) return undefined
    const timer = setTimeout(() => setNotice(''), 2200)
    return () => clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    if (loading) {
      setProgress((p) => (p < 15 ? 15 : p))
      const tick = setInterval(() => {
        setProgress((p) => {
          if (p >= 90) return p
          return p + Math.random() * 10
        })
      }, 200)
      return () => clearInterval(tick)
    }

    setProgress(100)
    const done = setTimeout(() => setProgress(0), 350)
    return () => clearTimeout(done)
  }, [loading])

  useEffect(() => {
    const controller = new AbortController()
    let timeoutId
    const fetchNews = async () => {
      setLoading(true)
      setError('')
      try {
        timeoutId = setTimeout(() => controller.abort(), 7000)
        const res = await fetch(apiUrl, { signal: controller.signal })
        if (!res.ok) throw new Error('Failed to fetch bulletins')
        const data = await res.json()
        const results = Array.isArray(data?.results) ? data.results : []
        const cleaned = results
          .filter((item) => item.title && item.description)
          .map((item) => ({
            ...item,
            category: item.category || item.categories || ['global'],
          }))
        setArticles(cleaned.length ? cleaned : FALLBACK_ARTICLES)
      } catch (err) {
        console.error(err)
        setError('')
        setArticles((prev) => (prev && prev.length ? prev : FALLBACK_ARTICLES))
      } finally {
        clearTimeout(timeoutId)
        setLoading(false)
      }
    }

    fetchNews()

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [apiUrl])

  useEffect(() => {
    const targets = gsap.utils.toArray('.fade-in')
    ScrollTrigger.getAll().forEach((t) => t.kill())
    targets.forEach((el, idx) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: idx * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
            once: false,
          },
        },
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [articles, theme])

  const filteredArticles = useMemo(() => articles, [articles])

  return (
    <div className={`app ${theme}`}>
      <NewspaperBackground theme={theme} />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        onNav={(id) => scrollToId(id)}
      />
      <LoaderBar loading={loading} progress={progress} />

      <main>
        <Hero
          selectedCategories={selectedCategories}
          selectedCountries={selectedCountries}
          selectedLanguages={selectedLanguages}
          onPrimary={() => scrollToId('bulletins')}
          onSecondary={() => scrollToId('filters')}
        />

        <Filters
          categoryOptions={CATEGORY_OPTIONS}
          countryOptions={COUNTRY_OPTIONS}
          languageOptions={LANGUAGE_OPTIONS}
          selectedCategories={selectedCategories}
          selectedCountries={selectedCountries}
          selectedLanguages={selectedLanguages}
          onToggleCategory={(cat) => toggleWithLimit(cat, selectedCategories, setSelectedCategories, 'categories')}
          onToggleCountry={(code) => toggleWithLimit(code, selectedCountries, setSelectedCountries, 'countries')}
          onToggleLanguage={(lng) => toggleWithLimit(lng, selectedLanguages, setSelectedLanguages, 'languages')}
          onReset={() => {
            setSelectedCategories(DEFAULT_CATEGORIES)
            setSelectedCountries(DEFAULT_COUNTRIES)
            setSelectedLanguages(DEFAULT_LANGUAGES)
            setNotice('Reset to defaults')
          }}
          notice={notice}
        />

        <Bulletins
          articles={filteredArticles}
          loading={loading}
          error={error}
          expanded={expanded}
          onToggle={(idx) => setExpanded((curr) => (curr === idx ? null : idx))}
        />

        <About />
      </main>
    </div>
  )
}

export default App
