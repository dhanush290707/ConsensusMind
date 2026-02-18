import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Decision, DecisionInput } from '../types/types'
import { generateDecisionAnalysis } from '../utils/decisionEngine'
import { useAuth } from './AuthContext'

interface DecisionContextType {
    decisions: Decision[]
    currentDecision: Decision | null
    isAnalyzing: boolean
    createDecision: (input: DecisionInput) => Promise<Decision>
    getDecision: (id: string) => Decision | undefined
    setCurrentDecision: (decision: Decision | null) => void
}

const DecisionContext = createContext<DecisionContextType | undefined>(undefined)

const DECISIONS_KEY = 'consensusmind_decisions'

export function DecisionProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth()
    const [decisions, setDecisions] = useState<Decision[]>([])
    const [currentDecision, setCurrentDecision] = useState<Decision | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    useEffect(() => {
        if (user) {
            const stored = localStorage.getItem(DECISIONS_KEY)
            if (stored) {
                const allDecisions: Decision[] = JSON.parse(stored)
                const userDecisions = allDecisions.filter(d => d.userId === user.id)
                setDecisions(userDecisions)
            }
        } else {
            setDecisions([])
        }
    }, [user])

    const saveDecisions = (newDecisions: Decision[]) => {
        const stored = localStorage.getItem(DECISIONS_KEY)
        const allDecisions: Decision[] = stored ? JSON.parse(stored) : []

        // Update user's decisions
        const otherDecisions = allDecisions.filter(d => d.userId !== user?.id)
        const updatedAll = [...otherDecisions, ...newDecisions]

        localStorage.setItem(DECISIONS_KEY, JSON.stringify(updatedAll))
        setDecisions(newDecisions)
    }

    const createDecision = async (input: DecisionInput): Promise<Decision> => {
        if (!user) throw new Error('User not authenticated')

        setIsAnalyzing(true)

        // Simulate analysis time for realistic UX
        await new Promise(resolve => setTimeout(resolve, 2500))

        const analysis = generateDecisionAnalysis(input)

        const decision: Decision = {
            id: crypto.randomUUID(),
            userId: user.id,
            scenario: input.scenario,
            category: input.category,
            urgency: input.urgency,
            stakeholders: input.stakeholders,
            perspectives: analysis.perspectives,
            consensus: analysis.consensus,
            createdAt: new Date().toISOString(),
        }

        const newDecisions = [decision, ...decisions]
        saveDecisions(newDecisions)
        setCurrentDecision(decision)
        setIsAnalyzing(false)

        return decision
    }

    const getDecision = (id: string) => {
        return decisions.find(d => d.id === id)
    }

    return (
        <DecisionContext.Provider
            value={{
                decisions,
                currentDecision,
                isAnalyzing,
                createDecision,
                getDecision,
                setCurrentDecision,
            }}
        >
            {children}
        </DecisionContext.Provider>
    )
}

export function useDecisions() {
    const context = useContext(DecisionContext)
    if (!context) {
        throw new Error('useDecisions must be used within a DecisionProvider')
    }
    return context
}
