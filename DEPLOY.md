# Deploy to Netlify - Quick Guide

## Option 1: Deploy via Netlify Dashboard (Easiest - No CLI needed)

1. **Push your code to GitHub** (if not already):
   ```bash
   cd web-landing
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Netlify**:
   - Visit [https://app.netlify.com](https://app.netlify.com)
   - Sign up/Login (you can use GitHub to sign in)

3. **Add New Site**:
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your repository
   - Netlify will auto-detect Next.js settings

4. **Build Settings** (should auto-detect, but verify):
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (or leave empty - plugin handles it)
   - **Node version**: `20` (or latest)

5. **Deploy**:
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-site-name.netlify.app`

6. **Custom Domain** (Optional):
   - Go to Site settings → Domain management
   - Add your custom domain

---

## Option 2: Deploy via Netlify CLI (For developers)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Navigate to your project**:
   ```bash
   cd web-landing
   ```

4. **Initialize and Deploy**:
   ```bash
   netlify init
   # Follow prompts:
   # - Create & configure a new site
   # - Team: Choose your team
   # - Site name: (or leave blank for auto-generated)
   # - Build command: npm run build
   # - Directory to deploy: .next (or leave empty)
   ```

5. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

---

## Important Notes:

- ✅ The `netlify.toml` file is already configured
- ✅ The `@netlify/plugin-nextjs` plugin is installed
- ✅ Build command: `npm run build`
- ✅ Your API route (`/api/signup`) will work automatically on Netlify

## Troubleshooting:

- **Build fails?** Check Netlify build logs in the dashboard
- **API not working?** Make sure your API routes are in `app/api/` folder (✅ already done)
- **Styling issues?** Ensure Tailwind CSS is properly configured (✅ already done)

---

**Your site will be live in ~3 minutes!** 🚀

