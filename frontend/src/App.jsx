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
import Dashboard from "./superadmin/Dashboard";
import UserManagement from "./superadmin/UserManagement";
// import AdminManagement from "./superadmin/AdminManagement";
import Analytics from "./superadmin/Analytics";
import Security from "./superadmin/Security";
import AdminManagement from "./superadmin/AdminManagement";
import AddAdmin from "./superadmin/AddAdmin";

function App() {
  const location = useLocation()

  // 👇 signin + signup dono hide
  const isAuthPage =
    location.pathname === '/signin' || location.pathname === '/signup'

     // 👇 NEW: superadmin pages detect
  const isSuperAdminPage = location.pathname.startsWith('/superadmin')

  return (
    <div className="min-h-screen bg-primary">

     
      {/* ❌ Header hide on auth + superadmin pages */}
      {!isAuthPage && !isSuperAdminPage && <Header />}

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
        <Route path="/superadmin/dashboard" element={<Dashboard />} />
        {/* <Route path="/superadmin" element={<Dashboard />} /> */}
<Route path="/superadmin/users" element={<UserManagement />} />
<Route path="/superadmin/admins" element={<AdminManagement />} />
<Route path="/superadmin/add-admin" element={<AddAdmin />} />
<Route path="/superadmin/security" element={<Security />} />
<Route path="/superadmin/analytics" element={<Analytics />} />
      </Routes>

      {/* ❌ Footer hide on auth + superadmin pages */}
      {!isAuthPage && !isSuperAdminPage && <Footer />}
    </div>
  )
}

export default App