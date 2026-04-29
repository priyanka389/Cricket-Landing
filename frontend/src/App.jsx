import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles/animations.css";
// 🔥 Added
import ProtectedRoute from "./admin/components/ProtectedRoute";

import Header from './sections/Header'
import LiveMatchDashboard from './sections/LiveMatchDashboard'
import SeriesStandings from './sections/SeriesStandings'

import CommunitySection from './sections/CommunitySection'
import LeadingPlayers from './sections/LeadingPlayers'
import Footer from './sections/Footer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import Dashboard from "./superadmin/Dashboard";
import UserManagement from "./superadmin/UserManagement";
import Analytics from "./superadmin/Analytics";
import Security from "./superadmin/Security";
import AdminManagement from "./superadmin/AdminManagement";
import AddAdmin from "./superadmin/AddAdmin";

// Admin Pages
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageMatches from "./admin/pages/ManageMatches";
import AddMatch from "./admin/pages/AddMatch";
import Users from "./admin/pages/Users";
import SetPassword from "./pages/SetPassword";
import LiveMatches from "./admin/pages/LiveMatches";
import ManageTeams from "./admin/pages/ManageTeams";
import ManagePlayers from "./admin/pages/ManagePlayers";
import EditMatch from './admin/pages/EditMatch';
import ManageSquad from './admin/pages/ManageSquad';
import LiveControlPanel from "./admin/pages/LiveControlPanel";
import LiveMatchControl from "./admin/pages/LiveMatchControl";
import { User } from 'lucide-react';

// 
User

import UserDashboard from "./user/pages/UserDashboard";
import UserLiveMatches from "./user/pages/UserLiveMatches";
import Watchlist from "./user/pages/Watchlist";
import Notifications from "./user/pages/Notifications";
import Profile from "./user/pages/Profile";
import Schedule from "./user/pages/Schedule";
import Subscription from "./user/pages/Subscription";
import StadiumTickets from "./user/pages/StadiumTickets";
import FantasyZone from "./user/pages/FantasyZone";
import Settings from "./user/pages/Settings";
import WatchLive from "./user/pages/WatchLive";
import PaymentSuccess from "./user/pages/PaymentSuccess";
import PaymentCancel from "./user/pages/PaymentCancel";
import BillingHistory from "./user/pages/BillingHistory";

function App() {
  const location = useLocation()

  const isAuthPage =
    location.pathname === '/signin' || location.pathname === '/signup'

  const isSuperAdminPage = location.pathname.startsWith('/superadmin')
  const isAdminPage = location.pathname.startsWith('/admin')
  const isUserPage = location.pathname.startsWith("/user")

  return (
    <GoogleOAuthProvider clientId="450077157954-16ns9qr8fcer37gp15bv8u4soa6ltmn8.apps.googleusercontent.com">
      
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-blue-50">

        {/* ❌ Header hide on auth + superadmin + admin pages */}
        {!isAuthPage && !isSuperAdminPage && !isAdminPage && !isUserPage && <Header />}

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

          {/* SUPER ADMIN */}
          <Route path="/superadmin/dashboard" element={<Dashboard />} />
          <Route path="/superadmin/users" element={<UserManagement />} />
          <Route path="/superadmin/admins" element={<AdminManagement />} />
          <Route path="/superadmin/add-admin" element={<AddAdmin />} />
          <Route path="/superadmin/security" element={<Security />} />
          <Route path="/superadmin/analytics" element={<Analytics />} />

          <Route path="/set-password/:token" element={<SetPassword />} />
          {/* user */}
         <Route path="/user/dashboard" element={<UserDashboard />} />
<Route path="/user/live" element={<UserLiveMatches />} />
<Route path="/user/watchlist" element={<Watchlist />} />
<Route path="/user/notifications" element={<Notifications />} />
<Route path="/user/profile" element={<Profile />} />
<Route path="/user/schedule" element={<Schedule />} />
<Route path="/user/subscription" element={<Subscription />} />
<Route path="/user/tickets" element={<StadiumTickets />} />
<Route
  path="/user/billing"
  element={<BillingHistory />}
/>
<Route
path="/payment-cancel"
element={<PaymentCancel />}
/>
<Route
  path="/payment-success"
  element={
    <PaymentSuccess />
  }
/>
<Route path="/user/fantasy" element={<FantasyZone />} />
<Route path="/user/settings" element={<Settings />} />
<Route
  path="/watch/:id"
  element={<WatchLive />}
/>

          

          {/* ADMIN ROUTES */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/matches"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageMatches />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-match"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddMatch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/live"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <LiveMatches />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/teams"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageTeams />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/players"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManagePlayers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-match/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditMatch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage-squad"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageSquad />
              </ProtectedRoute>
            }
          />

          {/* 🔥 LIVE CONTROL */}
          <Route
            path="/admin/live-control"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <LiveControlPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/live-control/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <LiveMatchControl />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

        </Routes>

        {/* ❌ Footer hide on auth + superadmin + admin pages */}
        {!isAuthPage && !isSuperAdminPage && !isAdminPage && !isUserPage && <Footer />}

      </div>

    </GoogleOAuthProvider>
  )
}

export default App