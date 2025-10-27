import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../utils/auth'
import '../styles.css'

export default function Layout({ children }){
  const nav = useNavigate()
  const session = getSession()

  function handleLogout(){
    clearSession()
    nav('/auth/login')
  }

  return (
    <div className="site app-style" role="application">
      <div className="container content-wide">
        <header className="header" role="banner">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <Link to="/" aria-label="Home" style={{display:'flex',alignItems:'center',gap:8}}>
              <span className="logo-small" aria-hidden></span>
              <strong>TicketApp</strong>
            </Link>
          </div>
          <nav className="nav" role="navigation" aria-label="Main navigation">
            <Link to="/" className="btn">Home</Link>
            <Link to="/dashboard" className="btn">Dashboard</Link>
            <Link to="/tickets" className="btn">Tickets</Link>
            {session ? (
              <button onClick={handleLogout} className="btn">Logout</button>
            ) : (
              <Link to="/auth/login" className="btn">Login</Link>
            )}
          </nav>
        </header>

        <main role="main" style={{marginTop:18}}>
          {children}
        </main>
      </div>

      <footer className="footer" role="contentinfo">© {new Date().getFullYear()} TicketApp — Demo app. All rights reserved.</footer>
    </div>
  )
}
