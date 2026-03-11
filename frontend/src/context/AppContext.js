import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { productAPI, launchAPI, docAPI, pricingAPI } from '../utils/api';

const AppContext = createContext();

const initialState = {
  products: [],
  launches: [],
  docs: [],
  pricing: [],
  loading: true,
  error: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_LAUNCHES':
      return { ...state, launches: action.payload };
    case 'SET_DOCS':
      return { ...state, docs: action.payload };
    case 'SET_PRICING':
      return { ...state, pricing: action.payload };
    case 'DATA_LOADED':
      return { ...state, loading: false };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [productsRes, launchesRes, docsRes, pricingRes] = await Promise.allSettled([
          productAPI.getAll(),
          launchAPI.getAll(),
          docAPI.getAll(),
          pricingAPI.getAll(),
        ]);

        if (productsRes.status === 'fulfilled') dispatch({ type: 'SET_PRODUCTS', payload: productsRes.value.data });
        if (launchesRes.status === 'fulfilled') dispatch({ type: 'SET_LAUNCHES', payload: launchesRes.value.data });
        if (docsRes.status === 'fulfilled') dispatch({ type: 'SET_DOCS', payload: docsRes.value.data });
        if (pricingRes.status === 'fulfilled') dispatch({ type: 'SET_PRICING', payload: pricingRes.value.data });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      } finally {
        dispatch({ type: 'DATA_LOADED' });
      }
    };

    fetchAllData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}

export default AppContext;
