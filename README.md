# Filter.AI - AI-Powered App Builder 🚀

An AI-powered web platform where users can build apps, websites, landing pages, and presentations using text prompts — all in one place.

![Filter.AI](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![License](https://img.shields.io/badge/License-ISC-green)

## ✨ Features

- **AI Code Generator**: Generate complete applications from simple text descriptions
- **Multiple Templates**: Choose from websites, landing pages, React apps, admin panels, and presentations
- **Live Preview**: See your changes instantly with a live preview sandbox
- **One-Click Export**: Download projects as ZIP files
- **Deploy to Vercel**: Publish your projects with automatic deployment
- **Authentication**: Sign in with email or Google OAuth
- **User Dashboard**: Save and manage all your projects
- **Usage Limits**: Free tier with 10 generations per user

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 📦 Prerequisites

Before you begin, ensure you have installed:

- Node.js 18+ and npm
- PostgreSQL database
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/khajaaijaz26/Filter.AI.git
cd Filter.AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/filterai?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI API (optional - for enhanced AI features)
OPENAI_API_KEY="your-openai-api-key"

# Vercel API (optional - for real deployments)
VERCEL_TOKEN="your-vercel-token"
```

### 4. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Project Structure

```
Filter.AI/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── generate/         # AI generation endpoint
│   │   ├── export/           # Export to ZIP
│   │   ├── deploy/           # Deploy to Vercel
│   │   └── projects/         # Project CRUD operations
│   ├── auth/                 # Auth pages (signin/signup)
│   ├── dashboard/            # User dashboard
│   ├── generator/            # AI code generator page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── AuthProvider.tsx      # Auth context provider
│   └── Navbar.tsx            # Navigation component
├── lib/                      # Utility libraries
│   ├── auth.ts               # NextAuth configuration
│   └── prisma.ts             # Prisma client
├── prisma/                   # Database schema
│   └── schema.prisma         # Prisma schema
├── types/                    # TypeScript type definitions
└── public/                   # Static assets
```

## 🎯 Usage Guide

### Creating Your First Project

1. **Sign Up**: Create an account or sign in with Google
2. **Choose Template**: Select from website, landing page, React app, admin panel, or presentation
3. **Describe Your Project**: Enter a detailed text prompt describing what you want to build
4. **Generate**: Click the generate button to create your project
5. **Preview**: View the live preview of your generated code
6. **Save/Export**: Save to your dashboard or download as ZIP
7. **Deploy**: One-click deploy to Vercel (optional)

### Available Templates

- **Website**: Multi-page website with navigation
- **Landing Page**: Single-page marketing site
- **React App**: Interactive React application
- **Admin Panel**: Dashboard with sidebar navigation
- **Presentation**: Slide deck presentation

## 🔐 Authentication

Filter.AI supports two authentication methods:

1. **Email/Password**: Traditional email and password authentication
2. **Google OAuth**: Sign in with your Google account

To enable Google OAuth:
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Add credentials to `.env` file

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

Alternatively, use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Environment Variables for Production

Make sure to set all required environment variables in your Vercel project settings:

- `DATABASE_URL`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `VERCEL_TOKEN` (for auto-deployment feature)

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Run production build locally
npm start
```

## 🐛 Troubleshooting

Having issues with deployment or getting errors? Check out our comprehensive troubleshooting guide:

**[📖 TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solutions for common issues including:
- 404 NOT_FOUND errors on Vercel
- Database connection issues
- Environment variable problems
- Build and deployment errors

**Quick fix for 404 errors:**
1. Set all environment variables in Vercel (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
2. Redeploy your application
3. Run database migrations

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed instructions.

## 📊 Database Schema

The application uses the following main models:

- **User**: User accounts and authentication
- **Account**: OAuth account linking
- **Session**: User sessions
- **Project**: Generated projects
- **VerificationToken**: Email verification tokens

## 🔧 Configuration

### Prisma Configuration

Edit `prisma/schema.prisma` to modify the database schema. After making changes:

```bash
npx prisma migrate dev
npx prisma generate
```

### Tailwind Configuration

Customize styles in `tailwind.config.ts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Authentication with [NextAuth.js](https://next-auth.js.org/)
- Database with [Prisma](https://www.prisma.io/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ by the Filter.AI team**