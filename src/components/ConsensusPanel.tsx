import { ConsensusResult } from '../types/types'
import './ConsensusPanel.css'

interface ConsensusPanelProps {
    consensus: ConsensusResult
}

export default function ConsensusPanel({ consensus }: ConsensusPanelProps) {
    return (
        <div className="consensus-panel">
            <div className="consensus-header">
                <div className="consensus-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                    </svg>
                </div>
                <div>
                    <h2 className="consensus-title">Synthesized Consensus</h2>
                    <p className="consensus-subtitle">Combined analysis from all perspectives</p>
                </div>
                <div className="consensus-confidence">
                    <span className="confidence-number">{consensus.confidence}%</span>
                    <span className="confidence-label">Confidence</span>
                </div>
            </div>

            <div className="recommendation-block">
                <h3 className="recommendation-label">Recommendation</h3>
                <p className="recommendation-text">{consensus.recommendation}</p>
            </div>

            <div className="consensus-summary">
                <p>{consensus.summary}</p>
            </div>

            <div className="consensus-grid">
                <div className="consensus-section agreements">
                    <div className="section-header">
                        <span className="section-icon">✓</span>
                        <h4>Areas of Agreement</h4>
                    </div>
                    <ul className="consensus-list">
                        {consensus.agreements.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="consensus-section disagreements">
                    <div className="section-header">
                        <span className="section-icon">✗</span>
                        <h4>Points of Tension</h4>
                    </div>
                    <ul className="consensus-list">
                        {consensus.disagreements.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="tradeoffs-section">
                <h3 className="tradeoffs-title">Key Trade-offs</h3>
                <div className="tradeoffs-grid">
                    {consensus.tradeoffs.map((tradeoff, i) => (
                        <div key={i} className={`tradeoff-card weight-${tradeoff.weight}`}>
                            <div className="tradeoff-header">
                                <h4 className="tradeoff-factor">{tradeoff.factor}</h4>
                                <span className={`tradeoff-weight badge`}>
                                    {tradeoff.weight} priority
                                </span>
                            </div>
                            <div className="tradeoff-arguments">
                                <div className="argument pro">
                                    <span className="argument-icon">+</span>
                                    <p>{tradeoff.proArgument}</p>
                                </div>
                                <div className="argument con">
                                    <span className="argument-icon">−</span>
                                    <p>{tradeoff.conArgument}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
