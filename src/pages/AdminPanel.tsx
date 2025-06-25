
import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Languages, Settings } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import TranslationManager from '@/components/admin/TranslationManager';

const AdminPanel = () => {
  const { isAdmin, loading } = useUserRole();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Se verifică permisiunile...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-8 h-8" />
              Panou de Administrare
            </h1>
            <p className="text-gray-600 mt-2">
              Administrează aplicația și gestionează setările sistemului.
            </p>
          </div>

          <Tabs defaultValue="translations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="translations" className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Traduceri
              </TabsTrigger>
              <TabsTrigger value="tests" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Teste
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Utilizatori
              </TabsTrigger>
            </TabsList>

            <TabsContent value="translations">
              <TranslationManager />
            </TabsContent>

            <TabsContent value="tests">
              <Card>
                <CardHeader>
                  <CardTitle>Gestionare Teste</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Funcționalitate în dezvoltare pentru gestionarea testelor.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestionare Utilizatori</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Funcționalitate în dezvoltare pentru gestionarea utilizatorilor.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
