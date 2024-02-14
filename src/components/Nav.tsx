import { useRef, useState, useEffect } from 'react'
import { Link, createRoutesFromElements } from 'react-router-dom'
import { Collapse } from 'bootstrap'

const Nav = () => {

  const collapses = useRef<{[key:string]: Collapse}>({})
  const [ open, setOpen ] = useState<{[key:string]: boolean}>({})

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
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Navbar</Link>
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
            <li className="nav-item dropdown" data-bs-target="worklinks">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                aria-expanded="false"
              >
                Work
              </Link>
              <ul className="dropdown-menu" id="worklinks">
                <li><Link className="dropdown-item" to="#">Professional</Link></li>
                <li><Link className="dropdown-item" to="#">Personal</Link></li>
              </ul>
            </li>
            <li
              className="nav-item dropdown"
              data-bs-target="contactlinks"
              aria-expanded={open.contactlinks}
              onMouseEnter={() => setOpen({...open, contactlinks: true})}
              onMouseLeave={() => setOpen({...open, contactlinks: false})}
            >
              <Link
                className="nav-link dropdown-toggle"
                to="#"
              >
                Contact
              </Link>
              <ul className="dropdown-menu" id="contactlinks">
                <li><Link className="dropdown-item" to="#">LinkedIn</Link></li>
                <li><Link className="dropdown-item" to="#">Github</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
