
-- Add the missing updated_at column to ai_simulations table
ALTER TABLE ai_simulations 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE TRIGGER update_ai_simulations_updated_at
    BEFORE UPDATE ON ai_simulations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
