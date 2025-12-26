# 🔍 Debug RLS Issue

Since you're still getting the permission error, let's debug step by step:

## Step 1: Verify Policies Were Created

Run this in Supabase SQL Editor:

```sql
SELECT 
  policyname,
  roles::text as roles,
  cmd as command
FROM pg_policies 
WHERE tablename = 'test_users'
ORDER BY policyname;
```

**Expected output:** You should see 3 policies:
- `anon_insert_test_users`
- `authenticated_insert_test_users`  
- `authenticated_select_test_users`

**If you see 0 policies**, the CREATE POLICY statements failed. Run the fix SQL again.

## Step 2: Test Direct Insert (Most Important!)

Run the `TEST_RLS_DIRECTLY.sql` script. This will:
1. Check if policies exist
2. Try to insert as the `anon` role (simulating what your API does)
3. Show you the exact error if it fails

**If the direct insert works**, the issue is with Netlify/API configuration.
**If the direct insert fails**, the RLS policy is still wrong.

## Step 3: Check Netlify Function Logs

1. Go to **Netlify Dashboard** → **Functions** → **All functions**
2. Find `/api/signup`
3. Click on it to see detailed logs
4. Look for the new error message - it should now show:
   - The exact error code
   - The exact error message
   - Whether Supabase client is configured

## Step 4: Verify Environment Variables

Even if RLS is correct, wrong env vars will cause issues:

1. **Netlify Dashboard** → **Site settings** → **Environment variables**
2. Verify:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your full Supabase URL (e.g., `https://xxxxx.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon key (starts with `eyJ...`)

3. **Important:** After checking/updating, trigger a new deploy:
   - **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

## Step 5: Alternative - Test with Service Role Key (Temporary)

If nothing works, we can temporarily use the service_role key to bypass RLS (for testing only):

1. **Supabase Dashboard** → **Settings** → **API**
2. Copy the **service_role** key (NOT anon key - this bypasses RLS)
3. In Netlify, temporarily change `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the service_role key
4. Redeploy and test

**⚠️ WARNING:** Service role key bypasses ALL RLS. Only use for testing, then switch back!

---

**Next Steps:**
1. Run `TEST_RLS_DIRECTLY.sql` and share the results
2. Check Netlify function logs and share the exact error
3. Verify environment variables are set correctly

This will help us pinpoint the exact issue!

