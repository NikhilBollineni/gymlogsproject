-- Test RLS policies directly in Supabase
-- This will help us understand if the issue is with RLS or with the API

-- Step 1: Check if policies exist
SELECT 
  policyname,
  roles::text as roles,
  cmd as command,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'test_users'
ORDER BY policyname;

-- Step 2: Try to insert as anon role (simulate what the API does)
-- This uses the anon key to test if RLS allows the insert
SET ROLE anon;

-- Try inserting a test row
INSERT INTO test_users (email, x_profile)
VALUES ('test-' || gen_random_uuid()::text || '@example.com', 'test_profile')
RETURNING *;

-- Reset role
RESET ROLE;

-- Step 3: Check table permissions
SELECT 
  grantee,
  privilege_type,
  is_grantable
FROM information_schema.table_privileges
WHERE table_name = 'test_users'
AND grantee IN ('anon', 'authenticated', 'public')
ORDER BY grantee, privilege_type;

-- Step 4: Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'test_users';

