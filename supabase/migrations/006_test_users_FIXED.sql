-- Fix RLS policies for test_users table
-- Run this in Supabase SQL Editor

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can sign up as test user" ON test_users;
DROP POLICY IF EXISTS "Authenticated users can view test users" ON test_users;

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS test_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  x_profile TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE test_users ENABLE ROW LEVEL SECURITY;

-- IMPORTANT: Allow anonymous users to INSERT (for public signup form)
-- This is the key policy that was missing or not working
CREATE POLICY "Allow anonymous signups"
  ON test_users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert (optional)
CREATE POLICY "Allow authenticated signups"
  ON test_users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to read (for admin dashboard)
CREATE POLICY "Authenticated users can view test users"
  ON test_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_test_users_email ON test_users(email);

-- Verify the policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'test_users';

