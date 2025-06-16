
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Calendar,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { useCareerMilestones, type CareerMilestone } from '@/hooks/useCareerMilestones';
import { format } from 'date-fns';

interface Props {
  careerPathId: string;
  canEdit?: boolean;
}

const MilestoneTracker = ({ careerPathId, canEdit = true }: Props) => {
  const { milestones, isLoading, toggleMilestone, deleteMilestone } = useCareerMilestones(careerPathId);

  const handleToggleComplete = (milestone: CareerMilestone) => {
    toggleMilestone.mutate({
      id: milestone.id,
      completed: !milestone.is_completed
    });
  };

  const handleDeleteMilestone = (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi acest milestone?')) {
      deleteMilestone.mutate(id);
    }
  };

  const getStatusBadge = (milestone: CareerMilestone) => {
    if (milestone.is_completed) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completat
        </Badge>
      );
    }

    if (milestone.target_date) {
      const targetDate = new Date(milestone.target_date);
      const today = new Date();
      const daysDiff = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

      if (daysDiff < 0) {
        return (
          <Badge variant="destructive">
            <Clock className="w-3 h-3 mr-1" />
            Întârziat
          </Badge>
        );
      } else if (daysDiff <= 7) {
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            <Clock className="w-3 h-3 mr-1" />
            Urgent
          </Badge>
        );
      }
    }

    return (
      <Badge variant="outline">
        <Clock className="w-3 h-3 mr-1" />
        În progres
      </Badge>
    );
  };

  if (isLoading) {
    return <div>Se încarcă milestone-urile...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Milestone-uri</CardTitle>
            <CardDescription>
              Urmărește progresul pas cu pas către obiectivul tău de carieră
            </CardDescription>
          </div>
          {canEdit && (
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adaugă milestone
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nu există milestone-uri încă.</p>
            {canEdit && (
              <p className="text-sm">Adaugă primul milestone pentru a începe urmărirea progresului.</p>
            )}
          </div>
        ) : (
          milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <Checkbox
                checked={milestone.is_completed}
                onCheckedChange={() => handleToggleComplete(milestone)}
                disabled={!canEdit}
                className="mt-1"
              />
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className={`font-medium ${milestone.is_completed ? 'line-through text-gray-500' : ''}`}>
                    {milestone.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(milestone)}
                    {canEdit && (
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteMilestone(milestone.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {milestone.description && (
                  <p className={`text-sm text-gray-600 ${milestone.is_completed ? 'line-through' : ''}`}>
                    {milestone.description}
                  </p>
                )}
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {milestone.target_date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Target: {format(new Date(milestone.target_date), 'dd MMM yyyy')}</span>
                    </div>
                  )}
                  {milestone.completed_at && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span>Completat: {format(new Date(milestone.completed_at), 'dd MMM yyyy')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default MilestoneTracker;
