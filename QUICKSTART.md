# Quick Start Guide - Filter.AI

Get Filter.AI running locally in 5 minutes!

## 🚀 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git

## ⚡ Quick Setup

### 1. Clone & Install (1 minute)

```bash
git clone https://github.com/khajaaijaz26/Filter.AI.git
cd Filter.AI
npm install --legacy-peer-deps
```

### 2. Configure Environment (2 minutes)

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your database URL:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/filterai"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

### 3. Setup Database (1 minute)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run Development Server (30 seconds)

```bash
npm run dev
```

Visit: **http://localhost:3000**

## 🎉 You're Ready!

### What to Try First:

1. **Sign Up**: Create an account at `/auth/signup`
2. **Generate**: Go to `/generator` and try creating a website
3. **Save**: Save your project to your dashboard
4. **Export**: Download your project as a ZIP file

### Optional: Enable Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Update `.env`:
   ```
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

## 🐛 Troubleshooting

**Database connection error?**
```bash
# Check PostgreSQL is running
# Update DATABASE_URL in .env with correct credentials
```

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Build errors?**
```bash
rm -rf node_modules package-lock.json .next
npm install --legacy-peer-deps
npm run build
```

## 📚 Need Help?

- Read the full [README.md](README.md)
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- See [CONTRIBUTING.md](CONTRIBUTING.md) for development

## 🚀 Next Steps

- Customize templates in `/app/api/generate/route.ts`
- Add more features
- Deploy to Vercel (see [DEPLOYMENT.md](DEPLOYMENT.md))

---

**Having issues?** Open an issue on GitHub!
