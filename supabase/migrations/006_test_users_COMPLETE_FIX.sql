-- COMPLETE FIX for test_users RLS policies
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop ALL existing policies (clean slate)
DROP POLICY IF EXISTS "Anyone can sign up as test user" ON test_users;
DROP POLICY IF EXISTS "Authenticated users can view test users" ON test_users;
DROP POLICY IF EXISTS "Allow anonymous signups" ON test_users;
DROP POLICY IF EXISTS "Allow authenticated signups" ON test_users;
DROP POLICY IF EXISTS "Public can insert" ON test_users;

-- Step 2: Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS test_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  x_profile TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Enable RLS
ALTER TABLE test_users ENABLE ROW LEVEL SECURITY;

-- Step 4: Grant necessary permissions to anon role
-- This is CRITICAL - anon role needs explicit table permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT ON test_users TO anon;
-- Note: No sequence needed - we use gen_random_uuid() which doesn't require a sequence

-- Step 5: Grant permissions to authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT ON test_users TO authenticated;
-- Note: No sequence needed - we use gen_random_uuid() which doesn't require a sequence

-- Step 6: Create RLS policies
-- Policy 1: Allow anonymous users to INSERT
CREATE POLICY "anon_insert_test_users"
  ON test_users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 2: Allow authenticated users to INSERT
CREATE POLICY "authenticated_insert_test_users"
  ON test_users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Allow authenticated users to SELECT (for admin dashboard)
CREATE POLICY "authenticated_select_test_users"
  ON test_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Step 7: Verify everything is set up correctly
DO $$
DECLARE
  policy_count INTEGER;
  grant_count INTEGER;
BEGIN
  -- Count policies
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE tablename = 'test_users';
  
  -- Count grants
  SELECT COUNT(*) INTO grant_count
  FROM information_schema.table_privileges
  WHERE table_name = 'test_users'
  AND grantee IN ('anon', 'authenticated');
  
  RAISE NOTICE '✅ Policies created: %', policy_count;
  RAISE NOTICE '✅ Grants configured: %', grant_count;
  
  IF policy_count >= 2 THEN
    RAISE NOTICE '✅ RLS setup looks good!';
  ELSE
    RAISE WARNING '⚠️  Only % policies found. Expected at least 2.', policy_count;
  END IF;
END $$;

-- Step 8: Show final status
SELECT 
  'Policy Status' as check_type,
  policyname,
  roles::text as roles,
  cmd as command,
  CASE 
    WHEN with_check = 'true' THEN '✅'
    ELSE '❌'
  END as with_check
FROM pg_policies 
WHERE tablename = 'test_users'
ORDER BY policyname;

SELECT 
  'Grant Status' as check_type,
  grantee,
  privilege_type,
  CASE 
    WHEN privilege_type IN ('INSERT', 'SELECT') THEN '✅'
    ELSE '⚠️'
  END as status
FROM information_schema.table_privileges
WHERE table_name = 'test_users'
AND grantee IN ('anon', 'authenticated')
ORDER BY grantee, privilege_type;

