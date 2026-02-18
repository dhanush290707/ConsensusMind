import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth()
    const location = useLocation()

    const isLanding = location.pathname === '/'

    return (
        <nav className={`navbar ${isLanding ? 'navbar-transparent' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="navbar-logo">
                        <svg viewBox="0 0 32 32" className="logo-icon">
                            <defs>
                                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                            <circle cx="16" cy="16" r="14" fill="url(#logoGrad)" />
                            <path d="M10 16 L14 20 L22 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="navbar-title">ConsensusMind</span>
                </Link>

                <div className="navbar-links">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/new-decision"
                                className={`navbar-link ${location.pathname === '/new-decision' ? 'active' : ''}`}
                            >
                                New Decision
                            </Link>
                            <Link
                                to="/history"
                                className={`navbar-link ${location.pathname === '/history' ? 'active' : ''}`}
                            >
                                History
                            </Link>
                            <div className="navbar-divider" />
                            <div className="navbar-user">
                                <div className="user-avatar">
                                    {user?.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="user-name">{user?.name}</span>
                            </div>
                            <button onClick={logout} className="btn btn-ghost navbar-logout">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">
                                Log In
                            </Link>
                            <Link to="/signup" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
