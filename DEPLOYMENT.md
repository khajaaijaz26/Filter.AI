# Deploying MindMesh to GitHub Pages

This guide explains how to deploy the MindMesh game to GitHub Pages so it's accessible via a live URL.

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys the game to GitHub Pages whenever you push to the `main` or `copilot/create-mindmesh-puzzle-game` branch.

### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment", select:
     - **Source**: GitHub Actions
   - Save the changes

2. **Trigger Deployment**:
   - The workflow will automatically run on the next push
   - Or manually trigger it:
     - Go to **Actions** tab
     - Select "Deploy MindMesh to GitHub Pages"
     - Click "Run workflow"

3. **Access Your Game**:
   - Once deployed, your game will be available at:
     - `https://khajaaijaz26.github.io/Filter.AI/`
   - The deployment typically takes 1-2 minutes

## Manual Deployment

If you prefer to deploy manually:

```bash
# 1. Build the production version
npm run build

# 2. The built files will be in the dist/ folder

# 3. Deploy using GitHub Pages CLI (install gh-pages)
npm install -g gh-pages
gh-pages -d dist

# Or upload the dist/ folder to any static hosting service:
# - Netlify (drag & drop)
# - Vercel (import repo)
# - AWS S3
# - Firebase Hosting
```

## Verifying Deployment

After deployment:
1. Visit your GitHub Pages URL
2. You should see the MindMesh loading screen
3. The game should start automatically
4. Try clicking on matching blocks to test gameplay

## Troubleshooting

### 404 Error
- Check that GitHub Pages is enabled in repository settings
- Verify the source is set to "GitHub Actions"
- Check the Actions tab for any workflow errors

### Game Not Loading
- Check browser console (F12) for JavaScript errors
- Verify all assets were included in the dist/ folder
- Try clearing browser cache and reloading

### Build Failures
- Check that all dependencies are installed (`npm install`)
- Verify Node.js version is 16 or higher
- Check the Actions workflow logs for specific errors

## Updating the Game

To update the deployed game:
1. Make your code changes
2. Commit and push to the branch
3. The workflow will automatically rebuild and redeploy
4. Changes will be live in 1-2 minutes

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `dist/` folder with your domain
2. Configure your domain's DNS settings to point to GitHub Pages
3. Enable custom domain in repository Settings → Pages

For more details, see: https://docs.github.com/en/pages
