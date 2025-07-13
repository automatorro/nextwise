import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, Award, Download, BarChart3 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProgressTracking = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { progressData, achievements, exportToPDF, isLoading } = useProgressTracking();
  const [timeframe, setTimeframe] = useState('lastMonth');

  const timeframeOptions = [
    { value: 'lastWeek', label: t('premiumFeatures.progressTracking.lastWeek') },
    { value: 'lastMonth', label: t('premiumFeatures.progressTracking.lastMonth') },
    { value: 'last3Months', label: t('premiumFeatures.progressTracking.last3Months') },
    { value: 'last6Months', label: t('premiumFeatures.progressTracking.last6Months') },
  ];

  const handleExportPDF = async () => {
    try {
      await exportToPDF(timeframe);
      toast({
        title: t('common.success'),
        description: t('premiumFeatures.progressTracking.exportPDF'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Error exporting PDF',
        variant: 'destructive',
      });
    }
  };

  const currentData = progressData[timeframe] || [];
  const hasData = currentData.length > 0;

  const statsCards = [
    {
      title: t('premiumFeatures.progressTracking.stepsCompleted'),
      value: currentData.reduce((sum, item) => sum + item.steps_completed, 0),
      icon: BarChart3,
      color: 'text-blue-500'
    },
    {
      title: t('premiumFeatures.progressTracking.milestonesReached'),
      value: currentData.reduce((sum, item) => sum + item.milestones_reached, 0),
      icon: Award,
      color: 'text-green-500'
    },
    {
      title: t('premiumFeatures.progressTracking.testsRetaken'),
      value: currentData.reduce((sum, item) => sum + item.tests_retaken, 0),
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t('premiumFeatures.progressTracking.title')}</h2>
          <p className="text-muted-foreground">{t('premiumFeatures.progressTracking.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeframeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleExportPDF} disabled={!hasData || isLoading}>
            <Download className="w-4 h-4 mr-2" />
            {t('premiumFeatures.progressTracking.exportPDF')}
          </Button>
        </div>
      </div>

      {!hasData ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t('premiumFeatures.progressTracking.noData')}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {statsCards.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {t('premiumFeatures.progressTracking.progressChart')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="tracking_date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      formatter={(value, name) => [
                        value,
                        name === 'steps_completed' 
                          ? t('premiumFeatures.progressTracking.stepsCompleted')
                          : name === 'milestones_reached'
                          ? t('premiumFeatures.progressTracking.milestonesReached')
                          : t('premiumFeatures.progressTracking.testsRetaken')
                      ]}
                    />
                    <Bar 
                      dataKey="steps_completed" 
                      fill="hsl(var(--primary))" 
                      name="steps_completed"
                    />
                    <Bar 
                      dataKey="milestones_reached" 
                      fill="hsl(var(--secondary))" 
                      name="milestones_reached"
                    />
                    <Bar 
                      dataKey="tests_retaken" 
                      fill="hsl(var(--accent))" 
                      name="tests_retaken"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {t('premiumFeatures.progressTracking.weeklyProgress')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="tracking_date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="steps_completed" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {achievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  {t('premiumFeatures.progressTracking.achievementsList')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{achievement.achievement_description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(achievement.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.steps_completed} steps • {achievement.milestones_reached} milestones
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default ProgressTracking;