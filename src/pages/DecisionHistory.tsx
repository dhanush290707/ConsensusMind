import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDecisions } from '../context/DecisionContext'
import './DecisionHistory.css'

export default function DecisionHistory() {
    const { decisions } = useDecisions()
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const categories = ['all', ...new Set(decisions.map(d => d.category))]

    const filteredDecisions = decisions.filter(decision => {
        const matchesSearch = decision.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
            decision.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = categoryFilter === 'all' || decision.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="history-page page">
            <div className="history-container container">
                <header className="history-header">
                    <div>
                        <h1>Decision History</h1>
                        <p>Review and revisit your past decision analyses</p>
                    </div>
                    <Link to="/new-decision" className="btn btn-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                        New Decision
                    </Link>
                </header>

                {decisions.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <h2>No decisions yet</h2>
                        <p>Start making better decisions with multi-perspective analysis.</p>
                        <Link to="/new-decision" className="btn btn-primary">
                            Create Your First Decision
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="history-filters">
                            <div className="search-box">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search decisions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="category-filters">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`category-btn ${categoryFilter === cat ? 'active' : ''}`}
                                        onClick={() => setCategoryFilter(cat)}
                                    >
                                        {cat === 'all' ? 'All' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="history-stats">
                            <p>
                                Showing <strong>{filteredDecisions.length}</strong> of{' '}
                                <strong>{decisions.length}</strong> decisions
                            </p>
                        </div>

                        {filteredDecisions.length === 0 ? (
                            <div className="no-results">
                                <p>No decisions match your filters.</p>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="history-list">
                                {filteredDecisions.map((decision) => (
                                    <Link
                                        key={decision.id}
                                        to={`/decision/${decision.id}`}
                                        className="history-item"
                                    >
                                        <div className="history-item-main">
                                            <div className="history-item-meta">
                                                <span className="badge">{decision.category}</span>
                                                <span className={`urgency-badge urgency-${decision.urgency}`}>
                                                    {decision.urgency}
                                                </span>
                                            </div>

                                            <h3 className="history-item-scenario">
                                                {decision.scenario}
                                            </h3>

                                            <div className="history-item-footer">
                                                <span className="history-date">{formatDate(decision.createdAt)}</span>
                                                <div className="perspectives-summary">
                                                    {decision.perspectives.map((p, i) => (
                                                        <span
                                                            key={i}
                                                            className={`perspective-pip ${p.type} stance-${p.stance}`}
                                                            title={`${p.title}: ${p.stance}`}
                                                        >
                                                            {p.icon}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="history-item-summary">
                                            <div className="confidence-circle">
                                                <svg viewBox="0 0 36 36">
                                                    <path
                                                        d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        stroke="var(--bg-tertiary)"
                                                        strokeWidth="3"
                                                    />
                                                    <path
                                                        d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        stroke="url(#confGrad)"
                                                        strokeWidth="3"
                                                        strokeDasharray={`${decision.consensus.confidence}, 100`}
                                                        strokeLinecap="round"
                                                    />
                                                    <defs>
                                                        <linearGradient id="confGrad">
                                                            <stop offset="0%" stopColor="#6366f1" />
                                                            <stop offset="100%" stopColor="#8b5cf6" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <span className="confidence-value">{decision.consensus.confidence}%</span>
                                            </div>
                                            <span className="confidence-label">Confidence</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
