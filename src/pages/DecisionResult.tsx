import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDecisions } from '../context/DecisionContext'
import PerspectiveCard from '../components/PerspectiveCard'
import ConsensusPanel from '../components/ConsensusPanel'
import './DecisionResult.css'

export default function DecisionResult() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { getDecision, currentDecision, setCurrentDecision } = useDecisions()

    useEffect(() => {
        if (id) {
            const decision = getDecision(id)
            if (decision) {
                setCurrentDecision(decision)
            } else {
                navigate('/dashboard')
            }
        }

        return () => {
            setCurrentDecision(null)
        }
    }, [id, getDecision, setCurrentDecision, navigate])

    if (!currentDecision) {
        return (
            <div className="decision-result-page page">
                <div className="container">
                    <div className="loading-state">
                        <div className="spinner spinner-lg" />
                        <p>Loading decision...</p>
                    </div>
                </div>
            </div>
        )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="decision-result-page page">
            <div className="result-container container">
                {/* Header */}
                <header className="result-header">
                    <Link to="/dashboard" className="back-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Dashboard
                    </Link>

                    <div className="result-title-section">
                        <div className="result-meta">
                            <span className="badge">{currentDecision.category}</span>
                            <span className={`urgency-badge urgency-${currentDecision.urgency}`}>
                                {currentDecision.urgency} urgency
                            </span>
                            <span className="result-date">{formatDate(currentDecision.createdAt)}</span>
                        </div>
                        <h1 className="result-scenario">{currentDecision.scenario}</h1>
                        {currentDecision.stakeholders && (
                            <p className="result-stakeholders">
                                <strong>Stakeholders:</strong> {currentDecision.stakeholders}
                            </p>
                        )}
                    </div>
                </header>

                {/* Perspectives Grid */}
                <section className="perspectives-section">
                    <h2 className="section-title">
                        <span className="title-icon">🔍</span>
                        Individual Perspectives
                    </h2>
                    <div className="perspectives-grid">
                        {currentDecision.perspectives.map((perspective, index) => (
                            <PerspectiveCard
                                key={perspective.type}
                                perspective={perspective}
                                index={index}
                            />
                        ))}
                    </div>
                </section>

                {/* Consensus Section */}
                <section className="consensus-section">
                    <h2 className="section-title">
                        <span className="title-icon">⚡</span>
                        Synthesized Consensus
                    </h2>
                    <ConsensusPanel consensus={currentDecision.consensus} />
                </section>

                {/* Actions */}
                <div className="result-actions">
                    <Link to="/new-decision" className="btn btn-primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                        New Decision
                    </Link>
                    <Link to="/history" className="btn btn-secondary">
                        View All Decisions
                    </Link>
                </div>
            </div>
        </div>
    )
}
