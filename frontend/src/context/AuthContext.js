import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: localStorage.getItem('dharva_token') || null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return { ...initialState, isLoading: false, token: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    default:
      return state;
  }
};

const API_BASE = '/api/v1';

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth header
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('dharva_token');
      if (!token) {
        dispatch({ type: 'AUTH_FAIL', payload: null });
        return;
      }
      setAuthHeader(token);
      try {
        const res = await axios.get(`${API_BASE}/auth/me`);
        dispatch({ type: 'SET_USER', payload: res.data.user });
      } catch {
        localStorage.removeItem('dharva_token');
        setAuthHeader(null);
        dispatch({ type: 'AUTH_FAIL', payload: null });
      }
    };
    loadUser();
  }, []);

  const register = useCallback(async (formData) => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, formData);
      const { token, user } = res.data;
      localStorage.setItem('dharva_token', token);
      setAuthHeader(token);
      dispatch({ type: 'AUTH_SUCCESS', payload: { token, user } });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed';
      dispatch({ type: 'AUTH_FAIL', payload: msg });
      return { success: false, error: msg };
    }
  }, []);

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'AUTH_LOADING' });
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      const { token, user } = res.data;
      localStorage.setItem('dharva_token', token);
      setAuthHeader(token);
      dispatch({ type: 'AUTH_SUCCESS', payload: { token, user } });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || 'Invalid credentials';
      dispatch({ type: 'AUTH_FAIL', payload: msg });
      return { success: false, error: msg };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('dharva_token');
    setAuthHeader(null);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearError = useCallback(() => dispatch({ type: 'CLEAR_ERROR' }), []);

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
