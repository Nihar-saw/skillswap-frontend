import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from './components/ErrorBoundary'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth/Auth'
import './index.css'
import './styles/app-layout.css'

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const AIWorkspace = lazy(() => import('./pages/AI/AIWorkspace'))
const Courses = lazy(() => import('./pages/Courses/Courses'))
const StudyGroups = lazy(() => import('./pages/StudyGroups/StudyGroups'))
const Communities = lazy(() => import('./pages/Communities/Communities'))
const Flashcards = lazy(() => import('./pages/Flashcards/Flashcards'))
const Notes = lazy(() => import('./pages/Notes/Notes'))
const Calendar = lazy(() => import('./pages/Calendar/Calendar'))
const Leaderboard = lazy(() => import('./pages/Leaderboard/Leaderboard'))
const Chat = lazy(() => import('./pages/Messaging/Chat'))
const Notifications = lazy(() => import('./pages/Dashboard/Notifications'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Settings = lazy(() => import('./pages/Dashboard/Settings'))
const PaymentDashboard = lazy(() => import('./pages/Dashboard/PaymentDashboard'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 30000 },
  },
})

function PageLoader() {
  return (
    <div style={{ padding: 24 }}>
      <div className="skeleton" style={{ height: 32, width: 200, marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 120, marginBottom: 12 }} />
      <div className="skeleton" style={{ height: 120 }} />
    </div>
  )
}

function LandingRoute() {
  const navigate = useNavigate()
  return <LandingPage onGetStarted={() => navigate('/auth')} />
}

function AuthRoute() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/app" replace />
  return <Auth onLoginSuccess={() => navigate('/app')} />
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/auth" element={<AuthRoute />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="ai" element={<AIWorkspace />} />
          <Route path="courses" element={<Courses />} />
          <Route path="groups" element={<StudyGroups />} />
          <Route path="communities" element={<Communities />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="notes" element={<Notes />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="messages" element={<Chat />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="wallet" element={<PaymentDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
