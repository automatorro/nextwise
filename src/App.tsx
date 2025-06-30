
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./pages/Dashboard";
import TestsPage from "./pages/TestsPage";
import TestRunner from "./pages/TestRunner";
import TestResult from "./pages/TestResult";
import MyPage from "./pages/MyPage";
import CareerPaths from "./pages/CareerPaths";
import SubscriptionPage from "./pages/SubscriptionPage";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/tests" element={
                  <ProtectedRoute>
                    <TestsPage />
                  </ProtectedRoute>
                } />
                <Route path="/test/:testId" element={
                  <ProtectedRoute>
                    <TestRunner />
                  </ProtectedRoute>
                } />
                <Route path="/test-result/:resultId" element={
                  <ProtectedRoute>
                    <TestResult />
                  </ProtectedRoute>
                } />
                <Route path="/my-profile" element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                } />
                <Route path="/career-paths" element={
                  <ProtectedRoute>
                    <CareerPaths />
                  </ProtectedRoute>
                } />
                <Route path="/career-paths/plan/:planId" element={
                  <ProtectedRoute>
                    <CareerPaths />
                  </ProtectedRoute>
                } />
                <Route path="/subscription" element={
                  <ProtectedRoute>
                    <SubscriptionPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
