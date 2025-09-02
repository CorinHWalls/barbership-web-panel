-- Update profiles table to support role arrays
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ALTER COLUMN role TYPE text[];

-- Update existing profiles to use array format
UPDATE profiles SET role = ARRAY[role::text] WHERE role IS NOT NULL;

-- Add constraint to ensure valid roles
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
CHECK (role <@ ARRAY['admin', 'owner', 'barber', 'client']);

-- Enable realtime
alter publication supabase_realtime add table profiles;
