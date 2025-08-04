
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TestResult {
  id: string;
  score: any;
  completed_at: string;
  test_types: {
    name: string;
    description: string;
  };
}

interface RecentTestResultsProps {
  testResults: TestResult[];
}

const RecentTestResults = ({ testResults }: RecentTestResultsProps) => {
  const navigate = useNavigate();

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Rezultatele Testelor Recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {testResults && testResults.length > 0 ? (
          <div className="space-y-4">
            {testResults.slice(0, 6).map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/test-result/${result.id}`)}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {result.test_types.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(result.completed_at).toLocaleDateString('ro-RO')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getScoreBadgeVariant(result.score?.overall || 0)}>
                    {result.score?.overall || 0}%
                  </Badge>
                </div>
              </div>
            ))}
            {testResults.length > 6 && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/tests')}
              >
                Vezi Toate Rezultatele
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Niciun test completat
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Începe cu primul tău test pentru a vedea rezultatele aici.
            </p>
            <div className="mt-6">
              <Button onClick={() => navigate('/tests')}>
                Încearcă un Test
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTestResults;
