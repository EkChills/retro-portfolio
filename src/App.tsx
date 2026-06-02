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

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
