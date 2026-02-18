import { Perspective } from '../types/types'
import './PerspectiveCard.css'

interface PerspectiveCardProps {
    perspective: Perspective
    index: number
}

export default function PerspectiveCard({ perspective, index }: PerspectiveCardProps) {
    const stanceColors = {
        support: 'var(--color-accent-emerald)',
        oppose: 'var(--color-accent-rose)',
        neutral: 'var(--color-accent-amber)',
    }

    const stanceLabels = {
        support: 'Supports',
        oppose: 'Opposes',
        neutral: 'Neutral',
    }

    return (
        <div
            className={`perspective-card perspective-${perspective.type}`}
            style={{ animationDelay: `${index * 0.15}s` }}
        >
            <div className="perspective-header">
                <div className="perspective-icon-wrapper">
                    <span className="perspective-icon">{perspective.icon}</span>
                </div>
                <div className="perspective-title-group">
                    <h3 className="perspective-title">{perspective.title}</h3>
                    <span className={`badge badge-${perspective.type}`}>
                        {perspective.type.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="perspective-content">
                <div className="reasoning-list">
                    {perspective.reasoning.map((point, i) => (
                        <div key={i} className="reasoning-item">
                            <span className="reasoning-bullet">•</span>
                            <p>{point}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="perspective-footer">
                <div className="perspective-conclusion">
                    <div className="conclusion-header">
                        <span
                            className="stance-indicator"
                            style={{ background: stanceColors[perspective.stance] }}
                        />
                        <span className="stance-label" style={{ color: stanceColors[perspective.stance] }}>
                            {stanceLabels[perspective.stance]}
                        </span>
                    </div>
                    <p className="conclusion-text">{perspective.conclusion}</p>
                </div>

                <div className="confidence-meter">
                    <div className="confidence-label">
                        <span>Confidence</span>
                        <span className="confidence-value">{perspective.confidence}%</span>
                    </div>
                    <div className="confidence-bar">
                        <div
                            className="confidence-fill"
                            style={{
                                width: `${perspective.confidence}%`,
                                background: stanceColors[perspective.stance]
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
