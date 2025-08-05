
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Target, 
  Brain, 
  Sparkles,
  Clock,
  AlertCircle,
  BookOpen,
  TrendingUp,
  Zap,
  Eye,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCareerTemplates } from '@/hooks/useCareerTemplates';
import { useCareerPlanGeneration } from '@/hooks/useCareerPlanGeneration';
import { useTestResults } from '@/hooks/useTestResults';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  maxPlans: number;
  currentPlansCount: number;
}

const CreateCareerPlanEnhanced = ({ maxPlans, currentPlansCount }: Props) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { templates, isLoading: templatesLoading, createPlanFromTemplate } = useCareerTemplates();
  const { generateCareerPlan, isGeneratingPlan } = useCareerPlanGeneration();
  const { testResults } = useTestResults();
  
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplatePreview, setShowTemplatePreview] = useState<string | null>(null);
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
        title: t('careerPlan.limitReachedTitle'),
        description: t('careerPlan.limitReachedDescription'),
        variant: "destructive"
      });
      return;
    }

    if (testResults.length === 0) {
      toast({
        title: t('careerPlan.assessmentRequiredTitle'),
        description: t('careerPlan.assessmentRequiredDescription'),
        variant: "destructive"
      });
      return;
    }

    generateCareerPlan.mutate({ 
      careerGoal: formData.targetRole, 
      testResults 
    });
  };

  const handleUseTemplate = async (templateId: string) => {
    if (!canCreatePlan || !user?.id) {
      toast({
        title: t('careerPlan.errorTitle'),
        description: t('careerPlan.errorDescription'),
        variant: "destructive"
      });
      return;
    }

    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    createPlanFromTemplate.mutate({
      templateId,
      userId: user.id,
      customizations: {
        title: `Plan ${template.title}`,
        description: `Plan de carieră bazat pe template-ul ${template.title}`
      }
    });
  };

  const TemplatePreview = ({ templateId }: { templateId: string }) => {
    const { data: milestones } = useCareerTemplates().getTemplateMilestones(templateId);
    const template = templates.find(t => t.id === templateId);

    if (!template) return null;

    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">{t('careerPlan.milestonesIncluded')}</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {milestones?.map((milestone, index) => (
              <div key={milestone.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">{milestone.title}</h5>
                  {milestone.description && (
                    <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>⏱️ {milestone.estimated_duration_weeks} {t('careerPlan.weeks')}</span>
                    {milestone.required_skills && milestone.required_skills.length > 0 && (
                      <span>🎯 {milestone.required_skills.length} {t('careerPlan.skills')}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {template.required_skills && template.required_skills.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">{t('careerPlan.requiredSkills')}</h4>
            <div className="flex flex-wrap gap-2">
              {template.required_skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technology': return <Zap className="w-5 h-5" />;
      case 'management': return <Users className="w-5 h-5" />;
      case 'design': return <Target className="w-5 h-5" />;
      case 'analytics': return <TrendingUp className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Limit Warning */}
      {!canCreatePlan && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center space-x-3 pt-6">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-900">
                {t('careerPlan.limitReachedDescription')}
              </p>
              <p className="text-sm text-orange-700">
                {t('careerPlan.upgradeForUnlimited')}
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
              <span>{t('careerPlan.createCustomTitle')}</span>
            </CardTitle>
            <CardDescription>
              {t('careerPlan.createCustomDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="targetRole">{t('careerPlan.targetRole')}</Label>
              <Input
                id="targetRole"
                placeholder={t('careerPlan.targetRolePlaceholder')}
                value={formData.targetRole}
                onChange={(e) => handleInputChange('targetRole', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="currentRole">{t('careerPlan.currentRole')}</Label>
              <Input
                id="currentRole"
                placeholder={t('careerPlan.currentRolePlaceholder')}
                value={formData.currentRole}
                onChange={(e) => handleInputChange('currentRole', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="timeframe">{t('careerPlan.timeframe')}</Label>
              <Input
                id="timeframe"
                placeholder={t('careerPlan.timeframePlaceholder')}
                value={formData.timeframe}
                onChange={(e) => handleInputChange('timeframe', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">{t('careerPlan.objectiveDescription')}</Label>
              <Textarea
                id="description"
                placeholder={t('careerPlan.objectiveDescriptionPlaceholder')}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleGeneratePlan}
              disabled={!canCreatePlan || isGeneratingPlan || !formData.targetRole}
            >
              {isGeneratingPlan ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  {t('careerPlan.generatingPlan')}
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  {t('careerPlan.generateWithAI')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Template Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('careerPlan.availableTemplates')}</h3>
            <p className="text-gray-600 mb-6">
              {t('careerPlan.popularTemplates')}
            </p>
          </div>

          {templatesLoading ? (
            <div>{t('careerPlan.loadingTemplates')}</div>
          ) : (
            <div className="space-y-4">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          {getCategoryIcon(template.category)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {template.estimated_duration_months} {t('careerPlan.months')}
                        </Badge>
                        <Badge className={getDifficultyColor(template.difficulty_level)}>
                          {t(`careerPlan.difficulty.${template.difficulty_level}`)}
                        </Badge>
                      </div>
                    </div>

                    {template.required_skills && template.required_skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {template.required_skills.slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {template.required_skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.required_skills.length - 3} {t('careerPlan.more')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            {t('careerPlan.preview')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{template.title}</DialogTitle>
                            <DialogDescription>
                              {template.description}
                            </DialogDescription>
                          </DialogHeader>
                          <TemplatePreview templateId={template.id} />
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        className="flex-1"
                        onClick={() => handleUseTemplate(template.id)}
                        disabled={!canCreatePlan || createPlanFromTemplate.isPending}
                      >
                        {createPlanFromTemplate.isPending ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            {t('careerPlan.creatingPlan')}
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4 mr-2" />
                            {t('careerPlan.useTemplate')}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCareerPlanEnhanced;
