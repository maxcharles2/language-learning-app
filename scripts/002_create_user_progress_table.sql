-- Create user progress table to track quiz attempts
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id UUID, -- Optional: group answers by quiz session
  
  -- Prevent duplicate answers for the same question in the same session
  UNIQUE(user_id, question_id, session_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user_progress table
-- Users can only see their own progress
CREATE POLICY "user_progress_select_own" 
  ON public.user_progress FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can only insert their own progress
CREATE POLICY "user_progress_insert_own" 
  ON public.user_progress FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress (for retakes)
CREATE POLICY "user_progress_update_own" 
  ON public.user_progress FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own progress
CREATE POLICY "user_progress_delete_own" 
  ON public.user_progress FOR DELETE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_question_id ON public.user_progress(question_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_session_id ON public.user_progress(session_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_answered_at ON public.user_progress(answered_at);
