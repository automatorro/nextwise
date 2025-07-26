
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
      
      // Enhanced descriptions for uniform card layout
      const enhanceDescription = (testName: string, originalDescription: string) => {
        const descriptions: Record<string, { ro: string; en: string }> = {
          'Watson-Glaser': {
            ro: 'Evaluează gândirea critică prin analiza argumentelor, interpretarea informațiilor și luarea deciziilor logice. Testul măsoară capacitatea de a evalua evidențele și de a trage concluzii valide în situații complexe profesionale. Perfect pentru pozții care necesită analiză și decizie.',
            en: 'Evaluates critical thinking through argument analysis, information interpretation, and logical decision-making. The test measures the ability to evaluate evidence and draw valid conclusions in complex professional situations. Perfect for positions requiring analysis and decision-making skills.'
          },
          'Big Five': {
            ro: 'Analizează cele cinci dimensiuni fundamentale ale personalității: Extraversiunea, Agreabilitatea, Conștiinciozitatea, Nevroticismul și Deschiderea către experiență. Oferă o imagine completă și precisă a trăsăturilor tale de personalitate, fiind cel mai utilizat model în psihologia modernă.',
            en: 'Analyzes the five fundamental dimensions of personality: Extraversion, Agreeableness, Conscientiousness, Neuroticism, and Openness to experience. Provides a complete and precise picture of your personality traits, being the most widely used model in modern psychology.'
          },
          'HEXACO': {
            ro: 'Măsoară șase dimensiuni ale personalității incluzând Onestitatea-Umilința ca factor distinct. Oferă o perspectivă comprehensivă asupra comportamentelor etice, sociale și emoționale într-un context profesional modern. Ideal pentru înțelegerea valorilor și motivațiilor profunde.',
            en: 'Measures six personality dimensions including Honesty-Humility as a distinct factor. Provides a comprehensive perspective on ethical, social, and emotional behaviors in a modern professional context. Ideal for understanding deep values and motivations.'
          },
          'DISC': {
            ro: 'Identifică stilul tău comportamental dominant prin analiza a patru dimensiuni: Dominanță, Influență, Stabilitate și Conformitate. Util pentru dezvoltarea echipelor și îmbunătățirea comunicării în mediul profesional. Te ajută să înțelegi cum interacționezi cu ceilalți și cum abordezi situațiile de lucru.',
            en: 'Identifies your dominant behavioral style through analysis of four dimensions: Dominance, Influence, Steadiness, and Compliance. Useful for team development and improving communication in professional environments. Helps you understand how you interact with others and approach work situations.'
          },
          'Enneagram': {
            ro: 'Descoperă unul dintre cele nouă tipuri de personalitate Enneagram, fiecare cu motivații, frici și strategii distincte. Oferă insight-uri profunde pentru dezvoltarea personală și înțelegerea relațiilor interpersonale. Un instrument puternic pentru autocunoaștere și creștere personală.',
            en: 'Discover one of nine Enneagram personality types, each with distinct motivations, fears, and strategies. Provides deep insights for personal development and understanding interpersonal relationships. A powerful tool for self-awareness and personal growth.'
          },
          'Belbin': {
            ro: 'Identifică rolurile tale preferate în echipă dintre cele nouă roluri Belbin. Ajută la formarea echipelor echilibrate și la maximizarea eficienței collaborative în proiecte și organizații. Essential pentru manageri și lideri de echipă care vor să optimizeze performanța grupului.',
            en: 'Identifies your preferred team roles among the nine Belbin roles. Helps form balanced teams and maximize collaborative efficiency in projects and organizations. Essential for managers and team leaders who want to optimize group performance.'
          },
          'Competențe Manageriale': {
            ro: 'Evaluează competențele manageriale prin scenarii de judecată situațională. Testul măsoară abilitățile de leadership, luarea deciziilor și gestionarea echipei în diverse contexte profesionale. Ideal pentru manageri actuali sau aspiranți care vor să-și dezvolte competențele de conducere.',
            en: 'Evaluates managerial competencies through situational judgment scenarios. The test measures leadership abilities, decision-making, and team management in various professional contexts. Ideal for current or aspiring managers who want to develop their leadership skills.'
          },
          'Percepție Senzorială': {
            ro: 'Evaluează modul de procesare a informațiilor senzoriale și capacitatea de a interpreta stimulii din mediul înconjurător. Testul analizează acuitatea perceptuală și abilitatea de discriminare vizuală, fiind util în domeniile care necesită atenție la detalii și procesare rapidă a informațiilor vizuale.',
            en: 'Evaluates sensory information processing and the ability to interpret environmental stimuli. The test analyzes perceptual acuity and visual discrimination ability, being useful in fields requiring attention to detail and rapid visual information processing.'
          }
        };

        // Find matching description based on test name
        for (const [key, desc] of Object.entries(descriptions)) {
          if (testName.toLowerCase().includes(key.toLowerCase()) || 
              testName.toLowerCase().includes(key.replace('-', '').toLowerCase()) ||
              testName.toLowerCase().includes(key.replace(' ', '').toLowerCase())) {
            return desc.ro; // Return Romanian description by default
          }
        }
        
        // If no match found, create a standardized description
        return 'Test psihologic validat științific care oferă insight-uri valoroase despre personalitatea și competențele tale. Rezultatele includ analize detaliate și recomandări personalizate pentru dezvoltarea ta profesională și personală. Un instrument esențial pentru autocunoaștere și progres.';
      };
      
      // Transform data to match expected interface
      const transformedTests = data?.map(test => ({
        id: test.id,
        name: test.name,
        description: enhanceDescription(test.name, test.description),
        category: test.test_categories?.name || '',
        duration: test.estimated_duration || 15,
        questions_count: test.questions_count || 20,
        difficulty: 'Medium', // Default since not in database
        created_at: test.created_at || '',
        updated_at: test.created_at || ''
      })) || [];
      
      console.log('Transformed tests:', transformedTests);
      
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

        {/* Tests Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                  <Badge variant="outline">{test.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-1">{test.description}</p>
                
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
                  className="w-full mt-auto"
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
