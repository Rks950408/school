import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Mock authentication - replace with real API call when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      // Mock user database
      const mockUsers = {
        'admin@school.com': {
          id: 1,
          name: 'System Administrator',
          email: 'admin@school.com',
          role: 'admin',
          password: 'admin123'
        },
        'teacher@school.com': {
          id: 2,
          name: 'Dr. Sarah Wilson',
          email: 'teacher@school.com',
          role: 'teacher',
          password: 'teacher123'
        },
        'student@school.com': {
          id: 3,
          name: 'John Doe',
          email: 'student@school.com',
          role: 'student',
          password: 'student123'
        }
      };

      const user = mockUsers[credentials.email];

      // Validate credentials
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      if (user.password !== credentials.password) {
        return {
          success: false,
          error: 'Invalid password'
        };
      }

      if (user.role !== credentials.role) {
        return {
          success: false,
          error: 'Invalid role selected'
        };
      }

      // Generate mock token
      const token = 'mock_jwt_token_' + Date.now();
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
