import { useEffect, useRef, useState } from 'react'
import {
  Nav,
  Header,
  Work,
  // PersonalWork,
  // ProfessionalWork
} from '@/components'
import '@/styles/index.scss'
import { ThemeContext } from '@/context'

const App = ({ section } : { section?: string }) => {
  const body = useRef<HTMLElement>(document.body)
  const [ theme, setTheme ] = useState('dark')

  useEffect(() => {
    body.current.setAttribute('data-bs-theme', theme);
  }, [body, theme])

  useEffect(() => {
    if (!section) return
    document.getElementById(section)?.scrollIntoView({
      behavior: 'instant',
      block: 'start',
      inline: 'start'
    })
  }, [section])

  return (
    <ThemeContext.Provider value={[ theme, setTheme ]}>
      <Nav />
      <Header />
      <Work />
    </ThemeContext.Provider>
  )
}

export default App