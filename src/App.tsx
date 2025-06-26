
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import AuthPage from '@/components/auth/AuthPage';
import Dashboard from '@/pages/Dashboard';
import TestsPage from '@/pages/TestsPage';
import TestRunner from '@/pages/TestRunner';
import TestResult from '@/pages/TestResult';
import SubscriptionPage from '@/pages/SubscriptionPage';
import CareerPaths from '@/pages/CareerPaths';
import MyPage from '@/pages/MyPage';
import AdminPanel from '@/pages/AdminPanel';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teste"
                element={
                  <ProtectedRoute>
                    <TestsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test/:testId"
                element={
                  <ProtectedRoute>
                    <TestRunner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test-result/:resultId"
                element={
                  <ProtectedRoute>
                    <TestResult />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/abonament"
                element={
                  <ProtectedRoute>
                    <SubscriptionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cariere"
                element={
                  <ProtectedRoute>
                    <CareerPaths />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profilul-meu"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
