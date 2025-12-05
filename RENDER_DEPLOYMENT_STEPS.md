# Render Deployment - Step by Step with Your MongoDB

## ✅ MongoDB Setup Complete!

Your MongoDB connection string is ready:
```
mongodb+srv://kyjahntsmith_db_user:dfduMCe5tlcC2N4x@cluster0.cdejwi3.mongodb.net/skillsync_goals?retryWrites=true&w=majority
```

## 🚀 Deploy Services to Render (Free Tier)

### Service 1: Task Service (Java) - Easiest, No Database

1. Go to https://dashboard.render.com
2. **New** → **Web Service**
3. **Connect GitHub**: `KyPython/skillsync`
4. **Configure**:
   - **Name**: `skillsync-task-service`
   - **Environment**: **Docker**
   - **Region**: Choose closest
   - **Branch**: `main`
   - **Root Directory**: `task-service`
   - **Dockerfile Path**: `Dockerfile`
   - **Docker Context**: `.`
   - **Plan**: **Free**
5. **Environment Variables**:
   ```
   SPRING_PROFILES_ACTIVE=production
   SERVER_PORT=8080
   ```
6. Click **"Create Web Service"**
7. Wait ~5-10 minutes for build

**Note the URL**: `https://skillsync-task-service.onrender.com`

---

### Service 2: Timer Service (Go) - No Database

1. **New** → **Web Service**
2. **Connect GitHub**: `KyPython/skillsync`
3. **Configure**:
   - **Name**: `skillsync-timer-service`
   - **Environment**: **Docker**
   - **Root Directory**: `timer-service`
   - **Dockerfile Path**: `Dockerfile`
   - **Docker Context**: `.`
   - **Plan**: **Free**
4. **Environment Variables**:
   ```
   PORT=8082
   ```
5. Click **"Create Web Service"**
6. Wait ~5-10 minutes

**Note the URL**: `https://skillsync-timer-service.onrender.com`

---

### Service 3: Goals Service (C#) - Needs MongoDB

1. **New** → **Web Service**
2. **Connect GitHub**: `KyPython/skillsync`
3. **Configure**:
   - **Name**: `skillsync-goals-service`
   - **Environment**: **Docker**
   - **Root Directory**: `goals-service`
   - **Dockerfile Path**: `Dockerfile`
   - **Docker Context**: `.`
   - **Plan**: **Free**
4. **Environment Variables** (IMPORTANT):
   ```
   ASPNETCORE_URLS=http://+:5001
   ConnectionStrings__MongoDB=mongodb+srv://kyjahntsmith_db_user:dfduMCe5tlcC2N4x@cluster0.cdejwi3.mongodb.net/skillsync_goals?retryWrites=true&w=majority
   MongoDB__DatabaseName=skillsync_goals
   ```
5. Click **"Create Web Service"**
6. Wait ~5-10 minutes

**Note the URL**: `https://skillsync-goals-service.onrender.com`

---

### Service 4: API Gateway (Node.js) - Deploy LAST

**Wait until all 3 services above are deployed and running!**

1. **New** → **Web Service**
2. **Connect GitHub**: `KyPython/skillsync`
3. **Configure**:
   - **Name**: `skillsync-api-gateway`
   - **Environment**: **Node**
   - **Root Directory**: `api-gateway`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`
   - **Plan**: **Free**
4. **Environment Variables** (use actual URLs from services above):
   ```
   PORT=3000
   TASK_SERVICE_URL=https://skillsync-task-service.onrender.com
   GOALS_SERVICE_URL=https://skillsync-goals-service.onrender.com
   TIMER_SERVICE_URL=https://skillsync-timer-service.onrender.com
   ```
5. Click **"Create Web Service"**
6. Wait ~3-5 minutes

**Note the URL**: `https://skillsync-api-gateway.onrender.com`

---

## ✅ Verification

After all services deploy:

1. **Test API Gateway**: 
   ```
   curl https://skillsync-api-gateway.onrender.com/health
   ```

2. **Test Task Service**:
   ```
   curl https://skillsync-api-gateway.onrender.com/api/tasks
   ```

3. **Test Goals Service**:
   ```
   curl https://skillsync-api-gateway.onrender.com/api/goals
   ```

4. **Test Timer Service**:
   ```
   curl https://skillsync-api-gateway.onrender.com/api/timers
   ```

## 🎯 Next: Deploy Frontend to Vercel

Once API Gateway is live, deploy frontend:
- Use API Gateway URL: `https://skillsync-api-gateway.onrender.com/api`
- See `DEPLOYMENT.md` for Vercel steps

## 🐛 Troubleshooting

**Service won't start?**
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB IP whitelist includes Render IPs (or 0.0.0.0/0)

**Connection errors?**
- Verify MongoDB connection string is correct
- Check MongoDB cluster is running (not paused)
- Test connection string locally first

**Build failures?**
- Check Dockerfile paths are correct
- Verify all dependencies are in package files
- Review build logs in Render dashboard

All services deploying! 🚀

