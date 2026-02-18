import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { DecisionProvider } from './context/DecisionContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/ConsensusMind">
            <AuthProvider>
                <DecisionProvider>
                    <App />
                </DecisionProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
