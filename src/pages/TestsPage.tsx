
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Brain, Users, Heart, TrendingUp, Search, Eye, Monitor } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

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
  const navigate = useNavigate();
  const { language } = useLanguage();

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
      
      console.log('=== DEBUGGING WATSON-GLASER TEST ===');
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
      
      // Search for Watson-Glaser specifically
      const watsonTests = transformedTests.filter(t => 
        t.name.toLowerCase().includes('watson') ||
        t.name.toLowerCase().includes('glaser') ||
        t.name.toLowerCase().includes('critical') ||
        t.name.toLowerCase().includes('critic')
      );
      
      console.log('Watson-Glaser related tests found:', watsonTests.length);
      watsonTests.forEach(test => {
        console.log(`- Test: "${test.name}" (ID: ${test.id})`);
        console.log(`  Category: ${test.category}`);
        console.log(`  Description: ${test.description}`);
        console.log(`  Duration: ${test.duration} min`);
        console.log(`  Questions: ${test.questions_count}`);
        console.log('---');
      });
      
      // Check if any test has "cognitive" in category
      const cognitiveTests = transformedTests.filter(t => 
        t.category?.toLowerCase().includes('cognitive') ||
        t.category?.toLowerCase().includes('cognitiv')
      );
      
      console.log('Tests with cognitive category:', cognitiveTests.length);
      cognitiveTests.forEach(test => {
        console.log(`- "${test.name}" (Category: ${test.category})`);
      });
      
      return transformedTests as TestType[];
    }
  });

  // Filtered tests based on search
  const filteredTests = tests?.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Personality tests
  const personalityTests = tests?.filter(test => 
    test.category?.toLowerCase().includes('personality') ||
    test.category?.toLowerCase().includes('personalitate') ||
    test.name.toLowerCase().includes('big five') ||
    test.name.toLowerCase().includes('hexaco') ||
    test.name.toLowerCase().includes('enneagram') ||
    test.name.toLowerCase().includes('disc') ||
    test.name.toLowerCase().includes('belbin') ||
    test.name.toLowerCase().includes('cattell')
  ) || [];

  // Cognitive tests - Enhanced filtering
  const cognitiveTests = tests?.filter(test => {
    const name = test.name.toLowerCase();
    const category = test.category?.toLowerCase() || '';
    const description = test.description?.toLowerCase() || '';
    
    return (
      category.includes('cognitive') ||
      category.includes('cognitiv') ||
      name.includes('cognitive') ||
      name.includes('cognitiv') ||
      name.includes('watson') ||
      name.includes('glaser') ||
      name.includes('critical thinking') ||
      name.includes('aptitudini cognitive') ||
      name.includes('watson-glaser') ||
      name.includes('gândire critică') ||
      name.includes('gandire critica') ||
      name.includes('raționament critic') ||
      name.includes('rationament critic') ||
      description.includes('critical') ||
      description.includes('critic') ||
      description.includes('reasoning') ||
      description.includes('raționament')
    );
  }) || [];

  // Emotional tests
  const emotionalTests = tests?.filter(test => 
    test.category?.toLowerCase().includes('emotional') ||
    test.category?.toLowerCase().includes('emotiona') ||
    test.name.toLowerCase().includes('emotional intelligence') ||
    test.name.toLowerCase().includes('inteligenta emotionala') ||
    test.name.toLowerCase().includes('eq') ||
    test.name.toLowerCase().includes('gad') ||
    test.name.toLowerCase().includes('beck') ||
    test.name.toLowerCase().includes('anxiety') ||
    test.name.toLowerCase().includes('depression')
  ) || [];

  // Career tests
  const careerTests = tests?.filter(test => 
    test.category?.toLowerCase().includes('career') ||
    test.category?.toLowerCase().includes('cariera') ||
    test.name.toLowerCase().includes('sjt') ||
    test.name.toLowerCase().includes('situational') ||
    test.name.toLowerCase().includes('situational judgment') ||
    test.name.toLowerCase().includes('professional') ||
    test.name.toLowerCase().includes('aptitudini profesionale')
  ) || [];

  const perceptionTests = tests?.filter(test => 
    test.category?.toLowerCase().includes('perception') ||
    test.category?.toLowerCase().includes('perceptie') ||
    test.name.toLowerCase().includes('perception') ||
    test.name.toLowerCase().includes('perceptie')
  ) || [];

  const digitalTests = tests?.filter(test => 
    test.category?.toLowerCase().includes('digital') ||
    test.name.toLowerCase().includes('digital') ||
    test.name.toLowerCase().includes('competenta digitala') ||
    test.name.toLowerCase().includes('competente digitale')
  ) || [];

  // Collect all categorized tests
  const categorizedTests = [
    ...personalityTests,
    ...cognitiveTests,
    ...emotionalTests,
    ...careerTests,
    ...perceptionTests,
    ...digitalTests
  ];

  // Uncategorized tests
  const uncategorizedTests = tests?.filter(test => 
    !categorizedTests.some(catTest => catTest.id === test.id)
  ) || [];

  // Enhanced debug logging
  console.log('=== CATEGORIZATION RESULTS ===');
  console.log('Cognitive tests found:', cognitiveTests.length);
  console.log('Cognitive test names:', cognitiveTests.map(t => t.name));
  console.log('Uncategorized tests found:', uncategorizedTests.length);
  console.log('Uncategorized test names:', uncategorizedTests.map(t => t.name));
  console.log('Total categorized tests:', categorizedTests.length);
  console.log('Total tests:', tests?.length || 0);

  const categoryDescriptions = {
    personality: {
      ro: 'Testele de personalitate evaluează trăsăturile, comportamentele și preferințele tale psihologice.',
      en: 'Personality tests evaluate your psychological traits, behaviors, and preferences.'
    },
    cognitive: {
      ro: 'Testele cognitive măsoară abilitățile tale de gândire, raționament și rezolvare a problemelor.',
      en: 'Cognitive tests measure your thinking abilities, reasoning, and problem-solving skills.'
    },
    emotional: {
      ro: 'Testele emoționale evaluează capacitatea ta de a înțelege și gestiona emoțiile.',
      en: 'Emotional tests evaluate your ability to understand and manage emotions.'
    },
    career: {
      ro: 'Testele de carieră te ajută să îți identifici potențialul profesional și preferințele de lucru.',
      en: 'Career tests help you identify your professional potential and work preferences.'
    },
    perception: {
      ro: 'Testele de percepție evaluează capacitatea ta de a procesa informații vizuale și senzoriale.',
      en: 'Perception tests evaluate your ability to process visual and sensory information.'
    },
    digital: {
      ro: 'Testele de competențe digitale evaluează cunoștințele tale în domeniul tehnologiei.',
      en: 'Digital competency tests evaluate your knowledge in technology.'
    }
  };

  const handleTestClick = (testId: string) => {
    navigate(`/test/${testId}`);
  };

  const TestCard = ({ test }: { test: TestType }) => (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleTestClick(test.id)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {test.difficulty || 'Medium'}
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{test.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{test.duration} min</span>
          <span>{test.questions_count} {language === 'ro' ? 'întrebări' : 'questions'}</span>
        </div>
        
        <Button 
          className="w-full mt-4" 
          onClick={(e) => {
            e.stopPropagation();
            handleTestClick(test.id);
          }}
        >
          {language === 'ro' ? 'Începe testul' : 'Start test'}
        </Button>
      </CardContent>
    </Card>
  );

  if (isLoading) return <div className="text-center py-8">Loading tests...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading tests</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'ro' ? 'Teste Psihometrice' : 'Psychometric Tests'}
        </h1>
        
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={language === 'ro' ? 'Caută teste...' : 'Search tests...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">
            {language === 'ro' ? 'Toate' : 'All'} ({filteredTests.length})
          </TabsTrigger>
          <TabsTrigger value="personality">
            <Heart className="h-4 w-4 mr-2" />
            {language === 'ro' ? 'Personalitate' : 'Personality'} ({personalityTests.length})
          </TabsTrigger>
          <TabsTrigger value="cognitive">
            <Brain className="h-4 w-4 mr-2" />
            {language === 'ro' ? 'Cognitive' : 'Cognitive'} ({cognitiveTests.length})
          </TabsTrigger>
          <TabsTrigger value="emotional">
            <Heart className="h-4 w-4 mr-2" />
            {language === 'ro' ? 'Emoțional' : 'Emotional'} ({emotionalTests.length})
          </TabsTrigger>
          <TabsTrigger value="career">
            <TrendingUp className="h-4 w-4 mr-2" />
            {language === 'ro' ? 'Carieră' : 'Career'} ({careerTests.length})
          </TabsTrigger>
          <TabsTrigger value="perception">
            <Eye className="h-4 w-4 mr-2" />
            {language === 'ro' ? 'Percepție' : 'Perception'} ({perceptionTests.length})
          </TabsTrigger>
          <TabsTrigger value="digital">
            <Monitor className="h-4 w-4 mr-2" />
            {language === 'ro' ? 'Digital' : 'Digital'} ({digitalTests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="personality" className="space-y-6">
          <div className="mb-4">
            <p className="text-gray-600">
              {categoryDescriptions.personality[language as keyof typeof categoryDescriptions.personality]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalityTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cognitive" className="space-y-6">
          <div className="mb-4">
            <p className="text-gray-600">
              {categoryDescriptions.cognitive[language as keyof typeof categoryDescriptions.cognitive]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cognitiveTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emotional" className="space-y-6">
          <div className="mb-4">
            <p className="text-gray-600">
              {categoryDescriptions.emotional[language as keyof typeof categoryDescriptions.emotional]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emotionalTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="career" className="space-y-6">
          <div className="mb-4">
            <p className="text-gray-600">
              {categoryDescriptions.career[language as keyof typeof categoryDescriptions.career]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="perception" className="space-y-6">
          <div className="mb-4">
            <p className="text-gray-600">
              {categoryDescriptions.perception[language as keyof typeof categoryDescriptions.perception]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perceptionTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="digital" className="space-y-6">
          <div className="mb-4">
            <p className="text-gray-600">
              {categoryDescriptions.digital[language as keyof typeof categoryDescriptions.digital]}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {uncategorizedTests.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'ro' ? 'Alte Teste' : 'Other Tests'} ({uncategorizedTests.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uncategorizedTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsPage;
