
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
import { useCareerPlans, type CareerPlan } from '@/hooks/useCareerPlans';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plan: CareerPlan;
}

const EditCareerPlanModal = ({ isOpen, onClose, plan }: Props) => {
  const [title, setTitle] = useState(plan.title);
  const [description, setDescription] = useState(plan.description || '');
  const { updateCareerPlan } = useCareerPlans();

  const handleSave = () => {
    updateCareerPlan.mutate({
      id: plan.id,
      updates: {
        title,
        description: description || null,
        updated_at: new Date().toISOString()
      }
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editează planul de carieră</DialogTitle>
          <DialogDescription>
            Actualizează informațiile planului tău de carieră.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titlu</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Numele planului de carieră"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descriere</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrierea planului (opțional)"
              rows={3}
            />
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

export default EditCareerPlanModal;
