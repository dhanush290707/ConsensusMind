import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import NewDecision from './pages/NewDecision'
import DecisionResult from './pages/DecisionResult'
import DecisionHistory from './pages/DecisionHistory'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/new-decision"
                        element={
                            <ProtectedRoute>
                                <NewDecision />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/decision/:id"
                        element={
                            <ProtectedRoute>
                                <DecisionResult />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <DecisionHistory />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </>
    )
}

export default App