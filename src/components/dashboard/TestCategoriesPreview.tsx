
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';

const TestCategoriesPreview = () => {
  const { t, language } = useLanguage();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['test-categories-preview', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_categories')
        .select(`
          id,
          name,
          description,
          icon,
          test_types (
            id
          )
        `);

      if (error) throw error;

      return data.map(category => ({
        id: category.id,
        name: category.name, // Use the same name for both languages for now
        description: category.description,
        icon: category.icon,
        testCount: category.test_types?.length || 0
      }));
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <span>{t('dashboard.testCategories')}</span>
        </CardTitle>
        <CardDescription>
          {t('dashboard.exploreCategories')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories?.slice(0, 4).map((category) => (
            <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <span className="text-lg">{category.icon || '📊'}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    {category.testCount} {category.testCount === 1 ? t('dashboard.categories.testLabel') : t('dashboard.categories.testsLabel')}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/tests">
            <Button variant="outline" className="w-full">
              {t('dashboard.seeAllTests')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCategoriesPreview;
