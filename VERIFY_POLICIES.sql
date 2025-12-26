-- Quick check to verify RLS policies exist
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

