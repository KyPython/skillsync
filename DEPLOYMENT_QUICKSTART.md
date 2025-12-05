# 🚀 Quick Deployment Guide

## TL;DR - Deploy in 10 Minutes

### 1. Render (Backend Services) - 5 min

1. **Go to**: https://dashboard.render.com
2. **Click**: "New +" → "Blueprint"
3. **Connect**: GitHub repo `KyPython/skillsync`
4. **Click**: "Apply" (Render auto-detects `render.yaml`)
5. **Wait**: ~10-15 minutes for all services to build

### 2. Vercel (Frontend) - 5 min

1. **Go to**: https://vercel.com
2. **Click**: "Add New..." → "Project"
3. **Import**: `KyPython/skillsync`
4. **Configure**:
   - Root Directory: `frontend`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output: `dist`
5. **Environment Variable**:
   ```
   VITE_API_URL=https://skillsync-api-gateway.onrender.com/api
   ```
6. **Click**: "Deploy"

## ⚠️ Important: Update URLs After Render Deploys

Once Render services are live, update:

1. **API Gateway** (Render Dashboard):
   - Add environment variables with actual Render URLs
   - Manual deploy to apply

2. **Frontend** (Vercel Dashboard):
   - Update `VITE_API_URL` with your actual API Gateway URL
   - Redeploy

## ✅ Done!

Your app will be live at:
- Frontend: `https://your-project.vercel.app`
- API: `https://skillsync-api-gateway.onrender.com`

See `DEPLOYMENT.md` for detailed instructions.

