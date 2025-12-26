# ✅ Verify Netlify Environment Variables

The RLS error might be because environment variables aren't loaded. Follow these steps:

## Step 1: Verify Variables in Netlify

1. Go to **Netlify Dashboard** → Your site
2. Click **"Project configuration"** (or "Site settings")
3. Click **"Environment variables"**
4. **Verify both variables exist:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. **Check the values:**
   - URL should be: `https://whcqqszrdpwkyaexkled.supabase.co`
   - Key should be your Supabase anon key (starts with `eyJ...`)

## Step 2: Check for Common Issues

❌ **Wrong variable names?** 
- Must be exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Case-sensitive!

❌ **Extra spaces or quotes?**
- Remove any quotes around the values
- No trailing spaces

❌ **Old deploy?**
- Environment variables only load on NEW deploys
- You MUST trigger a new deploy after adding variables

## Step 3: Trigger a Fresh Deploy

1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for build to complete (2-3 minutes)

## Step 4: Check Function Logs

After redeploy, check if variables are loaded:

1. Go to **"Functions"** → **"All functions"**
2. Look for `/api/signup` function
3. Check the logs - you should see:
   ```
   Supabase Config Check: { hasUrl: true, hasKey: true, ... }
   ```

If you see `hasUrl: false` or `hasKey: false`, the variables aren't being loaded!

## Step 5: Verify RLS Policy in Supabase

Even if variables are set, double-check the RLS policy:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run this query to see all policies:

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

If you don't see these, run the fix SQL again.

---

**After verifying all of the above, test the form again!**

