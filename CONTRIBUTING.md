# Contributing to Filter.AI

Thank you for your interest in contributing to Filter.AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/khajaaijaz26/Filter.AI/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear feature description
   - Use case and benefits
   - Possible implementation approach
   - Mockups or examples if applicable

### Code Contributions

#### Setup Development Environment

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/Filter.AI.git
cd Filter.AI
```

3. Install dependencies:
```bash
npm install --legacy-peer-deps
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your local configuration
```

5. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

6. Run development server:
```bash
npm run dev
```

#### Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. Make your changes following our coding standards
3. Write or update tests if applicable
4. Run linter and fix issues:
```bash
npm run lint
```

5. Build to ensure no errors:
```bash
npm run build
```

6. Commit your changes:
```bash
git add .
git commit -m "feat: add your feature description"
```

#### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add export to PDF functionality
fix: resolve authentication redirect issue
docs: update installation instructions
```

#### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass and linting is clean
3. Push to your fork:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request with:
   - Clear title and description
   - Link to related issue (if applicable)
   - Screenshots or demos (if applicable)
   - List of changes made

5. Wait for review and address feedback

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Component Structure

```tsx
// Imports
import { useState } from 'react'

// Types
interface Props {
  name: string
}

// Component
export default function Component({ name }: Props) {
  // State and hooks
  const [state, setState] = useState('')

  // Event handlers
  const handleClick = () => {
    // Implementation
  }

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### File Organization

```
app/
  ├── api/          # API routes
  ├── [page]/       # Page routes
  └── layout.tsx    # Layouts

components/         # Reusable components
  └── Component.tsx

lib/               # Utility libraries
  └── utils.ts

types/             # TypeScript types
  └── types.d.ts
```

### API Routes

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Validate input data
- Handle errors gracefully
- Add authentication checks when needed

### Database Changes

1. Create a Prisma migration:
```bash
npx prisma migrate dev --name your_migration_name
```

2. Update Prisma client:
```bash
npx prisma generate
```

3. Test the migration locally

## Testing

### Manual Testing

1. Test on different browsers (Chrome, Firefox, Safari)
2. Test responsive design on mobile devices
3. Test all user flows end-to-end
4. Test edge cases and error scenarios

### Automated Testing (Future)

We plan to add:
- Unit tests with Jest
- Integration tests
- E2E tests with Playwright

## Documentation

- Update README.md for user-facing changes
- Update DEPLOYMENT.md for deployment-related changes
- Add JSDoc comments for complex functions
- Update API documentation if adding/modifying endpoints

## Questions?

- Open a discussion on GitHub
- Check existing documentation
- Ask in pull request comments

## Recognition

Contributors will be:
- Listed in project credits
- Mentioned in release notes
- Acknowledged in the community

Thank you for contributing to Filter.AI! 🎉
