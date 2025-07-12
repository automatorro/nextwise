
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCareerMilestones } from '@/hooks/useCareerMilestones';
import { useLanguage } from '@/hooks/useLanguage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  careerPathId: string;
}

const AddMilestoneModal = ({ isOpen, onClose, careerPathId }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState<Date>();
  const { createMilestone, milestones } = useCareerMilestones(careerPathId);
  const { t } = useLanguage();

  const handleSave = () => {
    if (!title.trim()) return;

    createMilestone.mutate({
      career_path_id: careerPathId,
      title: title.trim(),
      description: description.trim() || undefined,
      target_date: targetDate ? targetDate.toISOString().split('T')[0] : undefined,
      milestone_order: milestones.length
    });

    // Reset form
    setTitle('');
    setDescription('');
    setTargetDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('career.milestones.add')}</DialogTitle>
          <DialogDescription>
            {t('career.createPlan.title')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="milestone-title">{t('career.milestones.title')} *</Label>
            <Input
              id="milestone-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Completez cursul de Python"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="milestone-description">{t('career.milestones.description')}</Label>
            <Textarea
              id="milestone-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalii despre acest milestone..."
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label>{t('career.milestones.targetDate')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !targetDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {targetDate ? format(targetDate, "dd/MM/yyyy") : "Selectează data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={targetDate}
                  onSelect={setTargetDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {t('career.milestones.save')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMilestoneModal;
