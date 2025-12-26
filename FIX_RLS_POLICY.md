# 🔧 Fix RLS Policy Error

You're getting "Database permission error" because the RLS policy isn't allowing anonymous inserts. Follow these steps:

## Step 1: Run This SQL in Supabase

1. Go to your **Supabase Dashboard**
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**
4. Copy and paste this entire SQL script:

```sql
-- Fix RLS policies for test_users table
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can sign up as test user" ON test_users;
DROP POLICY IF EXISTS "Authenticated users can view test users" ON test_users;
DROP POLICY IF EXISTS "Allow anonymous signups" ON test_users;
DROP POLICY IF EXISTS "Allow authenticated signups" ON test_users;

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
```

5. Click **"Run"** (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned" or similar

## Step 2: Verify the Policy

Run this query to check if the policy was created:

```sql
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies 
WHERE tablename = 'test_users';
```

You should see:
- `Allow anonymous signups` with `roles: {anon}` and `cmd: INSERT`
- `Allow authenticated signups` with `roles: {authenticated}` and `cmd: INSERT`

## Step 3: Test Again

1. Go back to your live site
2. Try the signup form again
3. It should work now! ✅

---

**If it still doesn't work**, check:
- Are the environment variables set correctly in Netlify?
- Did you trigger a new deploy after adding the env variables?
- Check Netlify function logs for any other errors

