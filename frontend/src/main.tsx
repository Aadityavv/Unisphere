import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { setAuthToken } from './utils/api';

const token = localStorage.getItem('token');
if (token) setAuthToken(token);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
      <Toaster position="top-center" />
  </StrictMode>
);
