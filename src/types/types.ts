// User Types
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

// Perspective Types
export type PerspectiveType = 'risk' | 'impact' | 'cost' | 'ethics';

export interface Perspective {
    type: PerspectiveType;
    title: string;
    icon: string;
    reasoning: string[];
    conclusion: string;
    confidence: number; // 0-100
    stance: 'support' | 'oppose' | 'neutral';
}

// Decision Types
export interface Decision {
    id: string;
    userId: string;
    scenario: string;
    category: string;
    urgency: 'low' | 'medium' | 'high';
    stakeholders: string;
    perspectives: Perspective[];
    consensus: ConsensusResult;
    createdAt: string;
}

export interface ConsensusResult {
    recommendation: string;
    confidence: number;
    summary: string;
    agreements: string[];
    disagreements: string[];
    tradeoffs: Tradeoff[];
}

export interface Tradeoff {
    factor: string;
    proArgument: string;
    conArgument: string;
    weight: 'high' | 'medium' | 'low';
}

// Form Types
export interface DecisionInput {
    scenario: string;
    category: string;
    urgency: 'low' | 'medium' | 'high';
    stakeholders: string;
}

// Auth Types
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    name: string;
    email: string;
    password: string;
}

// Example Decision for Landing Page
export interface ExampleDecision {
    title: string;
    scenario: string;
    perspectives: {
        type: PerspectiveType;
        stance: 'support' | 'oppose' | 'neutral';
        summary: string;
    }[];
    consensus: string;
}
