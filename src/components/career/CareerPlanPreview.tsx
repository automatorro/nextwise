import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  BookOpen, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

interface CareerPlanPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  planData: any;
  onConfirm: () => void;
  isCreating: boolean;
}

const CareerPlanPreview = ({ isOpen, onClose, planData, onConfirm, isCreating }: CareerPlanPreviewProps) => {
  if (!planData) return null;

  const totalEstimatedHours = planData.milestones?.reduce((sum: number, milestone: any) => {
    return sum + (milestone.resources?.reduce((resSum: number, res: any) => resSum + (res.estimatedHours || 0), 0) || 0);
  }, 0) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Preview: {planData.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plan Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{planData.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium">Timeline</div>
                    <div className="text-xs text-gray-500">{planData.timeline || '6-12 luni'}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">Milestones</div>
                    <div className="text-xs text-gray-500">{planData.milestones?.length || 0} steps</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium">Est. Time</div>
                    <div className="text-xs text-gray-500">{totalEstimatedHours}h total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Milestones Breakdown</h3>
            <div className="space-y-4">
              {planData.milestones?.map((milestone: any, index: number) => {
                const milestoneHours = milestone.resources?.reduce((sum: number, res: any) => sum + (res.estimatedHours || 0), 0) || 0;
                
                return (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{milestone.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {milestoneHours}h
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3">{milestone.description}</p>
                      
                      {/* Resources Preview */}
                      {milestone.resources && milestone.resources.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-gray-700">
                            {milestone.resources.length} resurse incluse:
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {milestone.resources.slice(0, 2).map((resource: any, resIndex: number) => (
                              <div key={resIndex} className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-xs">
                                <ExternalLink className="w-3 h-3 text-blue-500" />
                                <div className="flex-1 truncate">
                                  <div className="font-medium truncate">{resource.title}</div>
                                  <div className="text-gray-500">{resource.estimatedHours}h • {resource.isFree ? 'Gratuit' : 'Paid'}</div>
                                </div>
                              </div>
                            ))}
                            {milestone.resources.length > 2 && (
                              <div className="text-xs text-gray-500 col-span-2">
                                +{milestone.resources.length - 2} more resources...
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Action Items Preview */}
                      {milestone.actionItems && milestone.actionItems.length > 0 && (
                        <div className="mt-3">
                          <div className="text-xs font-medium text-gray-700 mb-2">Key Actions:</div>
                          <ul className="space-y-1">
                            {milestone.actionItems.slice(0, 2).map((action: string, actionIndex: number) => (
                              <li key={actionIndex} className="flex items-center space-x-2 text-xs">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span className="text-gray-600">{action}</span>
                              </li>
                            ))}
                            {milestone.actionItems.length > 2 && (
                              <li className="text-xs text-gray-500">+{milestone.actionItems.length - 2} more actions...</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recommendations Preview */}
          {planData.recommendations && planData.recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {planData.recommendations.slice(0, 4).map((rec: any, index: number) => (
                  <Card key={index} className="border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          Priority {rec.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rec.type}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                      <p className="text-xs text-gray-600">{rec.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Confirmation Actions */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button variant="outline" onClick={onClose} disabled={isCreating}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                Ready to start your journey?
              </div>
              <Button onClick={onConfirm} disabled={isCreating} className="bg-blue-600 hover:bg-blue-700">
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create This Plan
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerPlanPreview;