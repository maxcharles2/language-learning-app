-- Create quiz sessions table to group questions and track overall performance
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  score_percentage DECIMAL(5,2), -- Calculated field: (correct_answers / total_questions) * 100
  difficulty_level TEXT NOT NULL DEFAULT 'A1',
  category TEXT -- Optional: if quiz focuses on specific category
);

-- Enable Row Level Security
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz_sessions table
-- Users can only see their own sessions
CREATE POLICY "quiz_sessions_select_own" 
  ON public.quiz_sessions FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can only insert their own sessions
CREATE POLICY "quiz_sessions_insert_own" 
  ON public.quiz_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own sessions
CREATE POLICY "quiz_sessions_update_own" 
  ON public.quiz_sessions FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own sessions
CREATE POLICY "quiz_sessions_delete_own" 
  ON public.quiz_sessions FOR DELETE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_id ON public.quiz_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_started_at ON public.quiz_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_difficulty ON public.quiz_sessions(difficulty_level);

-- Add trigger to calculate score percentage when session is completed
CREATE OR REPLACE FUNCTION calculate_quiz_score()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.completed_at IS NOT NULL AND OLD.completed_at IS NULL THEN
        NEW.score_percentage = CASE 
            WHEN NEW.total_questions > 0 THEN 
                ROUND((NEW.correct_answers::DECIMAL / NEW.total_questions::DECIMAL) * 100, 2)
            ELSE 0 
        END;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_quiz_sessions_score 
  BEFORE UPDATE ON public.quiz_sessions 
  FOR EACH ROW EXECUTE FUNCTION calculate_quiz_score();
