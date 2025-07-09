import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Code, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Heart, 
  Palette, 
  Wrench,
  Target,
  Sparkles
} from 'lucide-react';

interface CareerGoalSelectorProps {
  onSelectGoal: (goal: string) => void;
  isGenerating: boolean;
  children: React.ReactNode;
}

const CareerGoalSelector = ({ onSelectGoal, isGenerating, children }: CareerGoalSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customGoal, setCustomGoal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const careerCategories = [
    {
      id: 'tech',
      title: 'Technology & IT',
      icon: Code,
      color: 'bg-blue-100 text-blue-700',
      goals: [
        'Software Developer',
        'Data Scientist',
        'Product Manager',
        'DevOps Engineer',
        'UX/UI Designer',
        'Cybersecurity Specialist'
      ]
    },
    {
      id: 'business',
      title: 'Business & Management',
      icon: Briefcase,
      color: 'bg-green-100 text-green-700',
      goals: [
        'Business Analyst',
        'Project Manager',
        'Marketing Manager',
        'Sales Director',
        'Business Consultant',
        'Operations Manager'
      ]
    },
    {
      id: 'creative',
      title: 'Creative & Design',
      icon: Palette,
      color: 'bg-purple-100 text-purple-700',
      goals: [
        'Graphic Designer',
        'Content Creator',
        'Digital Marketing Specialist',
        'Brand Manager',
        'Video Producer',
        'Creative Director'
      ]
    },
    {
      id: 'education',
      title: 'Education & Training',
      icon: Users,
      color: 'bg-orange-100 text-orange-700',
      goals: [
        'Corporate Trainer',
        'Learning & Development Specialist',
        'Educational Technology Specialist',
        'Training Manager',
        'Instructional Designer',
        'HR Business Partner'
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Wellness',
      icon: Heart,
      color: 'bg-red-100 text-red-700',
      goals: [
        'Healthcare Administrator',
        'Wellness Coach',
        'Mental Health Counselor',
        'Healthcare IT Specialist',
        'Clinical Research Coordinator',
        'Health Education Specialist'
      ]
    },
    {
      id: 'engineering',
      title: 'Engineering & Technical',
      icon: Wrench,
      color: 'bg-gray-100 text-gray-700',
      goals: [
        'Mechanical Engineer',
        'Electrical Engineer',
        'Quality Assurance Engineer',
        'Systems Analyst',
        'Technical Writer',
        'Process Improvement Specialist'
      ]
    }
  ];

  const handleGoalSelect = (goal: string) => {
    onSelectGoal(goal);
    setIsOpen(false);
    setSelectedCategory(null);
    setCustomGoal('');
  };

  const handleCustomGoal = () => {
    if (customGoal.trim()) {
      handleGoalSelect(customGoal.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Select Your Career Goal</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedCategory ? (
            <>
              {/* Career Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose a career category:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {careerCategories.map((category) => (
                    <Card 
                      key={category.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            <category.icon className="w-5 h-5" />
                          </div>
                          <CardTitle className="text-sm">{category.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-xs">
                          {category.goals.slice(0, 3).join(', ')} și altele...
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Custom Goal Option */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Or enter a custom career goal:</h3>
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <Label htmlFor="custom-goal">Your career goal</Label>
                    <Input
                      id="custom-goal"
                      placeholder="e.g., Sustainability Consultant, AI Research Scientist..."
                      value={customGoal}
                      onChange={(e) => setCustomGoal(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCustomGoal()}
                    />
                  </div>
                  <Button 
                    onClick={handleCustomGoal} 
                    disabled={!customGoal.trim() || isGenerating}
                    className="mt-6"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Plan
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Specific Goals in Selected Category */}
              <div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedCategory(null)}
                  className="mb-4"
                >
                  ← Back to categories
                </Button>
                
                <h3 className="text-lg font-semibold mb-4">
                  Select a specific goal in {careerCategories.find(c => c.id === selectedCategory)?.title}:
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {careerCategories
                    .find(c => c.id === selectedCategory)
                    ?.goals.map((goal) => (
                      <Button
                        key={goal}
                        variant="outline"
                        className="justify-start h-auto p-4"
                        onClick={() => handleGoalSelect(goal)}
                        disabled={isGenerating}
                      >
                        <div className="text-left">
                          <div className="font-medium">{goal}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Generate personalized plan
                          </div>
                        </div>
                      </Button>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerGoalSelector;