-- Add resources column to career_milestones table
ALTER TABLE career_milestones 
ADD COLUMN resources jsonb DEFAULT NULL;

-- Add comment to explain the structure
COMMENT ON COLUMN career_milestones.resources IS 'Array of resource objects with type, title, url, description, estimatedHours, and isFree fields';