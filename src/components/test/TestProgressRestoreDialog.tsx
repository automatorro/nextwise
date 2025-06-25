
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

interface TestProgressRestoreDialogProps {
  open: boolean;
  testName: string;
  questionNumber: number;
  totalQuestions: number;
  onRestore: () => void;
  onStartFresh: () => void;
}

const TestProgressRestoreDialog: React.FC<TestProgressRestoreDialogProps> = ({
  open,
  testName,
  questionNumber,
  totalQuestions,
  onRestore,
  onStartFresh
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Progres salvat detectat</AlertDialogTitle>
          <AlertDialogDescription>
            Am găsit un progres salvat pentru testul "{testName}". 
            Erai la întrebarea {questionNumber + 1} din {totalQuestions}.
            <br /><br />
            Vrei să continui de unde ai rămas sau să reiei testul de la început?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onStartFresh}>
            Începe de la început
          </AlertDialogCancel>
          <AlertDialogAction onClick={onRestore}>
            Continuă de unde am rămas
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TestProgressRestoreDialog;
