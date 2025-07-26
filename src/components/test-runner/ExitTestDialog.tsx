
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ExitTestDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  hasAnswers: boolean;
}

const ExitTestDialog: React.FC<ExitTestDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  hasAnswers
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Părăsești testul?</AlertDialogTitle>
          <AlertDialogDescription>
            {hasAnswers ? (
              <>
                Progresul tău va fi salvat și vei putea continua testul mai târziu.
                Ești sigur că vrei să ieși din test?
              </>
            ) : (
              <>
                Nu ai răspuns la nicio întrebare încă.
                Ești sigur că vrei să ieși din test?
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            Continuă testul
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Da, ieși din test
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExitTestDialog;
