-- Create questions table for A1-level French vocabulary
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  french_word TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  options TEXT[] NOT NULL, -- Array of 4 multiple choice options
  correct_answer TEXT NOT NULL,
  difficulty_level TEXT NOT NULL DEFAULT 'A1',
  category TEXT NOT NULL, -- e.g., 'greetings', 'numbers', 'colors', 'family'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Create policies for questions table
-- Questions are read-only for authenticated users
CREATE POLICY "questions_select_authenticated" 
  ON public.questions FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Only allow service role to insert/update/delete questions
CREATE POLICY "questions_admin_only" 
  ON public.questions FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON public.questions(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_questions_category ON public.questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON public.questions(created_at);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_questions_updated_at 
  BEFORE UPDATE ON public.questions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
