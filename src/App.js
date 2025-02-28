import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import CohortStudent from './pages/cohortStudent';
import Login from './pages/login';
import Register from './pages/register';
import Loading from './pages/loading';
import Notes from './pages/notes';
import Welcome from './pages/welcome';
import Verification from './pages/verification';
import { AuthProvider, ProtectedRoute } from './context/auth';
import { ModalProvider } from './context/modal';
import { UserProvider } from './context/user';

const App = () => {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <ModalProvider>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="loading" element={<Loading />} />
              <Route path="verification" element={<Verification />} />

              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                index
                path="cohort"
                element={
                  <ProtectedRoute>
                    <CohortStudent />
                  </ProtectedRoute>
                }
              />
              <Route
                index
                path="notes"
                element={
                  <ProtectedRoute requiredRole="TEACHER">
                    <Notes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="welcome"
                element={
                  <ProtectedRoute disabledNav={true}>
                    <Welcome />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ModalProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
};

export default App;
