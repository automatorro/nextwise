
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
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/teste" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Pagina Teste</h1>
                    <p className="text-gray-600 mt-2">În dezvoltare...</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/career-paths" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Planuri de Carieră</h1>
                    <p className="text-gray-600 mt-2">În dezvoltare...</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/profil" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Profil Utilizator</h1>
                    <p className="text-gray-600 mt-2">În dezvoltare...</p>
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/abonament" element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Management Abonament</h1>
                    <p className="text-gray-600 mt-2">În dezvoltare...</p>
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
