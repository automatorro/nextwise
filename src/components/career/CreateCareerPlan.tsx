
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  Brain, 
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Props {
  maxPlans: number;
  currentPlansCount: number;
}

const CreateCareerPlan = ({ maxPlans, currentPlansCount }: Props) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    targetRole: '',
    currentRole: '',
    timeframe: '',
    description: '',
    skills: ''
  });

  const canCreatePlan = currentPlansCount < maxPlans;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePlan = async () => {
    if (!canCreatePlan) {
      toast({
        title: "Limită atinsă",
        description: "Ai atins limita de planuri pentru abonamentul tău.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulare generare plan AI
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Plan generat cu succes!",
        description: "Planul tău de carieră a fost creat și adăugat în dashboard.",
      });
    }, 3000);
  };

  const predefinedTemplates = [
    {
      title: 'Full Stack Developer',
      description: 'Dezvoltare web completă cu tehnologii moderne',
      duration: '6-8 luni',
      skills: ['React', 'Node.js', 'TypeScript', 'Database Design']
    },
    {
      title: 'Product Manager',
      description: 'Leadership în dezvoltarea produselor digitale',
      duration: '4-6 luni',
      skills: ['Strategy', 'Analytics', 'User Research', 'Agile']
    },
    {
      title: 'Data Scientist',
      description: 'Analiză de date și machine learning',
      duration: '8-12 luni',
      skills: ['Python', 'Statistics', 'ML', 'Data Visualization']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Limit Warning */}
      {!canCreatePlan && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center space-x-3 pt-6">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-900">
                Ai atins limita de planuri pentru abonamentul tău
              </p>
              <p className="text-sm text-orange-700">
                Upgrade la Professional sau Premium pentru planuri nelimitate
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Custom Plan Creation */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <span>Creează plan personalizat</span>
            </CardTitle>
            <CardDescription>
              AI-ul va genera un plan bazat pe profilul și rezultatele tale
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="targetRole">Rolul dorit</Label>
              <Input
                id="targetRole"
                placeholder="ex: Senior Frontend Developer"
                value={formData.targetRole}
                onChange={(e) => handleInputChange('targetRole', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="currentRole">Rolul actual</Label>
              <Input
                id="currentRole"
                placeholder="ex: Junior Developer"
                value={formData.currentRole}
                onChange={(e) => handleInputChange('currentRole', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="timeframe">Perioada dorită</Label>
              <Input
                id="timeframe"
                placeholder="ex: 6 luni"
                value={formData.timeframe}
                onChange={(e) => handleInputChange('timeframe', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Descriere obiective</Label>
              <Textarea
                id="description"
                placeholder="Descrie ce vrei să realizezi..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleGeneratePlan}
              disabled={!canCreatePlan || isGenerating || !formData.targetRole}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generez planul...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generează cu AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Template Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Sau alege un template</h3>
            <p className="text-gray-600 mb-6">
              Planuri predefinite pentru carierele populare
            </p>
          </div>

          <div className="space-y-4">
            {predefinedTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      {template.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    disabled={!canCreatePlan}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Folosește template-ul
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCareerPlan;
