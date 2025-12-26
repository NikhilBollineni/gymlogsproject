# 🔧 Complete RLS Troubleshooting Guide

If you're still getting "Database permission error" after running the SQL, follow these steps:

## Step 1: Run the Complete Fix SQL

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **"New query"**
3. Copy the **ENTIRE** contents of `supabase/migrations/006_test_users_COMPLETE_FIX.sql`
4. Paste it into the editor
5. Click **"Run"** (or Cmd/Ctrl + Enter)
6. **Check the output** - you should see:
   - `✅ Policies created: 3`
   - `✅ Grants configured: X`
   - A table showing all policies
   - A table showing all grants

## Step 2: Verify the Output

After running the SQL, you should see:

### Policy Status Table:
- `anon_insert_test_users` with `roles: {anon}` and `command: INSERT` ✅
- `authenticated_insert_test_users` with `roles: {authenticated}` and `command: INSERT` ✅
- `authenticated_select_test_users` with `roles: {authenticated}` and `command: SELECT` ✅

### Grant Status Table:
- `anon` with `INSERT` ✅
- `anon` with `SELECT` ✅
- `authenticated` with `INSERT` ✅
- `authenticated` with `SELECT` ✅

## Step 3: Test Directly in Supabase

Before testing on Netlify, test directly in Supabase:

1. Go to **Supabase Dashboard** → **Table Editor**
2. Click on `test_users` table
3. Click **"Insert row"**
4. Enter an email (e.g., `test@example.com`)
5. Click **"Save"**

**If this works**, the RLS policy is correct and the issue is with Netlify/API.
**If this fails**, the RLS policy still needs fixing.

## Step 4: Check Netlify Environment Variables

Even if RLS is correct, if Netlify doesn't have the env vars, it won't work:

1. **Netlify Dashboard** → Your site → **Site settings** → **Environment variables**
2. Verify:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key

3. **Trigger a new deploy:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

## Step 5: Check Netlify Function Logs

After redeploy, test the form and check logs:

1. **Netlify Dashboard** → **Functions** → **All functions**
2. Find `/api/signup`
3. Click on it to see logs
4. Look for:
   - `Supabase Config Check: { hasUrl: true, hasKey: true }`
   - Any error messages

## Common Issues & Solutions

### Issue 1: "Policies created: 0"
**Solution:** The table might not exist. Run the SQL again, or manually create the table first.

### Issue 2: "Grants configured: 0"
**Solution:** The GRANT statements might have failed. Check if you have admin access to the database.

### Issue 3: Direct insert works, but API doesn't
**Solution:** This means RLS is fine, but:
- Check Netlify env variables are set
- Check Netlify function logs for errors
- Verify the Supabase URL/key are correct

### Issue 4: Still getting permission error after all steps
**Solution:** Try using the **service_role key** temporarily (NOT recommended for production, but good for testing):

1. In Supabase Dashboard → **Settings** → **API**
2. Copy the **service_role** key (NOT anon key)
3. In Netlify, temporarily change `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the service_role key
4. Redeploy and test

**⚠️ WARNING:** Service role key bypasses RLS. Only use for testing, then switch back to anon key!

## Still Not Working?

If none of the above works, the issue might be:

1. **Supabase project settings** - Check if RLS is enabled at the project level
2. **Network/firewall** - Netlify might be blocked from accessing Supabase
3. **API route code** - There might be a bug in how we're calling Supabase

Share the exact error message from Netlify function logs, and we can debug further!

