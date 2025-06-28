
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
import { useCareerMilestones, type CareerMilestone } from '@/hooks/useCareerMilestones';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  milestone: CareerMilestone;
}

const EditMilestoneModal = ({ isOpen, onClose, milestone }: Props) => {
  const [title, setTitle] = useState(milestone.title);
  const [description, setDescription] = useState(milestone.description || '');
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    milestone.target_date ? new Date(milestone.target_date) : undefined
  );
  const { updateMilestone } = useCareerMilestones();

  const handleSave = () => {
    if (!title.trim()) return;

    updateMilestone.mutate({
      id: milestone.id,
      updates: {
        title: title.trim(),
        description: description.trim() || null,
        target_date: targetDate ? targetDate.toISOString().split('T')[0] : null
      }
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editează milestone</DialogTitle>
          <DialogDescription>
            Actualizează informațiile milestone-ului.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-milestone-title">Titlu *</Label>
            <Input
              id="edit-milestone-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titlul milestone-ului"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="edit-milestone-description">Descriere</Label>
            <Textarea
              id="edit-milestone-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalii despre acest milestone..."
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label>Data țintă</Label>
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
            {targetDate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTargetDate(undefined)}
                className="text-muted-foreground"
              >
                Elimină data
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Anulează
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            Salvează
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMilestoneModal;
