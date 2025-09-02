import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Classes from './components/Classes';
import Fees from './components/Fees';
import Attendance from './components/Attendance';
import Exams from './components/Exams';
import Notifications from './components/Notifications';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard - accessible to all authenticated users */}
              <Route path="dashboard" element={<Dashboard />} />

              {/* Students - accessible to admin and teachers */}
              <Route
                path="students"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                    <Students />
                  </ProtectedRoute>
                }
              />

              {/* Teachers - accessible to admin only */}
              <Route
                path="teachers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Teachers />
                  </ProtectedRoute>
                }
              />

              {/* Classes - accessible to all authenticated users */}
              <Route path="classes" element={<Classes />} />

              {/* Fees - accessible to all authenticated users */}
              <Route path="fees" element={<Fees />} />

              {/* Attendance - accessible to all authenticated users */}
              <Route path="attendance" element={<Attendance />} />

              {/* Exams - accessible to all authenticated users */}
              <Route path="exams" element={<Exams />} />

              {/* Notifications - accessible to all authenticated users */}
              <Route path="notifications" element={<Notifications />} />

              {/* Default redirect to dashboard */}
              <Route path="" element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Catch all - redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
