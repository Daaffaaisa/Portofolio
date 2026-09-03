import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Experience } from '@/components/Experience'
import { Writing } from '@/components/Writing'
import { Contact } from '@/components/Contact'

export default function Index() {
  const location = useLocation()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'

    // If navigated back from project detail with scrollTo state, scroll to that section
    const scrollTarget = (location.state as { scrollTo?: string })?.scrollTo
    if (scrollTarget) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const el = document.getElementById(scrollTarget)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      // Clear the state so refresh goes to top
      window.history.replaceState({}, '')
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.state])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Writing />
        <Contact />
      </main>
    </div>
  )
}
