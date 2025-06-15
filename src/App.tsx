
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import AuthPage from "@/components/auth/AuthPage";
import Dashboard from "@/pages/Dashboard";
import TestsPage from "@/pages/TestsPage";
import TestRunner from "@/pages/TestRunner";
import TestResult from "@/pages/TestResult";
import SubscriptionPage from "@/pages/SubscriptionPage";
import MyPage from "@/pages/MyPage";
import CareerPaths from "@/pages/CareerPaths";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-20">
                    <Dashboard />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/teste" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-20">
                    <TestsPage />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/test/:testId" element={
                <ProtectedRoute>
                  <TestRunner />
                </ProtectedRoute>
              } />
              <Route path="/test-result/:resultId" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-20">
                    <TestResult />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/career-paths" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-20">
                    <CareerPaths />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/profil" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-20">
                    <MyPage />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/abonament" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-20">
                    <SubscriptionPage />
                  </div>
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
