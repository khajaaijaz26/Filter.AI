# Troubleshooting Guide - Filter.AI

## Common Deployment Issues

### 404 NOT_FOUND Error on Vercel

If you see `404: NOT_FOUND` or `Code: NOT_FOUND` error after deploying to Vercel, follow these steps:

#### 1. Check Environment Variables

The most common cause is missing environment variables. Ensure you have set ALL required variables in Vercel:

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Required Variables:**
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-generated-secret-min-32-characters
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

⚠️ **Important:** After adding environment variables, you MUST redeploy:
- Go to Deployments tab
- Click the three dots (...) on the latest deployment
- Click "Redeploy"

#### 2. Set Up Database First

You need a PostgreSQL database before deploying:

**Option A: Vercel Postgres (Easiest)**
1. In Vercel Dashboard → Storage → Create Database → Postgres
2. Copy the `POSTGRES_URL` 
3. Add it as `DATABASE_URL` in environment variables

**Option B: Supabase**
1. Create project at [supabase.com](https://supabase.com)
2. Go to Project Settings → Database
3. Copy connection string (Transaction mode)
4. Add it as `DATABASE_URL` in environment variables

#### 3. Run Database Migrations

After setting up the database, you need to run migrations:

```bash
# Install dependencies
npm install --legacy-peer-deps

# Set your production DATABASE_URL in .env
DATABASE_URL="your-production-database-url"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

Alternatively, use Vercel CLI:
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

#### 4. Check Build Logs

1. Go to Vercel Dashboard → Deployments
2. Click on your deployment
3. Click "Building" or "View Function Logs"
4. Look for errors in the logs

Common build errors:
- `Prisma Client not found` → Add `postinstall` script (already included)
- `DATABASE_URL not found` → Set environment variable
- `Module not found` → Ensure all dependencies are in package.json

#### 5. Verify Deployment Settings

In Vercel project settings, ensure:

**Framework Preset:** Next.js
**Build Command:** `npm run build` (or leave empty for auto-detect)
**Install Command:** `npm install --legacy-peer-deps`
**Output Directory:** `.next` (usually auto-detected)

#### 6. Check Domain/Route

If you're trying to access a specific route, make sure:
- You're using the correct Vercel URL (e.g., `https://project-name.vercel.app`)
- You're accessing the root URL first: `https://your-project.vercel.app/`
- If using a custom domain, ensure DNS is configured correctly

### Other Common Errors

#### "Internal Server Error" (500)

**Cause:** Runtime error, usually database connection issues

**Fix:**
1. Check DATABASE_URL is correct and accessible
2. Verify database allows connections from Vercel
3. Check Function Logs in Vercel dashboard

#### "Application Error" on Homepage

**Cause:** Missing NEXTAUTH_SECRET or NEXTAUTH_URL

**Fix:**
1. Add both NEXTAUTH_SECRET and NEXTAUTH_URL to environment variables
2. Ensure NEXTAUTH_URL matches your Vercel deployment URL (including https://)
3. Redeploy after adding variables

#### Database Connection Timeout

**Cause:** Database connection limit reached or wrong connection string

**Fix:**
1. Use connection pooling: Add `?pgbouncer=true` to DATABASE_URL
2. For Vercel Postgres, use `POSTGRES_URL` instead of `POSTGRES_URL_NON_POOLING`
3. Check your database allows external connections

#### Google OAuth Not Working

**Cause:** Redirect URI not configured in Google Console

**Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. OAuth 2.0 Credentials → Edit your client
3. Add authorized redirect URI: `https://your-project.vercel.app/api/auth/callback/google`
4. Save and wait 5-10 minutes for changes to propagate

## Step-by-Step Recovery for 404 Error

If you're currently seeing a 404 error, follow these steps in order:

### Step 1: Set Environment Variables
```bash
# In Vercel Dashboard → Settings → Environment Variables, add:
DATABASE_URL=your-postgres-connection-string
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
```

### Step 2: Redeploy
- Vercel Dashboard → Deployments → Latest deployment → (...) → Redeploy

### Step 3: Run Migrations
```bash
# Locally, with production DATABASE_URL in .env
npx prisma migrate deploy
```

### Step 4: Test
- Visit: `https://your-project-name.vercel.app/`
- Try signing up: `https://your-project-name.vercel.app/auth/signup`
- Try generator: `https://your-project-name.vercel.app/generator`

## Useful Commands

```bash
# Check deployment logs
vercel logs

# Pull environment variables locally
vercel env pull

# Run build locally (simulates Vercel build)
npm run build

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

## Getting Help

If you're still experiencing issues:

1. **Check Vercel Function Logs:**
   - Vercel Dashboard → Your Project → Deployments → [Your Deployment] → Function Logs

2. **Check Build Logs:**
   - Look for error messages during the build process

3. **Verify All Variables:**
   - Double-check all environment variables are set correctly
   - Ensure no typos in variable names

4. **Test Locally:**
   - Clone the repo
   - Set up `.env` file with your production values
   - Run `npm install --legacy-peer-deps && npm run dev`
   - If it works locally but not on Vercel, it's a deployment configuration issue

## Quick Checklist

Before asking for help, verify:

- [ ] DATABASE_URL is set in Vercel environment variables
- [ ] NEXTAUTH_URL is set and matches your Vercel URL (with https://)
- [ ] NEXTAUTH_SECRET is set (minimum 32 characters)
- [ ] Database is accessible from Vercel (test connection)
- [ ] Migrations have been run (`npx prisma migrate deploy`)
- [ ] You've redeployed after setting environment variables
- [ ] Build logs show successful build
- [ ] No errors in Function Logs

## Need More Help?

- Read [DEPLOYMENT.md](DEPLOYMENT.md) for full deployment guide
- Check [Vercel Documentation](https://vercel.com/docs)
- Open an issue on GitHub with:
  - Error message
  - Build logs
  - Function logs
  - Environment variables (without sensitive values)

---

**Most 404 errors are caused by missing environment variables. Set them and redeploy!**
