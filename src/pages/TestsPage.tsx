import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import HomeNavigation from '@/components/home/HomeNavigation';

interface TestType {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  questions_count: number;
  difficulty: string;
  created_at: string;
  updated_at: string;
}

const TestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  // Fetch tests from database
  const { data: tests, isLoading, error } = useQuery({
    queryKey: ['test_types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_types')
        .select(`
          *,
          test_categories (
            name,
            description
          )
        `)
        .order('name');
      
      if (error) {
        console.error('Error fetching tests:', error);
        throw error;
      }
      
      console.log('Raw test data from database:', data);
      console.log('Total tests fetched:', data?.length || 0);
      console.log('All test names:', data?.map(t => t.name) || []);
      
      // Transform data to match expected interface
      const transformedTests = data?.map(test => ({
        id: test.id,
        name: test.name,
        description: test.description || '',
        category: test.test_categories?.name || '',
        duration: test.estimated_duration || 15,
        questions_count: test.questions_count || 20,
        difficulty: 'Medium', // Default since not in database
        created_at: test.created_at || '',
        updated_at: test.created_at || ''
      })) || [];
      
      console.log('Transformed tests:', transformedTests);
      
      // Search for Watson-Glaser specifically
      const watsonTests = transformedTests.filter(t => 
        t.name.toLowerCase().includes('watson') ||
        t.name.toLowerCase().includes('glaser') ||
        t.name.toLowerCase().includes('critical') ||
        t.name.toLowerCase().includes('critic')
      );
      
      console.log('Watson-Glaser related tests found:', watsonTests.length);
      console.log('Watson-Glaser tests:', watsonTests);
      watsonTests.forEach(test => {
        console.log(`- Watson test: "${test.name}" (ID: ${test.id})`);
        console.log(`  Description: ${test.description}`);
        console.log(`  Category: ${test.category}`);
        console.log(`  Duration: ${test.duration} minutes`);
        console.log(`  Questions: ${test.questions_count}`);
      });
      
      // Check if any test has "cognitive" in category
      const cognitiveTests = transformedTests.filter(t => 
        t.category?.toLowerCase().includes('cognitive') ||
        t.category?.toLowerCase().includes('cognitiv')
      );
      
      console.log('Tests with cognitive category:', cognitiveTests.length);
      cognitiveTests.forEach(test => {
        console.log(`- Cognitive test: "${test.name}" (Category: ${test.category})`);
      });
      
      return transformedTests as TestType[];
    }
  });

  // Filter tests based on search and category
  const filteredTests = tests?.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  // Get unique categories
  const categories = ['all', ...new Set(tests?.map(test => test.category) || [])];

  const handleStartTest = (testId: string) => {
    navigate(`/test/${testId}`);
  };

  if (isLoading) return <div>Loading tests...</div>;
  if (error) return <div>Error loading tests: {error.message}</div>;

  return (
    <>
      <HomeNavigation />
      <div className="container mx-auto p-6 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Teste Psihologice</h1>
          <p className="text-gray-600">Descoperă-ți personalitatea și competențele cu testele noastre validate științific</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Caută teste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Toate' : category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Watson-Glaser Debug Info */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Debug Info:</h3>
          <p className="text-sm text-blue-700">
            Total tests loaded: {tests?.length || 0}
          </p>
          <p className="text-sm text-blue-700">
            Tests after filtering: {filteredTests.length}
          </p>
          <p className="text-sm text-blue-700">
            Watson-Glaser tests: {tests?.filter(t => 
              t.name.toLowerCase().includes('watson') ||
              t.name.toLowerCase().includes('glaser') ||
              t.name.toLowerCase().includes('critical')
            ).length || 0}
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                  <Badge variant="outline">{test.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">{test.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration} minute</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{test.questions_count} întrebări</span>
                  </div>
                </div>

                <Button 
                  onClick={() => handleStartTest(test.id)}
                  className="w-full"
                >
                  Începe testul
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nu s-au găsit teste care să corespundă criteriilor de căutare.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TestsPage;
