
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
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, 
  Download, 
  Mail, 
  MessageCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { type CareerPlan } from '@/hooks/useCareerPlans';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plan: CareerPlan;
}

const ShareCareerPlanModal = ({ isOpen, onClose, plan }: Props) => {
  const shareUrl = `${window.location.origin}/shared-plan/${plan.id}`;
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copiat!",
        description: "Link-ul a fost copiat în clipboard."
      });
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut copia link-ul.",
        variant: "destructive"
      });
    }
  };

  const shareViaEmail = () => {
    const subject = `Plan de carieră: ${plan.title}`;
    const body = `Salut!\n\nVreau să îți prezint planul meu de carieră "${plan.title}".\n\nPoți să îl vezi aici: ${shareUrl}\n\nMulțumesc!`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaWhatsApp = () => {
    const message = `Vreau să îți prezint planul meu de carieră "${plan.title}": ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const hideModalAndToasts = () => {
    // Hide the modal
    const modalElement = document.querySelector('[data-radix-dialog-overlay]');
    const modalContent = document.querySelector('[data-radix-dialog-content]');
    if (modalElement) modalElement.style.display = 'none';
    if (modalContent) modalContent.style.display = 'none';

    // Hide toasts
    const toasts = document.querySelectorAll('[data-sonner-toaster], [data-radix-toast-viewport]');
    toasts.forEach(toast => {
      (toast as HTMLElement).style.display = 'none';
    });
  };

  const showModalAndToasts = () => {
    // Show the modal
    const modalElement = document.querySelector('[data-radix-dialog-overlay]');
    const modalContent = document.querySelector('[data-radix-dialog-content]');
    if (modalElement) modalElement.style.display = '';
    if (modalContent) modalContent.style.display = '';

    // Show toasts
    const toasts = document.querySelectorAll('[data-sonner-toaster], [data-radix-toast-viewport]');
    toasts.forEach(toast => {
      (toast as HTMLElement).style.display = '';
    });
  };

  const getCareerPlanElement = () => {
    // Try to find the career plan content container
    const careerPlanContainer = document.querySelector('.container.mx-auto') || 
                               document.querySelector('main') || 
                               document.querySelector('.career-plan-content') ||
                               document.querySelector('.space-y-6');
    
    return careerPlanContainer as HTMLElement;
  };

  const exportAsPDF = async () => {
    try {
      // Get the career plan element
      const element = getCareerPlanElement();
      if (!element) {
        toast({
          title: "Eroare",
          description: "Nu am putut găsi conținutul planului de carieră.",
          variant: "destructive"
        });
        return;
      }

      // Hide modal and toasts temporarily
      hideModalAndToasts();

      // Wait a moment for the hiding to take effect
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      // Show modal and toasts again
      showModalAndToasts();

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${plan.title}.pdf`);
      
      toast({
        title: "PDF generat!",
        description: "Planul a fost descărcat ca PDF."
      });
    } catch (error) {
      // Make sure to show modal and toasts again even if there's an error
      showModalAndToasts();
      console.error('Error generating PDF:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera PDF-ul.",
        variant: "destructive"
      });
    }
  };

  const exportAsImage = async () => {
    try {
      // Get the career plan element
      const element = getCareerPlanElement();
      if (!element) {
        toast({
          title: "Eroare",
          description: "Nu am putut găsi conținutul planului de carieră.",
          variant: "destructive"
        });
        return;
      }

      // Hide modal and toasts temporarily
      hideModalAndToasts();

      // Wait a moment for the hiding to take effect
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      // Show modal and toasts again
      showModalAndToasts();
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${plan.title}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "Imagine generată!",
        description: "Planul a fost descărcat ca imagine."
      });
    } catch (error) {
      // Make sure to show modal and toasts again even if there's an error
      showModalAndToasts();
      console.error('Error generating image:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera imaginea.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Partajează planul de carieră</DialogTitle>
          <DialogDescription>
            Alege cum vrei să partajezi planul "{plan.title}".
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Copy Link */}
          <div className="space-y-2">
            <Label>Link de partajare</Label>
            <div className="flex space-x-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <Label>Opțiuni de partajare</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={shareViaEmail} className="justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" onClick={shareViaWhatsApp} className="justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <Label>Export</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={exportAsPDF} className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" onClick={exportAsImage} className="justify-start">
                <ImageIcon className="w-4 h-4 mr-2" />
                Imagine
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Închide
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareCareerPlanModal;
