# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "New Project"**
3. **Import your repository**: `mohany6/Portfoilo`
4. **Configure the project**:
   - **Framework Preset**: Select "Other"
   - **Root Directory**: Leave as `/` (root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install`
5. **Click "Deploy"**

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project: Yes
   - Project name: portfolio-mohamed-hany
   - Directory: `./frontend`

## 🔧 Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/portfolio"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm install"
}
```

### .vercelignore
```
backend/
node_modules/
.env
dist/
build/
.angular/
```

## 🚨 Common Issues & Solutions

### Issue: "ng: command not found"
**Solution**: The build command now explicitly installs dependencies and runs the build from the frontend directory.

### Issue: Build fails with Angular errors
**Solution**: Ensure all dependencies are properly installed and the build script uses production configuration.

### Issue: Routes not working
**Solution**: The vercel.json configuration handles all routes and redirects them to the frontend build.

## 🌐 After Deployment

1. **Your portfolio will be live** at: `https://your-project-name.vercel.app`
2. **Custom domain** can be added in Vercel dashboard
3. **Automatic deployments** on every push to main branch
4. **Preview deployments** for pull requests

## 📝 Environment Variables

If you need to add environment variables:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add any required variables

## 🔄 Updating Your Portfolio

1. **Make changes** to your code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```
3. **Vercel automatically deploys** the updates

## 📞 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Angular Deployment**: [angular.io/guide/deployment](https://angular.io/guide/deployment)
- **GitHub Issues**: [github.com/mohany6/Portfoilo/issues](https://github.com/mohany6/Portfoilo/issues)

---

**Your portfolio will be live in minutes!** 🎉
