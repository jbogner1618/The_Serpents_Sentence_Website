# GitHub Pages Deployment Guide

## Current Status
The repository is configured for automated deployment to GitHub Pages using GitHub Actions. However, **GitHub Pages must be enabled in the repository settings** for the deployment to work.

## Required Setup Steps

### 1. Enable GitHub Pages
1. Go to the repository settings: https://github.com/jbogner1618/The_Serpents_Sentence_Website/settings/pages
2. Under "Source", select **"GitHub Actions"**
3. Save the changes

### 2. Verify Deployment
After enabling GitHub Pages:
1. Push any commit to the `main` branch (or manually trigger the workflow)
2. Check the Actions tab to see the deployment workflow run
3. Once successful, the site will be available at: https://jbogner1618.github.io/The_Serpents_Sentence_Website/

## Deployment Configuration

### Current Setup:
- ✅ **Vite Config**: Base path set to `/The_Serpents_Sentence_Website/`
- ✅ **GitHub Actions**: Workflow configured in `.github/workflows/deploy.yml`
- ✅ **Build Process**: Includes SEO file generation (`sitemap.xml`, `robots.txt`, `llms.txt`)
- ✅ **Jekyll Bypass**: `.nojekyll` file prevents Jekyll processing
- ✅ **Asset Paths**: All assets correctly prefixed for subdirectory deployment

### Build Process:
1. **SEO Generation**: Generates `sitemap.xml`, `robots.txt`, and `llms.txt`
2. **Vite Build**: Creates optimized production build in `dist/`
3. **Artifact Upload**: GitHub Actions uploads the `dist/` directory
4. **Deployment**: GitHub Pages deploys the uploaded artifacts

## Troubleshooting

### Common Issues:
1. **404 Deployment Error**: GitHub Pages is not enabled (see step 1 above)
2. **Asset Loading Issues**: Verify base path in `vite.config.js` matches repository name
3. **Routing Issues**: Ensure client-side routing handles the base path correctly

### Verifying Configuration:
- Repository name: `The_Serpents_Sentence_Website`
- Expected URL: `https://jbogner1618.github.io/The_Serpents_Sentence_Website/`
- Base path in Vite: `/The_Serpents_Sentence_Website/`

## SEO Optimization

The site includes comprehensive SEO optimization:
- **Sitemap**: Auto-generated with all article URLs
- **Robots.txt**: Configured to allow search engines and LLMs
- **Meta Tags**: Each page includes Open Graph and Twitter Card metadata
- **LLM Content**: Special `llms.txt` file for AI/LLM parsing

## Manual Deployment (Alternative)

If automated deployment fails, you can manually build and deploy:

```bash
# Build the project
npm run build

# The dist/ folder contains all files ready for deployment
# Upload the contents of dist/ to any static hosting service
```

## Notes
- The deployment is configured for a subdirectory setup (repository pages, not user/organization pages)
- All links and assets are configured to work with the `/The_Serpents_Sentence_Website/` base path
- The workflow runs on every push to `main` branch and can be manually triggered