
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { passwordSchema } from '@/utils/security';

interface SecurePasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  showStrengthIndicator?: boolean;
}

export const SecurePasswordInput = ({ 
  value, 
  onChange, 
  placeholder = "Enter password",
  label = "Password",
  showStrengthIndicator = true
}: SecurePasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const validatePassword = (password: string) => {
    const checks = [
      { label: 'At least 8 characters', test: password.length >= 8 },
      { label: 'Contains uppercase letter', test: /[A-Z]/.test(password) },
      { label: 'Contains lowercase letter', test: /[a-z]/.test(password) },
      { label: 'Contains number', test: /[0-9]/.test(password) },
      { label: 'Contains special character', test: /[^A-Za-z0-9]/.test(password) }
    ];
    
    return checks;
  };

  const passwordChecks = validatePassword(value);
  const validChecks = passwordChecks.filter(check => check.test).length;
  const strength = validChecks / passwordChecks.length;

  const getStrengthColor = () => {
    if (strength < 0.4) return 'bg-red-500';
    if (strength < 0.7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 0.4) return 'Weak';
    if (strength < 0.7) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="password">{label}</Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {showStrengthIndicator && value && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${strength * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">{getStrengthText()}</span>
          </div>
          
          <div className="space-y-1">
            {passwordChecks.map((check, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                {check.test ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <X className="h-3 w-3 text-red-500" />
                )}
                <span className={check.test ? 'text-green-600' : 'text-red-600'}>
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
