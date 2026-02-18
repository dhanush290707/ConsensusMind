import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthState, LoginCredentials, SignupCredentials } from '../types/types'

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<boolean>
    signup: (credentials: SignupCredentials) => Promise<boolean>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_KEY = 'consensusmind_users'
const CURRENT_USER_KEY = 'consensusmind_current_user'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    })

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem(CURRENT_USER_KEY)
        if (storedUser) {
            const user = JSON.parse(storedUser) as User
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
            })
        } else {
            setState(prev => ({ ...prev, isLoading: false }))
        }
    }, [])

    const getUsers = (): Record<string, { user: User; password: string }> => {
        const stored = localStorage.getItem(USERS_KEY)
        return stored ? JSON.parse(stored) : {}
    }

    const saveUsers = (users: Record<string, { user: User; password: string }>) => {
        localStorage.setItem(USERS_KEY, JSON.stringify(users))
    }

    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        const users = getUsers()
        const userData = users[credentials.email]

        if (!userData || userData.password !== credentials.password) {
            return false
        }

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData.user))
        setState({
            user: userData.user,
            isAuthenticated: true,
            isLoading: false,
        })

        return true
    }

    const signup = async (credentials: SignupCredentials): Promise<boolean> => {
        const users = getUsers()

        if (users[credentials.email]) {
            return false // User already exists
        }

        const newUser: User = {
            id: crypto.randomUUID(),
            email: credentials.email,
            name: credentials.name,
            createdAt: new Date().toISOString(),
        }

        users[credentials.email] = {
            user: newUser,
            password: credentials.password,
        }

        saveUsers(users)
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))

        setState({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
        })

        return true
    }

    const logout = () => {
        localStorage.removeItem(CURRENT_USER_KEY)
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        })
    }

    return (
        <AuthContext.Provider value={{ ...state, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
