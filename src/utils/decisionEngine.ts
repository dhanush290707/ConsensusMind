import { DecisionInput, Perspective, ConsensusResult, Tradeoff, PerspectiveType } from '../types/types'

interface AnalysisResult {
    perspectives: Perspective[]
    consensus: ConsensusResult
}

// Keyword patterns for analysis
const riskKeywords = ['risk', 'fail', 'loss', 'danger', 'threat', 'uncertainty', 'volatile', 'unstable']
const impactKeywords = ['affect', 'change', 'impact', 'influence', 'consequence', 'stakeholder', 'community', 'society']
const costKeywords = ['cost', 'budget', 'expense', 'invest', 'resource', 'money', 'financial', 'price', 'afford']
const ethicsKeywords = ['ethical', 'moral', 'fair', 'right', 'wrong', 'responsibility', 'trust', 'honest', 'transparent']

// Perspective templates with dynamic reasoning
const perspectiveTemplates = {
    risk: {
        title: 'Risk Analysis',
        icon: '⚠️',
        reasoningTemplates: [
            'Potential failure scenarios have been identified that could arise from this decision.',
            'Uncertainty factors include market conditions, implementation complexity, and external dependencies.',
            'Mitigation strategies should be developed for worst-case outcomes.',
            'Historical data suggests similar decisions have had variable success rates.',
            'Contingency planning is essential to minimize potential negative impacts.',
        ],
        supportConclusion: 'The risks appear manageable with proper mitigation strategies in place.',
        opposeConclusion: 'The risk profile suggests caution is warranted; potential downsides outweigh benefits.',
        neutralConclusion: 'Risks are present but not prohibitive; careful monitoring is recommended.',
    },
    impact: {
        title: 'Impact Assessment',
        icon: '🎯',
        reasoningTemplates: [
            'Multiple stakeholder groups will be affected by this decision.',
            'Long-term consequences extend beyond the immediate scope of implementation.',
            'Positive ripple effects could benefit adjacent areas and future initiatives.',
            'The scope of influence spans both direct participants and indirect beneficiaries.',
            'Sustainability of outcomes depends on proper execution and follow-through.',
        ],
        supportConclusion: 'The potential positive impact significantly outweighs potential negative effects.',
        opposeConclusion: 'Impact analysis reveals concerning effects on key stakeholders.',
        neutralConclusion: 'Impact distribution is mixed; benefits to some may come at cost to others.',
    },
    cost: {
        title: 'Cost-Benefit Analysis',
        icon: '💰',
        reasoningTemplates: [
            'Initial investment requirements have been evaluated against expected returns.',
            'Resource allocation includes both tangible costs and opportunity costs.',
            'ROI projections suggest a defined timeline for value realization.',
            'Budget constraints may require phased implementation or scope adjustments.',
            'Alternative uses of resources should be considered for comparison.',
        ],
        supportConclusion: 'The cost-benefit ratio is favorable; expected returns justify the investment.',
        opposeConclusion: 'Financial analysis indicates costs may outweigh foreseeable benefits.',
        neutralConclusion: 'Cost considerations are balanced; value depends on execution quality.',
    },
    ethics: {
        title: 'Ethical Considerations',
        icon: '⚖️',
        reasoningTemplates: [
            'Fairness and equity implications have been examined across affected groups.',
            'Transparency and accountability mechanisms should be established.',
            'The decision aligns with principles of responsible conduct and integrity.',
            'Potential conflicts of interest have been identified and addressed.',
            'Social responsibility extends to both immediate and broader community effects.',
        ],
        supportConclusion: 'The decision aligns well with ethical principles and promotes positive values.',
        opposeConclusion: 'Ethical concerns raise questions about the appropriateness of this approach.',
        neutralConclusion: 'Ethical dimensions are complex; multiple valid perspectives exist.',
    },
}

function analyzeScenario(input: DecisionInput): Record<PerspectiveType, number> {
    const text = `${input.scenario} ${input.category} ${input.stakeholders}`.toLowerCase()

    const countMatches = (keywords: string[]): number => {
        return keywords.filter(kw => text.includes(kw)).length
    }

    // Calculate relevance scores
    const scores = {
        risk: countMatches(riskKeywords) * 2 + (input.urgency === 'high' ? 3 : input.urgency === 'medium' ? 1 : 0),
        impact: countMatches(impactKeywords) * 2 + (input.stakeholders.split(',').length * 0.5),
        cost: countMatches(costKeywords) * 2 + (input.category.toLowerCase().includes('business') ? 2 : 0),
        ethics: countMatches(ethicsKeywords) * 2 + (input.category.toLowerCase().includes('social') ? 2 : 0),
    }

    // Ensure minimum engagement
    Object.keys(scores).forEach(key => {
        const k = key as PerspectiveType
        if (scores[k] < 1) scores[k] = 1 + Math.random() * 2
    })

    return scores
}

