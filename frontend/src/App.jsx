import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './sections/Header'
import LiveMatchDashboard from './sections/LiveMatchDashboard'
import SeriesStandings from './sections/SeriesStandings'
import LeadingPlayers from './sections/LeadingPlayers'
import CommunitySection from './sections/CommunitySection'
import Footer from './sections/Footer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  const location = useLocation()

  // 👇 signin + signup dono hide
  const isAuthPage =
    location.pathname === '/signin' || location.pathname === '/signup'

  return (
    <div className="min-h-screen bg-primary">

      {/* ❌ Header hide on auth pages */}
      {!isAuthPage && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <LiveMatchDashboard />
              <SeriesStandings />
              <LeadingPlayers />
              <CommunitySection />
            </main>
          }
        />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {/* ❌ Footer hide on auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default App