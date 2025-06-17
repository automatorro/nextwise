
-- Create table for storing career chat messages
CREATE TABLE public.career_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('user', 'ai')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.career_chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own messages
CREATE POLICY "Users can view their own chat messages" 
  ON public.career_chat_messages 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own messages
CREATE POLICY "Users can create their own chat messages" 
  ON public.career_chat_messages 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_career_chat_messages_session_id ON public.career_chat_messages(session_id);
CREATE INDEX idx_career_chat_messages_user_id ON public.career_chat_messages(user_id);
