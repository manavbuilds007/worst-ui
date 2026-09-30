import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChaosProvider } from './hooks/useChaosState.js';
import { ChaosLayout } from './components/visual/ChaosLayout.js';
import { ErrorBoundary } from './components/visual/ErrorBoundary.js';

import { Home } from './pages/Home.js';
import { Login } from './pages/Login.js';
import { Payment } from './pages/Payment.js';
import { Tokens } from './pages/Tokens.js';
import { AI } from './pages/AI.js';
import { About } from './pages/About.js';
import { UseCases } from './pages/UseCases.js';
import { NotFound } from './pages/NotFound.js';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ChaosProvider>
        <BrowserRouter>
          <ChaosLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/tokens" element={<Tokens />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/use-cases" element={<UseCases />} />
              <Route path="/about" element={<About />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChaosLayout>
        </BrowserRouter>
      </ChaosProvider>
    </ErrorBoundary>
  );
};

export default App;
