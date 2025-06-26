
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  isAdmin: boolean;
}

const QuickActions = ({ isAdmin }: QuickActionsProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acțiuni Rapide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={() => navigate('/teste')}
          >
            Încearcă un Test Nou
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            Mergi la Dashboard
          </Button>
          {!isAdmin && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/abonament')}
            >
              Vezi Abonamentul
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
