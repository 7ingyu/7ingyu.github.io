import { useRef, useState, useEffect, useContext } from 'react'
import { Link, createRoutesFromElements } from 'react-router-dom'
import { Collapse } from 'bootstrap'
import { ThemeContext } from '@/context'

const Nav = () => {

  const collapses = useRef<{[key:string]: Collapse}>({})
  const [ open, setOpen ] = useState<{[key:string]: boolean}>({})
  const [ theme, setTheme ] = useContext(ThemeContext)

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
              data-bs-target="worklinks"
              aria-expanded={open.worklinks}
              onMouseEnter={() => setOpen({...open, worklinks: true, contactlinks: false})}
              onMouseLeave={() => setOpen({...open, worklinks: false})}
            >
              <Link className="nav-link dropdown-toggle" to="#">Work</Link>
              <ul className="collapse list-unstyled position-xl-absolute" id="worklinks">
                <li className="nav-item"><Link className="nav-link" to="#">Professional</Link></li>
                <li className="nav-item"><Link className="nav-link" to="#">Personal</Link></li>
              </ul>
            </li>
            <li
              className="nav-item dropdown"
              data-bs-target="contactlinks"
              aria-expanded={open.contactlinks}
              onMouseEnter={() => setOpen({...open, contactlinks: true, worklinks: false})}
              onMouseLeave={() => setOpen({...open, contactlinks: false})}
            >
              <Link
                className="nav-link dropdown-toggle"
                to="#"
              >
                Contact
              </Link>
              <ul className="collapse list-unstyled position-xl-absolute" id="contactlinks">
                <li className="nav-item"><Link className="nav-link" to="#">LinkedIn</Link></li>
                <li className="nav-item"><Link className="nav-link" to="#">Github</Link></li>
              </ul>
            </li>
          </ul>
          <div>
            <button
              onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
            >
              {theme}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
