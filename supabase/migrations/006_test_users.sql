-- Create test_users table for landing page signups
CREATE TABLE IF NOT EXISTS test_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  x_profile TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE test_users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for public signup form)
CREATE POLICY "Anyone can sign up as test user"
  ON test_users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can read (optional - for admin dashboard later)
CREATE POLICY "Authenticated users can view test users"
  ON test_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_test_users_email ON test_users(email);

