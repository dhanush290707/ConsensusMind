import { Link } from 'react-router-dom'
import { exampleDecisions } from '../utils/decisionEngine'
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className="landing-page page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-glow hero-glow-1" />
                    <div className="hero-glow hero-glow-2" />
                    <div className="hero-grid" />
                </div>

                <div className="hero-content container">
                    <div className="hero-badge">
                        <span className="badge-dot" />
                        Multi-Perspective Decision Intelligence
                    </div>

                    <h1 className="hero-title">
                        Make Better Decisions with{' '}
                        <span className="text-gradient">Collective Wisdom</span>
                    </h1>

                    <p className="hero-subtitle">
                        Simulate how a diverse group of experts would reason about your decisions.
                        Get balanced insights from risk, impact, cost, and ethical perspectives—all
                        synthesized into actionable consensus.
                    </p>

                    <div className="hero-actions">
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            Start Making Better Decisions
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <a href="#how-it-works" className="btn btn-secondary btn-lg">
                            See How It Works
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-value">4</span>
                            <span className="stat-label">Distinct Perspectives</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-value">1</span>
                            <span className="stat-label">Unified Consensus</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-value">∞</span>
                            <span className="stat-label">Better Decisions</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="how-it-works" className="features section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">
                            Our multi-perspective engine simulates diverse viewpoints to help you
                            understand the full picture before making critical decisions.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon risk">⚠️</div>
                            <h3>Risk Analysis</h3>
                            <p>Identify potential failure scenarios, uncertainties, and mitigation strategies to protect against downside.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon impact">🎯</div>
                            <h3>Impact Assessment</h3>
                            <p>Evaluate stakeholder effects, long-term consequences, and ripple effects across your ecosystem.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon cost">💰</div>
                            <h3>Cost-Benefit Analysis</h3>
                            <p>Assess financial implications, resource requirements, ROI projections, and opportunity costs.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon ethics">⚖️</div>
                            <h3>Ethical Considerations</h3>
                            <p>Examine moral implications, fairness, transparency, and social responsibility dimensions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="process section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Simple, Powerful Process</h2>
                        <p className="section-subtitle">
                            From question to consensus in minutes, not hours.
                        </p>
                    </div>

                    <div className="process-steps">
                        <div className="process-step">
                            <div className="step-number">01</div>
                            <div className="step-content">
                                <h3>Describe Your Scenario</h3>
                                <p>Enter the decision or question you're wrestling with. Provide context about stakeholders and urgency.</p>
                            </div>
                        </div>

                        <div className="process-connector" />

                        <div className="process-step">
                            <div className="step-number">02</div>
                            <div className="step-content">
                                <h3>Multi-Perspective Analysis</h3>
                                <p>Our engine generates four distinct viewpoints, each with unique reasoning and conclusions.</p>
                            </div>
                        </div>

                        <div className="process-connector" />

                        <div className="process-step">
                            <div className="step-number">03</div>
                            <div className="step-content">
                                <h3>Synthesized Consensus</h3>
                                <p>Receive a balanced recommendation highlighting agreements, tensions, and key trade-offs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Examples Section */}
            <section className="examples section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Example Decisions</h2>
                        <p className="section-subtitle">
                            See how multi-perspective reasoning illuminates complex choices.
                        </p>
                    </div>

                    <div className="examples-grid">
                        {exampleDecisions.map((example, i) => (
                            <div key={i} className="example-card">
                                <div className="example-header">
                                    <h3>{example.title}</h3>
                                    <p>{example.scenario}</p>
                                </div>

                                <div className="example-perspectives">
                                    {example.perspectives.map((p, j) => (
                                        <div key={j} className={`mini-perspective ${p.stance}`}>
                                            <span className="mini-type">{p.type}</span>
                                            <span className={`mini-stance stance-${p.stance}`}>
                                                {p.stance === 'support' ? '✓' : p.stance === 'oppose' ? '✗' : '○'}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="example-consensus">
                                    <span className="consensus-label">Consensus:</span>
                                    <p>{example.consensus}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-glow" />
                        <h2>Ready to Make Better Decisions?</h2>
                        <p>
                            Join professionals who use structured multi-perspective reasoning
                            to navigate complex choices with confidence.
                        </p>
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            Get Started Free
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="navbar-logo">
                                <svg viewBox="0 0 32 32" className="logo-icon">
                                    <defs>
                                        <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="16" cy="16" r="14" fill="url(#footerGrad)" />
                                    <path d="M10 16 L14 20 L22 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span>ConsensusMind</span>
                        </div>
                        <p className="footer-text">
                            Multi-perspective decision intelligence for complex choices.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
