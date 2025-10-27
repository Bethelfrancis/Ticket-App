import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getSession, clearSession } from '../utils/auth'
import '../styles.css'

export default function Layout({ children }){
    const nav = useNavigate()
    const location = useLocation()
    const session = getSession()
    const [mobileOpen, setMobileOpen] = useState(false)

    function handleLogout(){
        clearSession()
        nav('/auth/login')
    }

    useEffect(()=>{
        // close mobile nav when route changes
        setMobileOpen(false)
    },[location.pathname])

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
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <button className={`hamburger ${mobileOpen? 'open':''}`} aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)}>
                            <span aria-hidden className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                        <nav className={`nav ${mobileOpen ? 'mobile-open':''}`} role="navigation" aria-label="Main navigation">
                            <Link to="/" className="btn" onClick={()=>setMobileOpen(false)}>Home</Link>
                            <Link to="/dashboard" className="btn" onClick={()=>setMobileOpen(false)}>Dashboard</Link>
                            <Link to="/tickets" className="btn" onClick={()=>setMobileOpen(false)}>Tickets</Link>
                            {session ? (
                                <button onClick={()=>{ setMobileOpen(false); handleLogout(); }} className="btn">Logout</button>
                            ) : (
                                <Link to="/auth/login" className="btn" onClick={()=>setMobileOpen(false)}>Login</Link>
                            )}
                        </nav>
                    </div>
                </header>

                <main role="main" style={{marginTop:18}}>
                    {children}
                </main>
            </div>

            <footer className="footer" role="contentinfo">
                © {new Date().getFullYear()} TicketApp — Demo app. All rights reserved.
            </footer>
        </div>
    )
}
