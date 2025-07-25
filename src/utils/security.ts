
import { z } from 'zod';

// Password strength validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove basic HTML brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Text sanitization for display (XSS prevention)
export const sanitizeText = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  return text
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocols
    .replace(/vbscript:/gi, '') // Remove vbscript: protocols
    .trim();
};

// Email validation with additional security checks
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(254, 'Email too long')
  .refine(
    (email) => !email.includes('..'), 
    'Email cannot contain consecutive dots'
  )
  .refine(
    (email) => !email.startsWith('.') && !email.endsWith('.'),
    'Email cannot start or end with a dot'
  );

// Safe HTML content validation for charts
export const sanitizeChartData = (data: any): any => {
  if (typeof data === 'string') {
    return data.replace(/<[^>]*>/g, ''); // Strip HTML tags
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeChartData);
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeChartData(value);
    }
    return sanitized;
  }
  return data;
};

// Rate limiting helper for authentication attempts
export const createRateLimiter = (maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return {
    isRateLimited: (identifier: string): boolean => {
      const now = Date.now();
      const userAttempts = attempts.get(identifier);
      
      if (!userAttempts || now > userAttempts.resetTime) {
        attempts.set(identifier, { count: 1, resetTime: now + windowMs });
        return false;
      }
      
      if (userAttempts.count >= maxAttempts) {
        return true;
      }
      
      userAttempts.count++;
      return false;
    },
    
    reset: (identifier: string) => {
      attempts.delete(identifier);
    }
  };
};

// Form validation schemas
export const profileUpdateSchema = z.object({
  full_name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(sanitizeInput),
  email: emailSchema
});

export const careerPlanSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title too long')
    .transform(sanitizeInput),
  description: z.string()
    .max(500, 'Description too long')
    .transform(sanitizeInput),
  target_role: z.string()
    .min(2, 'Target role must be at least 2 characters')
    .max(100, 'Target role too long')
    .transform(sanitizeInput)
});

export const milestoneSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title too long')
    .transform(sanitizeInput),
  description: z.string()
    .max(500, 'Description too long')
    .transform(sanitizeInput),
  resources: z.array(z.string().transform(sanitizeInput)).optional()
});
