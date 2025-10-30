# Deployment Guide for Filter.AI

This guide will help you deploy Filter.AI to Vercel in production.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A PostgreSQL database (we recommend [Vercel Postgres](https://vercel.com/storage/postgres) or [Supabase](https://supabase.com))
3. Google OAuth credentials (optional, for Google sign-in)

## Step 1: Set Up Database

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Click on "Storage" → "Create Database" → "Postgres"
3. Name your database and create it
4. Copy the `POSTGRES_URL` connection string

### Option B: Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → Database
3. Copy the connection string (Transaction mode)

## Step 2: Set Up Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`
6. Copy the Client ID and Client Secret

## Step 3: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install --legacy-peer-deps`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 4: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

### Required Variables

```
DATABASE_URL=your-postgres-connection-string
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-a-random-secret-here
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### Optional Variables (for Google OAuth)

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Optional Variables (for enhanced features)

```
OPENAI_API_KEY=your-openai-api-key
VERCEL_TOKEN=your-vercel-api-token
```

## Step 5: Run Database Migrations

After deployment, you need to run Prisma migrations:

### Option A: Using Vercel CLI

```bash
# Set DATABASE_URL in your local .env
DATABASE_URL="your-production-database-url"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

### Option B: Using Prisma Studio (GUI)

```bash
npx prisma studio
```

## Step 6: Verify Deployment

1. Visit your deployed URL: `https://your-domain.vercel.app`
2. Test the sign-up process
3. Create a test project
4. Verify all features are working

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Ensure `DATABASE_URL` is accessible from Vercel
- Check the build logs for specific errors

### Database Connection Issues

- Verify the `DATABASE_URL` format
- Ensure your database allows connections from Vercel IPs
- Check if you need to append `?pgbouncer=true` for connection pooling

### Authentication Issues

- Verify `NEXTAUTH_URL` matches your production domain
- Check Google OAuth redirect URIs include your production domain
- Ensure `NEXTAUTH_SECRET` is set and secure

### Performance Optimization

1. Enable Vercel Analytics
2. Configure database connection pooling
3. Add caching headers for static assets
4. Use Vercel Edge Functions for better performance

## Monitoring

- Monitor your application using [Vercel Analytics](https://vercel.com/analytics)
- Set up [Vercel Log Drains](https://vercel.com/docs/observability/log-drains) for error tracking
- Use Prisma Studio to monitor database usage

## Scaling

- Upgrade Vercel plan for higher limits
- Use database connection pooling (PgBouncer)
- Implement Redis caching for better performance
- Consider CDN for static assets

## Security Checklist

- ✅ Secure `NEXTAUTH_SECRET` generated
- ✅ HTTPS enabled (automatic with Vercel)
- ✅ Environment variables not exposed in client-side code
- ✅ Database credentials secured
- ✅ CORS properly configured
- ✅ Rate limiting enabled for API routes

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit [Vercel documentation](https://vercel.com/docs)
- Open an issue on GitHub

---

**Ready to deploy?** Follow the steps above and your Filter.AI platform will be live in minutes! 🚀
