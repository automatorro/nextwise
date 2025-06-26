import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import AuthPage from '@/components/auth/AuthPage';
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
              {/* Redirect old dashboard route to home */}
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route
                path="/assessments"
                element={
                  <ProtectedRoute>
                    <TestsPage />
                  </ProtectedRoute>
                }
              />
              {/* Keep old teste route for backwards compatibility */}
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
                path="/subscription"
                element={
                  <ProtectedRoute>
                    <SubscriptionPage />
                  </ProtectedRoute>
                }
              />
              {/* Keep old abonament route for backwards compatibility */}
              <Route
                path="/abonament"
                element={
                  <ProtectedRoute>
                    <SubscriptionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/career-hub"
                element={
                  <ProtectedRoute>
                    <CareerPaths />
                  </ProtectedRoute>
                }
              />
              {/* Keep old cariere route for backwards compatibility */}
              <Route
                path="/cariere"
                element={
                  <ProtectedRoute>
                    <CareerPaths />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-profile"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              {/* Keep old profilul-meu route for backwards compatibility */}
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
