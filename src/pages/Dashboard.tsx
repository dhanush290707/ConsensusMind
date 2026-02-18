import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDecisions } from '../context/DecisionContext'
import './Dashboard.css'

export default function Dashboard() {
    const { user } = useAuth()
    const { decisions } = useDecisions()

    const recentDecisions = decisions.slice(0, 5)

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Just now'
        if (diffMins < 60) return `${diffMins} min ago`
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    }

    return (
        <div className="dashboard-page page">
            <div className="dashboard-container container">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="header-welcome">
                        <h1>
                            Welcome back, <span className="text-gradient">{user?.name}</span>
                        </h1>
                        <p>Ready to make better decisions with multi-perspective reasoning?</p>
                    </div>
                    <Link to="/new-decision" className="btn btn-primary btn-lg">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon-left">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                        New Decision
                    </Link>
                </header>

                {/* Stats */}
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{decisions.length}</span>
                            <span className="stat-label">Total Decisions</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">4</span>
                            <span className="stat-label">Perspectives</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <path d="M22 4L12 14.01l-3-3" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">
                                {decisions.length > 0
                                    ? Math.round(decisions.reduce((sum, d) => sum + d.consensus.confidence, 0) / decisions.length)
                                    : 0}%
                            </span>
                            <span className="stat-label">Avg Confidence</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="dashboard-content">
                    {/* Recent Decisions */}
                    <section className="content-section recent-section">
                        <div className="section-header-row">
                            <h2>Recent Decisions</h2>
                            {decisions.length > 5 && (
                                <Link to="/history" className="view-all-link">
                                    View All
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            )}
                        </div>

                        {recentDecisions.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        <path d="M12 11v6M9 14h6" />
                                    </svg>
                                </div>
                                <h3>No decisions yet</h3>
                                <p>Create your first decision to see multi-perspective analysis in action.</p>
                                <Link to="/new-decision" className="btn btn-primary">
                                    Create Your First Decision
                                </Link>
                            </div>
                        ) : (
                            <div className="decisions-list">
                                {recentDecisions.map((decision) => (
                                    <Link
                                        key={decision.id}
                                        to={`/decision/${decision.id}`}
                                        className="decision-item"
                                    >
                                        <div className="decision-main">
                                            <h3 className="decision-scenario">
                                                {decision.scenario.length > 80
                                                    ? decision.scenario.slice(0, 80) + '...'
                                                    : decision.scenario}
                                            </h3>
                                            <div className="decision-meta">
                                                <span className="badge">{decision.category}</span>
                                                <span className={`urgency-badge urgency-${decision.urgency}`}>
                                                    {decision.urgency} urgency
                                                </span>
                                                <span className="decision-time">{getTimeAgo(decision.createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="decision-summary">
                                            <div className="perspectives-mini">
                                                {decision.perspectives.map((p, i) => (
                                                    <span
                                                        key={i}
                                                        className={`mini-dot stance-${p.stance}`}
                                                        title={`${p.title}: ${p.stance}`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="confidence-mini">
                                                {decision.consensus.confidence}%
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Quick Actions */}
                    <section className="content-section quick-section">
                        <h2>Quick Actions</h2>
                        <div className="quick-actions">
                            <Link to="/new-decision" className="quick-action-card">
                                <div className="quick-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3>New Decision</h3>
                                <p>Analyze a new scenario</p>
                            </Link>

                            <Link to="/history" className="quick-action-card">
                                <div className="quick-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                </div>
                                <h3>View History</h3>
                                <p>Review past decisions</p>
                            </Link>
                        </div>

                        {/* Perspective Overview */}
                        <div className="perspective-overview">
                            <h3>Analysis Perspectives</h3>
                            <div className="perspectives-list">
                                <div className="perspective-mini-card">
                                    <span className="perspective-dot risk" />
                                    <div>
                                        <strong>Risk</strong>
                                        <span>Potential failures & uncertainties</span>
                                    </div>
                                </div>
                                <div className="perspective-mini-card">
                                    <span className="perspective-dot impact" />
                                    <div>
                                        <strong>Impact</strong>
                                        <span>Stakeholder & long-term effects</span>
                                    </div>
                                </div>
                                <div className="perspective-mini-card">
                                    <span className="perspective-dot cost" />
                                    <div>
                                        <strong>Cost</strong>
                                        <span>Financial & resource analysis</span>
                                    </div>
                                </div>
                                <div className="perspective-mini-card">
                                    <span className="perspective-dot ethics" />
                                    <div>
                                        <strong>Ethics</strong>
                                        <span>Moral & social considerations</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
