import { Navigation } from '~/components/Navigation'
import { Hero } from '~/components/Hero'
import { About } from '~/components/About'
import { Experience } from '~/components/Experience'
import { Skills } from '~/components/Skills'
import { Contact } from '~/components/Contact'
import { Footer } from '~/components/Footer'
import { ScrollProgress } from '~/components/ScrollProgress'

/**
 * App — top-level composition.
 *
 * Reading order top-to-bottom:
 *   Nav → Hero → About → Experience → Skills → Contact → Footer
 */
function App() {
  return (
    <>
      <ScrollProgress />
      <Navigation />

      <main
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>

      <Footer />

      {/* Grain texture — barely visible, adds premium depth */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </>
  )
}

export default App
