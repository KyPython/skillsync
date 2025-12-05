# Free Tier Deployment Guide - SkillSync

This guide shows how to deploy SkillSync using **100% free tier services** on Render and Vercel.

## 🆓 Free Tier Services

- **Render**: Free web services (spin down after 15 min inactivity)
- **Vercel**: Free frontend hosting
- **MongoDB Atlas**: Free M0 cluster (512MB storage)

## 📋 Step-by-Step Deployment

### Step 1: Set Up MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a **Free M0 Cluster** (takes ~5 minutes)
4. Create a database user:
   - Database Access → Add New User
   - Username: `skillsync`
   - Password: (generate secure password)
5. Whitelist IP:
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
6. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://skillsync:yourpassword@cluster0.xxxxx.mongodb.net/skillsync_goals?retryWrites=true&w=majority`

### Step 2: Deploy to Render (Free Tier)

#### Option A: Manual Service Creation (Recommended for Free Tier)

**1. Task Service (Java)**
- New → Web Service
- Connect GitHub: `KyPython/skillsync`
- Name: `skillsync-task-service`
- Environment: **Docker**
- Region: Choose closest
- Branch: `main`
- Root Directory: `task-service`
- Dockerfile Path: `Dockerfile`
- Docker Context: `.`
- Plan: **Free**
- Environment Variables:
  ```
  SPRING_PROFILES_ACTIVE=production
  SERVER_PORT=8080
  SPRING_DATASOURCE_URL=jdbc:h2:mem:taskdb
  ```

**2. Goals Service (C#)**
- New → Web Service
- Name: `skillsync-goals-service`
- Environment: **Docker**
- Root Directory: `goals-service`
- Dockerfile Path: `Dockerfile`
- Plan: **Free**
- Environment Variables:
  ```
  ASPNETCORE_URLS=http://+:5001
  ConnectionStrings__MongoDB=<your-mongodb-atlas-connection-string>
  MongoDB__DatabaseName=skillsync_goals
  ```

**3. Timer Service (Go)**
- New → Web Service
- Name: `skillsync-timer-service`
- Environment: **Docker**
- Root Directory: `timer-service`
- Dockerfile Path: `Dockerfile`
- Plan: **Free**
- Environment Variables:
  ```
  PORT=8082
  ```

**4. API Gateway (Node.js)**
- New → Web Service
- Name: `skillsync-api-gateway`
- Environment: **Node**
- Root Directory: `api-gateway`
- Build Command: `npm install`
- Start Command: `node src/index.js`
- Plan: **Free**
- Environment Variables (add after other services deploy):
  ```
  PORT=3000
  TASK_SERVICE_URL=https://skillsync-task-service.onrender.com
  GOALS_SERVICE_URL=https://skillsync-goals-service.onrender.com
  TIMER_SERVICE_URL=https://skillsync-timer-service.onrender.com
  ```

#### Option B: Using Blueprint (May Require Payment Info)

If you want to use the blueprint:
1. Update `render.yaml` with MongoDB Atlas connection string
2. Go to Render → New → Blueprint
3. Connect repo
4. **Important**: Change each service plan to "Free" in the UI before deploying

### Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. New Project → Import `KyPython/skillsync`
3. Configure:
   - Root Directory: `frontend`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output: `dist`
4. Environment Variable:
   ```
   VITE_API_URL=https://skillsync-api-gateway.onrender.com/api
   ```
5. Deploy

## ⚠️ Important Notes

### Free Tier Limitations

1. **Render Services**:
   - Spin down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds
   - 750 hours/month free (enough for 24/7 single service)
   - Multiple services share the 750 hours

2. **MongoDB Atlas**:
   - 512MB storage (plenty for development)
   - Shared CPU/RAM
   - Perfect for portfolio projects

3. **Vercel**:
   - Unlimited deployments
   - 100GB bandwidth/month
   - Perfect for frontend hosting

### Service URLs

After deployment:
- Frontend: `https://your-project.vercel.app`
- API Gateway: `https://skillsync-api-gateway.onrender.com`
- Task Service: `https://skillsync-task-service.onrender.com`
- Goals Service: `https://skillsync-goals-service.onrender.com`
- Timer Service: `https://skillsync-timer-service.onrender.com`

## 🔄 Alternative: Deploy Services One at a Time

If you want to test incrementally:

1. **Start with API Gateway only** (easiest)
2. **Add Task Service** (no database needed)
3. **Add Timer Service** (no database needed)
4. **Add Goals Service** (needs MongoDB Atlas)
5. **Deploy Frontend last**

## 🐛 Troubleshooting

### Services Keep Spinning Down
- This is normal for free tier
- First request will be slow (~30s)
- Consider upgrading to "Starter" plan ($7/month) for always-on

### MongoDB Connection Issues
- Verify connection string has correct password
- Check IP whitelist includes Render's IPs
- Test connection string locally first

### Build Failures
- Check Render logs for each service
- Verify Dockerfiles are correct
- Ensure all dependencies are in package files

## 💡 Pro Tips

1. **Keep Services Warm**: Use a monitoring service (like UptimeRobot free tier) to ping your services every 10 minutes
2. **Use Environment Variables**: Store MongoDB connection string in Render's environment variables (secure)
3. **Monitor Usage**: Check Render dashboard to see free tier hours remaining
4. **Test Locally First**: Use `docker-compose up` to test everything locally before deploying

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] All 4 Render services deployed (Free plan)
- [ ] Environment variables set correctly
- [ ] API Gateway can reach all backend services
- [ ] Frontend deployed on Vercel
- [ ] Frontend can reach API Gateway
- [ ] Test all endpoints work

Your app will be live and **100% free**! 🎉

