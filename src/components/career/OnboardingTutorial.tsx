import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Target, 
  Users, 
  CheckCircle, 
  Clock,
  Lightbulb,
  ArrowRight,
  PlayCircle,
  Star
} from 'lucide-react';

interface OnboardingTutorialProps {
  onComplete: () => void;
  userHasTests: boolean;
  userHasPlans: boolean;
}

const OnboardingTutorial = ({ onComplete, userHasTests, userHasPlans }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Career Hub! 🎯',
      description: 'Your personal career development assistant is here to help you grow professionally.',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <Target className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Journey Starts Here</h3>
            <p className="text-gray-600">
              Career Hub uses AI to create personalized development plans based on your unique profile and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium">Assess</div>
              <div className="text-xs text-gray-500">Understand yourself</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-medium">Plan</div>
              <div className="text-xs text-gray-500">Set your goals</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-sm font-medium">Achieve</div>
              <div className="text-xs text-gray-500">Reach milestones</div>
            </div>
          </div>
        </div>
      ),
      action: 'Get Started'
    },
    {
      title: 'Step 1: Complete Assessments 📊',
      description: 'Take personality and skills tests to help AI understand your strengths and preferences.',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <CheckCircle className={`w-6 h-6 ${userHasTests ? 'text-green-600' : 'text-gray-400'}`} />
            <div className="flex-1">
              <div className="font-medium">Personality Assessment</div>
              <div className="text-sm text-gray-600">
                {userHasTests ? 'Completed! ✅' : 'Recommended: Big Five Personality Test'}
              </div>
            </div>
            {!userHasTests && <Badge variant="outline">15 min</Badge>}
          </div>
          
          <div className="text-sm text-gray-700">
            <div className="font-medium mb-2">Why assessments matter:</div>
            <ul className="space-y-1 text-xs">
              <li className="flex items-center space-x-2">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>Personalized career recommendations</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>Better job-role alignment</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>Targeted skill development</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      action: userHasTests ? 'Next Step' : 'Take Assessment'
    },
    {
      title: 'Step 2: Generate Career Plan 🚀',
      description: 'Create a personalized career plan with AI-powered milestones and resources.',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className={`w-6 h-6 ${userHasPlans ? 'text-green-600' : 'text-gray-400'}`} />
            <div className="flex-1">
              <div className="font-medium">Career Plan</div>
              <div className="text-sm text-gray-600">
                {userHasPlans ? 'You have active plans! ✅' : 'Select your career goal and let AI create your roadmap'}
              </div>
            </div>
            {!userHasPlans && <Badge variant="outline">2 min</Badge>}
          </div>
          
          <div className="text-sm text-gray-700">
            <div className="font-medium mb-2">Your AI plan includes:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <Target className="w-3 h-3 text-blue-500" />
                <span>Step-by-step milestones</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-3 h-3 text-blue-500" />
                <span>Free learning resources</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3 text-blue-500" />
                <span>Realistic timelines</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 text-blue-500" />
                <span>Progress tracking</span>
              </div>
            </div>
          </div>
        </div>
      ),
      action: userHasPlans ? 'Next Step' : 'Create Plan'
    },
    {
      title: 'Step 3: Follow Recommendations 💡',
      description: 'Get ongoing suggestions for courses, skills, and opportunities tailored to your goals.',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              <div className="font-medium">Smart Recommendations</div>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              AI continuously suggests personalized actions based on your progress and industry trends.
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-xs">Google PM Certificate</span>
                </div>
                <Badge variant="secondary" className="text-xs">Free</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-xs">Leadership Skills Course</span>
                </div>
                <Badge variant="secondary" className="text-xs">12h</Badge>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-600 text-center">
            💡 New recommendations appear as you complete milestones and industry changes
          </div>
        </div>
      ),
      action: 'Start My Journey'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleAction = () => {
    const step = steps[currentStep];
    
    if (step.action === 'Take Assessment') {
      window.location.href = '/assessments';
      return;
    }
    
    if (step.action === 'Create Plan') {
      // This will be handled by parent component
      onComplete();
      return;
    }
    
    handleNext();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
            <CardDescription className="mt-1">
              {steps[currentStep].description}
            </CardDescription>
          </div>
          <Badge variant="outline">
            {currentStep + 1} / {steps.length}
          </Badge>
        </div>
        <Progress value={((currentStep + 1) / steps.length) * 100} className="mt-4" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {steps[currentStep].content}
        
        <div className="flex justify-between items-center pt-4 border-t">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <Button onClick={handleAction} className="bg-blue-600 hover:bg-blue-700">
            {steps[currentStep].action}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingTutorial;