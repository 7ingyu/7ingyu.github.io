import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'bootstrap'
import { ThemeToggle } from '@/components'
import { personalProjects, professionalProjects } from '@/data'

interface Project {
  title: string
  link: string
}

const Nav = () => {
  const collapses = useRef<{[key:string]: Collapse}>({})
  const [ open, setOpen ] = useState<{[key:string]: boolean}>({})
  const [ projects ] = useState<{personal: Project[], professional: Project[]}>({
    personal: personalProjects,
    professional: professionalProjects,
  })

  useEffect(() => {
    const openStates: {[key:string]: boolean} = {}
    const collapseElementList = document.querySelectorAll('.collapse')
    collapseElementList.forEach(el => {
      collapses.current[el.id] = new Collapse(el, { toggle: false })
      openStates[el.id] = false
    })
    setOpen(openStates)
  }, [])

  useEffect(() => {
    Object.entries(open).forEach(([id, bool]) => {
      if (bool) {
        collapses.current[id].show()
      } else {
        collapses.current[id].hide()
      }
    })
  }, [open])

  return (
    <nav className="navbar navbar-expand-lg bg-body">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#"></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-target="navcontainer"
          aria-label="Toggle navigation"
          aria-expanded={open.navcontainer}
          onClick={() => setOpen({...open, navcontainer: !open.navcontainer})}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcontainer">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">Home</Link>
            </li>
            <li
              className="nav-item dropdown"
              data-bs-target="professionalwork"
              aria-expanded={open.professionalwork}
              onMouseEnter={() => setOpen((open) => ({...open, professionalwork: true}))}
              onMouseLeave={() => setOpen((open) => ({...open, professionalwork: false}))}
            >
              <Link className="nav-link dropdown-toggle" to="#">Professional Work</Link>
              <ul className="collapse list-unstyled position-xl-absolute" id="professionalwork">
                {projects.professional.map(({title, link}, i) => (
                  <li className="nav-item" key={i}>
                    <Link
                      className="nav-link"
                      to={link}
                    >
                        {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className="nav-item dropdown"
              data-bs-target="personalwork"
              aria-expanded={open.personalwork}
              onMouseEnter={() => setOpen((open) => ({...open, personalwork: true}))}
              onMouseLeave={() => setOpen((open) => ({...open, personalwork: false}))}
            >
              <Link className="nav-link dropdown-toggle" to="#">Personal Work</Link>
              <ul className="collapse list-unstyled position-xl-absolute" id="personalwork">
                {projects.personal.map(({title, link}, i) => (
                  <li className="nav-item" key={i}>
                    <Link
                      className="nav-link"
                      to={link}
                    >
                        {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              className="nav-item dropdown"
              data-bs-target="contactlinks"
              aria-expanded={open.contactlinks}
              onMouseEnter={() => setOpen((open) => ({...open, contactlinks: true}))}
              onMouseLeave={() => setOpen((open) => ({...open, contactlinks: false}))}
            >
              <Link
                className="nav-link dropdown-toggle"
                to="#"
              >
                Contact
              </Link>
              <ul className="collapse list-unstyled position-xl-absolute" id="contactlinks">
                <li className="nav-item"><Link className="nav-link" to="https://linkedin.com/in/7ingyu">LinkedIn</Link></li>
                <li className="nav-item"><Link className="nav-link" to="https://github.com/7ingyu">Github</Link></li>
              </ul>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Nav
