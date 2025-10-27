import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import { isAuthenticated } from './utils/auth'

function RequireAuth({children}){
  if(!isAuthenticated()) return <Navigate to="/auth/login" replace />;
  return children;
}

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/:mode" element={<Auth />} />
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/tickets" element={<RequireAuth><Tickets /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
