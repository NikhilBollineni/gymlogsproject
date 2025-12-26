# 🔧 Netlify Environment Variables Setup

After deploying to Netlify, you need to add your Supabase credentials so the signup form works.

## Steps:

1. **Go to your Netlify site dashboard**
   - Visit: https://app.netlify.com
   - Click on your site (`gymlogsproject`)

2. **Navigate to Site Settings**
   - Click **"Site settings"** in the top menu
   - Click **"Environment variables"** in the left sidebar

3. **Add these two variables:**

   **Variable 1:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://whcqqszrdpwkyaexkled.supabase.co`
   - Click **"Add variable"**

   **Variable 2:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key (get it from Supabase Dashboard → Settings → API → anon public key)
   - Click **"Add variable"**

4. **Redeploy your site**
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

5. **Create the database table**
   - Go to your Supabase Dashboard
   - Click **"SQL Editor"**
   - Run the SQL from `supabase/migrations/006_test_users.sql` (or copy-paste below)

## SQL to Run in Supabase:

```sql
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
```

## ✅ After Setup:

- Test the signup form on your live site
- Check Supabase Dashboard → Table Editor → `test_users` to see signups
- The form will now save emails to your database!

---

**Note**: If you don't set up Supabase, the form will still show success but won't save data. The API will log signups to Netlify logs for debugging.

