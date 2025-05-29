import React from 'react'

const Navbar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h1 className="display-1">CIRA</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="d-flex align-items-center justify-content-center bg-image text-white"
        style={{
          backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
          height: '100vh',
          backgroundSize: 'cover'
        }}
      >
        <div className="text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '2rem', borderRadius: '10px',  marginTop: '25%'}}>
          <h4 className="display-6">Emergency</h4>
          <h4 className="display-6">Worry not report it now</h4>
          <a
            className="btn btn-outline-light btn-lg"
            href="#"
            role="button"
          >
            Report Now!
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar