import { useEffect, useRef, useState } from 'react'
import { Nav, Header, PersonalWork, ProfessionalWork } from '@/components'
import '@/styles/index.scss'

const App = ({ section } : { section?: string }) => {
  const body = useRef<HTMLElement>(document.body)
  const [ mode, setMode ] = useState('dark');

  useEffect(() => {
    body.current.setAttribute('data-bs-theme', mode);
  }, [body, mode])

  useEffect(() => {
    if (!section) return
    document.getElementById(section)?.scrollIntoView({
      behavior: 'instant',
      block: 'start',
      inline: 'start'
    })
  }, [section])

  return (
    <>
      <Nav />
    </>
  )
}

export default App