import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDecisions } from '../context/DecisionContext'
import './NewDecision.css'

export default function NewDecision() {
    const navigate = useNavigate()
    const { createDecision, isAnalyzing } = useDecisions()

    const [scenario, setScenario] = useState('')
    const [category, setCategory] = useState('Business')
    const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium')
    const [stakeholders, setStakeholders] = useState('')
    const [error, setError] = useState('')

    const categories = [
        'Business',
        'Technology',
        'Finance',
        'Operations',
        'Strategy',
        'Human Resources',
        'Product',
        'Marketing',
        'Legal',
        'Social Impact',
        'Personal',
        'Other'
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!scenario.trim()) {
            setError('Please describe your scenario or question')
            return
        }

        if (scenario.length < 20) {
            setError('Please provide more detail about your scenario (at least 20 characters)')
            return
        }

        const decision = await createDecision({
            scenario: scenario.trim(),
            category,
            urgency,
            stakeholders: stakeholders.trim() || 'General stakeholders',
        })

        navigate(`/decision/${decision.id}`)
    }

    return (
        <div className="new-decision-page page">
            <div className="new-decision-container container">
                {isAnalyzing ? (
                    <div className="analyzing-overlay">
                        <div className="analyzing-content">
                            <div className="analyzing-animation">
                                <div className="orbit-ring">
                                    <div className="orbit-dot risk" />
                                    <div className="orbit-dot impact" />
                                    <div className="orbit-dot cost" />
                                    <div className="orbit-dot ethics" />
                                </div>
                                <div className="center-pulse" />
                            </div>

                            <h2>Analyzing from Multiple Perspectives</h2>
                            <p>Generating insights from risk, impact, cost, and ethical viewpoints...</p>

                            <div className="analyzing-steps">
                                <div className="step active">
                                    <span className="step-icon">⚠️</span>
                                    <span>Risk Analysis</span>
                                </div>
                                <div className="step active">
                                    <span className="step-icon">🎯</span>
                                    <span>Impact Assessment</span>
                                </div>
                                <div className="step active">
                                    <span className="step-icon">💰</span>
                                    <span>Cost-Benefit</span>
                                </div>
                                <div className="step active">
                                    <span className="step-icon">⚖️</span>
                                    <span>Ethics Review</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <header className="page-header">
                            <h1>New Decision Analysis</h1>
                            <p>Describe your scenario and receive multi-perspective insights</p>
                        </header>

                        <form onSubmit={handleSubmit} className="decision-form">
                            {error && (
                                <div className="form-error-banner">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 8v4M12 16h.01" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <div className="form-section">
                                <label className="form-label" htmlFor="scenario">
                                    Scenario or Question <span className="required">*</span>
                                </label>
                                <p className="form-hint">
                                    Describe the decision you're facing or the question you need to evaluate.
                                    Be specific about the context and what you're trying to decide.
                                </p>
                                <textarea
                                    id="scenario"
                                    className="input textarea"
                                    placeholder="e.g., Should we expand our product line to include enterprise solutions? We currently serve SMBs but have received interest from larger companies..."
                                    value={scenario}
                                    onChange={(e) => setScenario(e.target.value)}
                                    rows={5}
                                />
                                <span className="char-count">{scenario.length} characters</span>
                            </div>

                            <div className="form-row">
                                <div className="form-section">
                                    <label className="form-label" htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        className="input select"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-section">
                                    <label className="form-label">Urgency</label>
                                    <div className="urgency-options">
                                        {(['low', 'medium', 'high'] as const).map((level) => (
                                            <button
                                                key={level}
                                                type="button"
                                                className={`urgency-option ${urgency === level ? 'active' : ''} urgency-${level}`}
                                                onClick={() => setUrgency(level)}
                                            >
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <label className="form-label" htmlFor="stakeholders">
                                    Key Stakeholders
                                </label>
                                <p className="form-hint">
                                    Who will be affected by this decision? (comma-separated)
                                </p>
                                <input
                                    id="stakeholders"
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Customers, Employees, Investors, Partners"
                                    value={stakeholders}
                                    onChange={(e) => setStakeholders(e.target.value)}
                                />
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-lg">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 8v8M8 12h8" />
                                    </svg>
                                    Analyze Decision
                                </button>
                            </div>
                        </form>

                        <div className="form-info">
                            <h3>What happens next?</h3>
                            <p>
                                Once you submit, our multi-perspective engine will analyze your scenario
                                from four distinct viewpoints: Risk, Impact, Cost, and Ethics. Each
                                perspective will provide its own reasoning and conclusion, which are then
                                synthesized into a balanced consensus recommendation.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
