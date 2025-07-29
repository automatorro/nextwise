
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  BookOpen, 
  ExternalLink, 
  Clock, 
  ChevronDown, 
  ChevronRight,
  Play,
  FileText,
  Users,
  Wrench,
  Globe
} from 'lucide-react';

interface Resource {
  type: string;
  title: string;
  url: string;
  description: string;
  estimatedHours: number;
  isFree: boolean;
}

interface Props {
  resources: Resource[];
  milestoneTitle: string;
  validationStatus?: any;
}

const MilestoneResourcesSection = ({ resources, milestoneTitle, validationStatus }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!resources || resources.length === 0) {
    return null;
  }

  // Filter resources based on validation status
  const activeResources = resources.filter(resource => {
    // If no validation status exists, show all resources (backward compatibility)
    if (!validationStatus) {
      return true;
    }
    
    // Check if this specific resource URL is marked as active
    const urlValidation = validationStatus[resource.url];
    return urlValidation === undefined || urlValidation === true;
  });

  if (activeResources.length === 0) {
    return null;
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'practice': return <Play className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'networking': return <Users className="w-4 h-4" />;
      case 'tool': return <Wrench className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getResourceTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Curs';
      case 'practice': return 'Practică';
      case 'article': return 'Articol';
      case 'networking': return 'Networking';
      case 'tool': return 'Instrument';
      case 'template': return 'Template';
      default: return 'Resursă';
    }
  };

  const totalHours = activeResources.reduce((sum, resource) => sum + (resource.estimatedHours || 0), 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-2 h-auto">
          <div className="flex items-center space-x-2">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="text-sm font-medium">Resurse recomandate</span>
            <Badge variant="secondary" className="text-xs">
              {activeResources.length} resurse
            </Badge>
            {totalHours > 0 && (
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {totalHours}h
              </Badge>
            )}
          </div>
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2">
        <div className="space-y-3">
          {activeResources.map((resource, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getResourceIcon(resource.type)}
                      <Badge variant="secondary" className="text-xs">
                        {getResourceTypeLabel(resource.type)}
                      </Badge>
                      {resource.isFree && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Gratuit
                        </Badge>
                      )}
                      {resource.estimatedHours && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.estimatedHours}h
                        </Badge>
                      )}
                    </div>
                    
                    <h4 className="font-medium text-sm mb-1">{resource.title}</h4>
                    <p className="text-xs text-gray-600 mb-3">{resource.description}</p>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs h-7"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Accesează resursa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MilestoneResourcesSection;