function determineStance(score: number, random: number): 'support' | 'oppose' | 'neutral' {
    const threshold = score > 3 ? 0.6 : 0.4
    if (random > threshold) return 'support'
    if (random < 0.3) return 'oppose'
    return 'neutral'
}

function generatePerspective(
    type: PerspectiveType,
    input: DecisionInput,
    relevanceScore: number
): Perspective {
    const template = perspectiveTemplates[type]
    const random = Math.random()
    const stance = determineStance(relevanceScore, random)

    // Select 3-4 reasoning points based on scenario
    const numPoints = 3 + Math.floor(Math.random() * 2)
    const shuffled = [...template.reasoningTemplates].sort(() => Math.random() - 0.5)
    const reasoning = shuffled.slice(0, numPoints)

    // Add scenario-specific reasoning
    const scenarioWords = input.scenario.split(' ').slice(0, 5).join(' ')
    reasoning.unshift(`Regarding "${scenarioWords}...", a thorough ${type} perspective has been applied.`)

    // Calculate confidence based on relevance and data available
    const baseConfidence = 60 + (relevanceScore * 5)
    const confidence = Math.min(95, Math.max(55, baseConfidence + (Math.random() * 20 - 10)))

    const conclusion = stance === 'support'
        ? template.supportConclusion
        : stance === 'oppose'
            ? template.opposeConclusion
            : template.neutralConclusion

    return {
        type,
        title: template.title,
        icon: template.icon,
        reasoning,
        conclusion,
        confidence: Math.round(confidence),
        stance,
    }
}

function synthesizeConsensus(perspectives: Perspective[], input: DecisionInput): ConsensusResult {
    const stances = perspectives.map(p => p.stance)
    const supportCount = stances.filter(s => s === 'support').length
    const opposeCount = stances.filter(s => s === 'oppose').length

    // Determine overall recommendation
    let recommendation: string

    if (supportCount >= 3) {
        recommendation = 'Proceed with implementation. Strong consensus supports this decision across multiple analytical dimensions.'
    } else if (opposeCount >= 3) {
        recommendation = 'Reconsider this approach. Multiple perspectives raise significant concerns that warrant addressing before proceeding.'
    } else if (supportCount > opposeCount) {
        recommendation = 'Proceed with caution. While the balance favors action, address the concerns raised by dissenting perspectives.'
    } else if (opposeCount > supportCount) {
        recommendation = 'Delay and gather more information. Concerns outweigh support; consider alternatives or modifications.'
    } else {
        recommendation = 'This decision requires careful deliberation. The perspectives are balanced, suggesting multiple valid paths forward.'
    }


    // Calculate consensus confidence
    const avgConfidence = perspectives.reduce((sum, p) => sum + p.confidence, 0) / perspectives.length
    const confidenceAdjustment = Math.abs(supportCount - opposeCount) * 5
    const confidence = Math.min(90, Math.round(avgConfidence - 10 + confidenceAdjustment))

    // Generate summary
    const summary = `After analyzing the scenario "${input.scenario.slice(0, 50)}..." through four distinct lenses, ` +
        `${supportCount} perspective(s) support proceeding, ${opposeCount} recommend against, and ` +
        `${4 - supportCount - opposeCount} remain neutral. ` +
        `The overall confidence in this synthesis is ${confidence}%.`

    // Identify agreements
    const agreements: string[] = []
    if (perspectives.every(p => p.confidence > 60)) {
        agreements.push('All perspectives have moderate to high confidence in their analysis.')
    }
    if (supportCount + opposeCount === 4) {
        agreements.push('All perspectives take a definitive stance on this decision.')
    }
    agreements.push('The decision warrants careful consideration of stakeholder impacts.')
    agreements.push('Proper implementation planning is essential regardless of the path chosen.')

    // Identify disagreements
    const disagreements: string[] = []
    if (supportCount > 0 && opposeCount > 0) {
        const supporting = perspectives.filter(p => p.stance === 'support').map(p => p.title)
        const opposing = perspectives.filter(p => p.stance === 'oppose').map(p => p.title)
        disagreements.push(`${supporting.join(' and ')} favor proceeding, while ${opposing.join(' and ')} advise caution.`)
    }
    if (perspectives.some(p => p.confidence > 80) && perspectives.some(p => p.confidence < 70)) {
        disagreements.push('Confidence levels vary significantly across perspectives.')
    }
    if (disagreements.length === 0) {
        disagreements.push('Minor variations exist in emphasis and priority weighting.')
    }

    // Generate tradeoffs
    const tradeoffs: Tradeoff[] = [
        {
            factor: 'Speed vs. Thoroughness',
            proArgument: 'Quick action may capture time-sensitive opportunities.',
            conArgument: 'Rushed decisions may overlook critical factors.',
            weight: input.urgency === 'high' ? 'high' : 'medium',
        },
        {
            factor: 'Innovation vs. Stability',
            proArgument: 'New approaches can yield significant competitive advantages.',
            conArgument: 'Proven methods carry lower implementation risk.',
            weight: 'medium',
        },
        {
            factor: 'Short-term Costs vs. Long-term Benefits',
            proArgument: 'Investment now may yield substantial future returns.',
            conArgument: 'Resources committed now reduce flexibility for other opportunities.',
            weight: 'high',
        },
        {
            factor: 'Stakeholder Interests',
            proArgument: 'Primary stakeholders stand to gain significantly.',
            conArgument: 'Secondary stakeholders may experience negative effects.',
            weight: input.stakeholders.split(',').length > 2 ? 'high' : 'medium',
        },
    ]

    return {
        recommendation,
        confidence,
        summary,
        agreements,
        disagreements,
        tradeoffs,
    }
}

