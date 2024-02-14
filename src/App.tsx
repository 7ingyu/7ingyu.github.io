import { useEffect } from 'react'
import { Nav, Header, PersonalWork, ProfessionalWork } from '@/components'
import '@/styles/index.scss'

const App = ({ section } : { section?: string }) => {
  useEffect(() => {
    if (!section) return
    document.getElementById(section)?.scrollIntoView({
      behavior: 'instant',
      block: 'start',
      inline: 'start'
    })
  }, [section])

  return (
    <div data-bs-theme="dark">
      <Nav />
    </div>
  )
}

export default App