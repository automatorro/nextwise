import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useTestResultsManager } from '@/hooks/useTestResultsManager';
import { 
  Brain, 
  Users, 
  Target, 
  BarChart3, 
  CheckCircle,
  Info,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Trash2
} from 'lucide-react';

interface TestInfluenceSectionProps {
  testResults: any[];
}

const TestInfluenceSection: React.FC<TestInfluenceSectionProps> = ({ testResults }) => {
  const { t } = useLanguage();
  const { deleteTestResult, bulkDeleteOldResults, isDeleting } = useTestResultsManager();
  const [showAll, setShowAll] = useState(false);
  
  const INITIAL_DISPLAY_COUNT = 6;
  
  // Sort results by completion date (newest first) and check for recent tests
  const sortedResults = testResults.sort((a, b) => 
    new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
  );
  
  const displayedResults = showAll ? sortedResults : sortedResults.slice(0, INITIAL_DISPLAY_COUNT);
  const hiddenCount = Math.max(0, sortedResults.length - INITIAL_DISPLAY_COUNT);
  
  const isRecentTest = (completedAt: string) => {
    const testDate = new Date(completedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return testDate > sevenDaysAgo;
  };

  const getTestIcon = (testName: string) => {
    const name = testName?.toLowerCase() || '';
    if (name.includes('big five') || name.includes('hexaco')) return Brain;
    if (name.includes('disc') || name.includes('belbin')) return Users;
    if (name.includes('holland') || name.includes('enneagram')) return Target;
    return BarChart3;
  };

  const getTestColor = (testName: string) => {
    const name = testName?.toLowerCase() || '';
    if (name.includes('big five') || name.includes('hexaco')) return 'text-blue-600 bg-blue-100';
    if (name.includes('disc') || name.includes('belbin')) return 'text-green-600 bg-green-100';
    if (name.includes('holland') || name.includes('enneagram')) return 'text-purple-600 bg-purple-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getTestInfluence = (testName: string) => {
    const name = testName?.toLowerCase() || '';
    if (name.includes('big five')) return t('careerPlan.testInfluence.bigFive');
    if (name.includes('disc')) return t('careerPlan.testInfluence.disc');
    if (name.includes('belbin')) return t('careerPlan.testInfluence.belbin');
    if (name.includes('hexaco')) return t('careerPlan.testInfluence.hexaco');
    if (name.includes('holland')) return t('careerPlan.testInfluence.holland');
    if (name.includes('enneagram')) return t('careerPlan.testInfluence.enneagram');
    return t('careerPlan.testInfluence.general');
  };

  if (testResults.length === 0) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <Info className="w-5 h-5" />
            <span>{t('careerPlan.testInfluence.noTestsTitle')}</span>
          </CardTitle>
          <CardDescription className="text-blue-700">
            {t('careerPlan.testInfluence.noTestsDescription')}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-green-900">
          <Sparkles className="w-5 h-5" />
          <span>{t('careerPlan.testInfluence.title')}</span>
        </CardTitle>
        <CardDescription className="text-green-700">
          {t('careerPlan.testInfluence.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedResults.map((result, index) => {
            const testName = result?.test_types?.name || result?.testName || 'Unknown Test';
            const IconComponent = getTestIcon(testName);
            const colorClasses = getTestColor(testName);
            const influence = getTestInfluence(testName);
            
            return (
              <div 
                key={index} 
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out animate-fade-in relative group"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${colorClasses}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900 truncate">
                        {testName}
                      </h4>
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {isRecentTest(result.completed_at) && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {t('careerPlan.testInfluence.new')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {influence}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        {t('careerPlan.testInfluence.completed')}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {new Date(result.completed_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Delete button */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        disabled={isDeleting}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('careerPlan.testInfluence.deleteTitle')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('careerPlan.testInfluence.deleteDescription')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteTestResult(result.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {t('common.delete')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Show/Hide All Button */}
        {hiddenCount > 0 && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center space-x-2 animate-fade-in hover:scale-105 transition-transform duration-200"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>{t('careerPlan.testInfluence.showLess')}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>
                    {t('careerPlan.testInfluence.showAll')} ({hiddenCount} {t('careerPlan.testInfluence.hidden')})
                  </span>
                </>
              )}
            </Button>
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Brain className="w-4 h-4" />
              <span>
                {t('careerPlan.testInfluence.aiCombination').replace('{{count}}', testResults.length.toString())}
              </span>
            </div>
            
            {/* Bulk delete option for users with many tests */}
            {testResults.length > 20 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    {t('careerPlan.testInfluence.cleanOld')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('careerPlan.testInfluence.bulkDeleteTitle')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('careerPlan.testInfluence.bulkDeleteDescription')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => bulkDeleteOldResults(10)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {t('careerPlan.testInfluence.cleanOld')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestInfluenceSection;