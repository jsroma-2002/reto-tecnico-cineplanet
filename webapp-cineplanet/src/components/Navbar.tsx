import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import '../styles/navbar.css';

function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark cinema-navbar">
      <div className="container">
        <NavLink className="navbar-brand cinema-navbar__brand" to="/">
          🎬 CinemaApp
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-controls="main-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="main-nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link cinema-navbar__link${isActive ? ' cinema-navbar__link--active' : ''}`
                }
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link cinema-navbar__link${isActive ? ' cinema-navbar__link--active' : ''}`
                }
                to="/candystore"
              >
                Dulcería
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link cinema-navbar__link${isActive ? ' cinema-navbar__link--active' : ''}`
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>

          {isAuthenticated && user.name && (
            <span className="navbar-text cinema-navbar__user">
              Bienvenido {user.name}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
