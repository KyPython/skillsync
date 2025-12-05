# Deployment Guide - SkillSync

This guide covers deploying SkillSync to **Render** (backend services) and **Vercel** (frontend).

## 🏗️ Architecture Overview

```
┌─────────────┐
│   Vercel    │ → Frontend (React)
│  (Frontend) │
└──────┬──────┘
       │
       │ API Calls
       │
┌──────▼──────────┐
│     Render     │ → API Gateway (Node.js)
│  (API Gateway) │
└──────┬──────────┘
       │
   ┌───┴───┬──────────┬──────────┐
   │       │          │          │
┌──▼──┐ ┌──▼──┐   ┌──▼──┐   ┌───▼──┐
│Task │ │Goal │   │Timer│   │Mongo │
│Java │ │ C#  │   │ Go  │   │  DB  │
└─────┘ └─────┘   └─────┘   └──────┘
```

## 📋 Prerequisites

- GitHub account (repository already pushed)
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- MongoDB Atlas account (optional, Render provides MongoDB)

## 🚀 Deployment Steps

### Step 1: Deploy Backend Services to Render

#### Option A: Using Render Blueprint (Recommended)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository: `KyPython/skillsync`
4. Render will detect `render.yaml` automatically
5. Review the services:
   - API Gateway
   - Task Service
   - Goals Service
   - Timer Service
   - MongoDB Database
6. Click **"Apply"** to deploy all services

#### Option B: Manual Service Creation

**1. MongoDB Database**
- New → PostgreSQL/MongoDB → MongoDB
- Name: `skillsync-mongodb`
- Plan: Free
- Note the connection string

**2. Task Service (Java)**
- New → Web Service
- Connect GitHub repo: `KyPython/skillsync`
- Name: `skillsync-task-service`
- Environment: Docker
- Dockerfile Path: `task-service/Dockerfile`
- Docker Context: `task-service`
- Build Command: (auto-detected)
- Start Command: (auto-detected)
- Environment Variables:
  ```
  SPRING_PROFILES_ACTIVE=production
  SERVER_PORT=8080
  ```

**3. Goals Service (C#)**
- New → Web Service
- Name: `skillsync-goals-service`
- Environment: Docker
- Dockerfile Path: `goals-service/Dockerfile`
- Docker Context: `goals-service`
- Environment Variables:
  ```
  ASPNETCORE_URLS=http://+:5001
  ConnectionStrings__MongoDB=<from MongoDB service>
  MongoDB__DatabaseName=skillsync_goals
  ```

**4. Timer Service (Go)**
- New → Web Service
- Name: `skillsync-timer-service`
- Environment: Docker
- Dockerfile Path: `timer-service/Dockerfile`
- Docker Context: `timer-service`
- Environment Variables:
  ```
  PORT=8082
  ```

**5. API Gateway (Node.js)**
- New → Web Service
- Name: `skillsync-api-gateway`
- Environment: Node
- Build Command: `npm install`
- Start Command: `node src/index.js`
- Root Directory: `api-gateway`
- Environment Variables:
  ```
  PORT=3000
  TASK_SERVICE_URL=https://skillsync-task-service.onrender.com
  GOALS_SERVICE_URL=https://skillsync-goals-service.onrender.com
  TIMER_SERVICE_URL=https://skillsync-timer-service.onrender.com
  ```

### Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Import Git Repository: `KyPython/skillsync`
4. Configure Project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Environment Variables:
   ```
   VITE_API_URL=https://skillsync-api-gateway.onrender.com/api
   ```
6. Click **"Deploy"**

### Step 3: Update API Gateway URLs

After all Render services are deployed, update the API Gateway environment variables with the actual Render URLs:

1. Go to Render Dashboard → `skillsync-api-gateway`
2. Environment → Add/Update:
   ```
   TASK_SERVICE_URL=https://skillsync-task-service.onrender.com
   GOALS_SERVICE_URL=https://skillsync-goals-service.onrender.com
   TIMER_SERVICE_URL=https://skillsync-timer-service.onrender.com
   ```
3. Manual Deploy to apply changes

### Step 4: Update Vercel Frontend

Update the frontend environment variable in Vercel:

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add/Update:
   ```
   VITE_API_URL=https://skillsync-api-gateway.onrender.com/api
   ```
4. Redeploy

## 🔗 Service URLs

After deployment, your services will be available at:

- **Frontend**: `https://your-project.vercel.app`
- **API Gateway**: `https://skillsync-api-gateway.onrender.com`
- **Task Service**: `https://skillsync-task-service.onrender.com`
- **Goals Service**: `https://skillsync-goals-service.onrender.com`
- **Timer Service**: `https://skillsync-timer-service.onrender.com`

## ⚙️ Environment Variables Reference

### API Gateway
```
PORT=3000
TASK_SERVICE_URL=https://skillsync-task-service.onrender.com
GOALS_SERVICE_URL=https://skillsync-goals-service.onrender.com
TIMER_SERVICE_URL=https://skillsync-timer-service.onrender.com
```

### Task Service
```
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=8080
SPRING_DATASOURCE_URL=jdbc:h2:mem:taskdb
```

### Goals Service
```
ASPNETCORE_URLS=http://+:5001
ConnectionStrings__MongoDB=<from Render MongoDB>
MongoDB__DatabaseName=skillsync_goals
```

### Timer Service
```
PORT=8082
```

### Frontend (Vercel)
```
VITE_API_URL=https://skillsync-api-gateway.onrender.com/api
```

## 🐛 Troubleshooting

### Services Not Starting
- Check Render logs for each service
- Verify environment variables are set correctly
- Ensure Docker builds are successful

### CORS Issues
- Verify API Gateway CORS settings
- Check frontend API URL configuration

### Database Connection Issues
- Verify MongoDB connection string
- Check MongoDB service is running on Render
- Ensure database name matches

### Frontend Can't Reach API
- Verify `VITE_API_URL` is set correctly
- Check Vercel rewrites configuration
- Test API Gateway URL directly

## 📊 Monitoring

### Render
- View logs: Dashboard → Service → Logs
- Monitor metrics: Dashboard → Service → Metrics

### Vercel
- View logs: Dashboard → Project → Deployments → View Function Logs
- Analytics: Dashboard → Project → Analytics

## 🔄 Continuous Deployment

Both Render and Vercel automatically deploy on:
- Push to `main` branch
- Pull requests (preview deployments on Vercel)

## 💰 Cost Estimate

### Free Tier (Hobby)
- **Render**: 
  - 3 web services (free tier)
  - 1 MongoDB database (free tier)
  - Services spin down after 15 min inactivity
- **Vercel**:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Perfect for portfolio projects

### Paid Options
- Render: $7/month per service (always-on)
- Vercel: Pro plan for production use

## ✅ Post-Deployment Checklist

- [ ] All Render services are running
- [ ] MongoDB is connected
- [ ] API Gateway can reach all services
- [ ] Frontend is deployed on Vercel
- [ ] Frontend can reach API Gateway
- [ ] Test all endpoints
- [ ] Update README with live URLs
- [ ] Add deployment badges to README

## 🎉 Success!

Once deployed, your SkillSync app will be live and accessible worldwide!

