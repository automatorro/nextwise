
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  initialData: {
    fullName: string;
    email: string;
  };
}

const ProfileEditForm = ({ initialData }: ProfileEditFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Update email in Supabase Auth if changed
      if (data.email !== initialData.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email
        });
        
        if (emailError) throw emailError;
        
        toast({
          title: t('common.success'),
          description: t('profile.profileUpdated'),
        });
      }

      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: data.fullName })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { full_name: data.fullName }
      });

      if (metadataError) throw metadataError;

      toast({
        title: t('common.success'),
        description: t('profile.profileUpdated'),
      });

    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la actualizarea profilului.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.personalInfo')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.fullName')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduceți numele complet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Introduceți adresa de email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting ? t('common.loading') : t('profile.updateProfile')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditForm;
