import { Link } from 'react-router-dom'

const Nav = () => {


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Work
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Professional</Link></li>
                <li><Link className="dropdown-item" to="#">Personal</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
