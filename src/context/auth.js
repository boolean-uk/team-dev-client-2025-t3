/* eslint-disable camelcase */
import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { createProfile, login, register } from '../service/apiClient';
import useAuth from '../hooks/useAuth';
import Header from '../components/header';
import Modal from '../components/modal';
import Navigation from '../components/navigation';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      const decodedUser = jwt_decode(storedToken);
      setUser(decodedUser);
      navigate(location?.pathname || '/');
    }
  }, [location?.pathname, navigate]);

  const handleLogin = async (email, password) => {
    const res = await login(email, password);

    if (!res.data.token) {
      return navigate('/login');
    }

    localStorage.setItem('token', res.data.token);

    setToken(res.data.token);
    const decodedUser = jwt_decode(res.data.token);
    setUser(decodedUser);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const handleRegister = async (email, password) => {
    const res = await register(email, password);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    const decodedUser = jwt_decode(res.data.token);
    setUser(decodedUser);
    navigate('/verification');
  };

  const handleCreateProfile = async (
    firstName,
    lastName,
    githubUrl,
    bio,
    email,
    mobile,
    role,
    specialism,
    cohort,
    startDate,
    endDate
  ) => {
    const { userId } = jwt_decode(token);

    await createProfile(
      userId,
      firstName,
      lastName,
      githubUrl,
      bio,
      email,
      mobile,
      role,
      specialism,
      cohort,
      startDate,
      endDate
    );

    localStorage.setItem('token', token);
    navigate('/');
  };

  const value = {
    token,
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

export { AuthContext, AuthProvider, ProtectedRoute };
