
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LanguageSelector = () => {
  const { language, changeLanguage } = useTranslation();

  const handleLanguageChange = async (newLanguage: string) => {
    if (newLanguage === language) return;
    
    console.log('🔄 User changing language to:', newLanguage);
    await changeLanguage(newLanguage as 'ro' | 'en');
  };

  return (
    <Select 
      value={language} 
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-20 h-9 bg-white/60 hover:bg-white/80 border-gray-200 touch-manipulation">
        <SelectValue>
          {language.toUpperCase()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white border-gray-200 shadow-lg z-[60]">
        <SelectItem value="ro" className="hover:bg-gray-100 touch-manipulation">
          RO
        </SelectItem>
        <SelectItem value="en" className="hover:bg-gray-100 touch-manipulation">
          EN
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
