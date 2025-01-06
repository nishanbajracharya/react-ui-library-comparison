import { Router } from 'wouter';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useHashLocation } from 'wouter/use-hash-location';

import './assets/styles/index.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router hook={useHashLocation}>
      <App />
    </Router>
  </StrictMode>,
);
