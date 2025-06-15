
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSubscription } from '@/hooks/useSubscription';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Calendar, CreditCard, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';

const SubscriptionPage = () => {
  const { subscription, loading, checkSubscription, openCustomerPortal, getTestsLimit, getRemainingTests } = useSubscription();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success) {
      toast({
        title: "Abonament activat!",
        description: "Plata a fost procesată cu succes. Abonamentul tău este acum activ."
      });
      // Refresh subscription data
      setTimeout(checkSubscription, 2000);
    }

    if (canceled) {
      toast({
        title: "Plata anulată",
        description: "Procesul de plată a fost anulat. Poți încerca din nou oricând.",
        variant: "destructive"
      });
    }
  }, [searchParams, toast, checkSubscription]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('ro-RO');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-red-500';
      case 'cancelled':
        return 'bg-gray-500';
      case 'past_due':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activ';
      case 'inactive':
        return 'Inactiv';
      case 'cancelled':
        return 'Anulat';
      case 'past_due':
        return 'Întârziat';
      default:
        return 'Necunoscut';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Se încarcă informațiile despre abonament...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Management Abonament
          </h1>
          <p className="text-gray-600">
            Gestionează-ți abonamentul și accesul la teste psihologice
          </p>
        </div>

        {/* Current Subscription Status */}
        {subscription && (
          <Card className="mb-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Abonamentul Curent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Plan:</span>
                    <Badge variant="outline" className="capitalize">
                      {subscription.subscription_type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge className={getStatusColor(subscription.status)}>
                      {getStatusText(subscription.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Testele disponibile:</span>
                    <span className="font-semibold">
                      {getRemainingTests()} / {getTestsLimit()} această lună
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {subscription.current_period_end && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Reînnoire următoare:</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(subscription.current_period_end)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={checkSubscription}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Actualizează
                    </Button>
                    
                    {subscription.subscription_type !== 'basic' && (
                      <Button
                        onClick={openCustomerPortal}
                        variant="outline"
                        size="sm"
                      >
                        Gestionează Abonamentul
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Usage Alert */}
        {subscription && getRemainingTests() <= 1 && (
          <Alert className="mb-8 max-w-4xl mx-auto">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              {getRemainingTests() === 0 
                ? "Ai epuizat toate testele pentru această lună. Consideră upgrade-ul la un plan superior."
                : "Mai ai doar 1 test disponibil pentru această lună."
              }
            </AlertDescription>
          </Alert>
        )}

        {/* Subscription Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Alege Planul Potrivit Pentru Tine
          </h2>
          <SubscriptionPlans />
        </div>

        {/* Benefits Section */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>De Ce Să Alegi Un Abonament Premium?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Teste Psihologice Avansate</h4>
                    <p className="text-sm text-gray-600">Acces la teste validate științific pentru dezvoltare personală</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Analize AI Personalizate</h4>
                    <p className="text-sm text-gray-600">Rezultate detaliate și recomandări bazate pe inteligența artificială</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Planuri de Carieră</h4>
                    <p className="text-sm text-gray-600">Ghiduri personalizate pentru dezvoltarea carierei tale</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Suport Specializat</h4>
                    <p className="text-sm text-gray-600">Acces la consiliere și suport pentru dezvoltare personală</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