export function generateDecisionAnalysis(input: DecisionInput): AnalysisResult {
    // Analyze scenario relevance for each perspective
    const relevanceScores = analyzeScenario(input)

    // Generate each perspective
    const perspectives: Perspective[] = [
        generatePerspective('risk', input, relevanceScores.risk),
        generatePerspective('impact', input, relevanceScores.impact),
        generatePerspective('cost', input, relevanceScores.cost),
        generatePerspective('ethics', input, relevanceScores.ethics),
    ]

    // Synthesize consensus
    const consensus = synthesizeConsensus(perspectives, input)

    return { perspectives, consensus }
}

// Example decisions for landing page
export const exampleDecisions = [
    {
        title: 'Remote Work Policy',
        scenario: 'Should we transition to a hybrid remote work model permanently?',
        perspectives: [
            { type: 'risk' as PerspectiveType, stance: 'neutral' as const, summary: 'Productivity monitoring challenges exist but are manageable.' },
            { type: 'impact' as PerspectiveType, stance: 'support' as const, summary: 'Employee satisfaction and work-life balance improve significantly.' },
            { type: 'cost' as PerspectiveType, stance: 'support' as const, summary: 'Office space reduction yields substantial savings.' },
            { type: 'ethics' as PerspectiveType, stance: 'support' as const, summary: 'Promotes inclusivity and accessibility for diverse workforce.' },
        ],
        consensus: 'Proceed with hybrid model implementation with clear guidelines.',
    },
    {
        title: 'AI Integration',
        scenario: 'Should we integrate AI-powered automation into customer service?',
        perspectives: [
            { type: 'risk' as PerspectiveType, stance: 'neutral' as const, summary: 'Technical reliability and customer acceptance are key concerns.' },
            { type: 'impact' as PerspectiveType, stance: 'support' as const, summary: '24/7 availability dramatically improves customer experience.' },
            { type: 'cost' as PerspectiveType, stance: 'support' as const, summary: 'Long-term efficiency gains offset initial investment.' },
            { type: 'ethics' as PerspectiveType, stance: 'oppose' as const, summary: 'Job displacement concerns require thoughtful transition plans.' },
        ],
        consensus: 'Implement with human oversight and worker reskilling programs.',
    },
    {
        title: 'Market Expansion',
        scenario: 'Should we expand into the European market this quarter?',
        perspectives: [
            { type: 'risk' as PerspectiveType, stance: 'oppose' as const, summary: 'Regulatory complexity and currency volatility pose challenges.' },
            { type: 'impact' as PerspectiveType, stance: 'support' as const, summary: 'Access to 450M consumers with high purchasing power.' },
            { type: 'cost' as PerspectiveType, stance: 'neutral' as const, summary: 'Significant upfront investment with uncertain timeline to profitability.' },
            { type: 'ethics' as PerspectiveType, stance: 'support' as const, summary: 'Diverse market presence builds organizational resilience.' },
        ],
        consensus: 'Consider phased entry starting with select countries.',
    },
]
