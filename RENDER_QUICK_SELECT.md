# Render Service Type Selection Guide

## 🎯 Which Option to Choose

When creating services in Render, here's what to select:

### For All Backend Services → **"Web Service"**

You need to create **4 Web Services**:

1. ✅ **Task Service** → Web Service
2. ✅ **Timer Service** → Web Service  
3. ✅ **Goals Service** → Web Service
4. ✅ **API Gateway** → Web Service

### ❌ Don't Choose:

- **Static Site** - Only for frontend (use Vercel instead)
- **Private Service** - For internal services only
- **Background Worker** - For scheduled tasks
- **Cron Job** - For scheduled jobs
- **Postgres** - Database (we're using MongoDB Atlas)
- **Key Value** - Redis/cache (not needed)
- **Blueprint** - Requires payment info (use manual deployment)

## 📋 Quick Steps

1. Click **"Web Service"**
2. Connect your GitHub repo: `KyPython/skillsync`
3. Follow the configuration in `RENDER_DEPLOYMENT_STEPS.md`

## 🚀 Service Order

Deploy in this order:
1. **Task Service** (Web Service)
2. **Timer Service** (Web Service)
3. **Goals Service** (Web Service) 
4. **API Gateway** (Web Service) - Deploy LAST

All services = **Web Service** type! ✅

