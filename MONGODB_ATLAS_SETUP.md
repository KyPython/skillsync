# MongoDB Atlas Free Tier Setup Guide

## 🆓 Finding the FREE M0 Tier

When creating a MongoDB Atlas cluster, the **FREE M0 tier** is available but might not be immediately visible. Here's how to find it:

### Step 1: Scroll Down or Look for "Free" Option

On the cluster creation page:
1. **Scroll down** past the paid tiers (M30, M10, Flex)
2. Look for a section labeled **"Free"** or **"M0"**
3. It should show:
   - **M0** - FREE
   - 512 MB Storage
   - Shared RAM
   - Shared vCPU
   - Perfect for development

### Step 2: Alternative - Change View

If you don't see it:
1. Look for a **toggle** or **filter** that says "Show all tiers" or "Include free tier"
2. Or click on a different tab/view option
3. The free tier is always available, just sometimes hidden by default

### Step 3: Select M0 Free Tier

Once you find it:
- Click on **M0** (Free tier)
- It should show **$0.00/hour** or **FREE**
- Storage: **512 MB** (plenty for development)
- RAM: **Shared**
- vCPU: **Shared**

## 📋 Complete Setup Steps

### 1. Create Free M0 Cluster

1. **Provider**: Choose AWS, GCP, or Azure (all work fine)
2. **Region**: Choose closest to you (e.g., N. Virginia, Oregon)
3. **Cluster Name**: `Cluster0` (or any name)
4. **Tier**: Select **M0 - FREE**
5. Click **"Create Cluster"**
6. Wait ~3-5 minutes for cluster to provision

### 2. Create Database User

1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `skillsync` (or any name)
5. Password: 
   - Click **"Autogenerate Secure Password"** OR
   - Create your own strong password
   - **SAVE THIS PASSWORD** - you'll need it!
6. Database User Privileges: **"Atlas admin"** (for development)
7. Click **"Add User"**

### 3. Whitelist IP Addresses

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. For development/testing:
   - Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (allows all IPs)
   - ⚠️ Only for development - use specific IPs in production
4. Click **"Confirm"**

### 4. Get Connection String

1. Go back to **"Clusters"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **C#** (for .NET service)
5. Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. **Replace**:
   - `<username>` with your database username (e.g., `skillsync`)
   - `<password>` with your database password
   - Add database name: `?retryWrites=true&w=majority` → `?retryWrites=true&w=majority` (or add `/skillsync_goals` before the `?`)

### 5. Final Connection String Format

Your connection string should look like:
```
mongodb+srv://skillsync:YourPassword123@cluster0.xxxxx.mongodb.net/skillsync_goals?retryWrites=true&w=majority
```

## 🔧 Use in Render Deployment

When deploying Goals Service to Render:

1. Go to Render Dashboard → Your Goals Service
2. Environment → Add Environment Variable:
   ```
   ConnectionStrings__MongoDB=mongodb+srv://skillsync:YourPassword123@cluster0.xxxxx.mongodb.net/skillsync_goals?retryWrites=true&w=majority
   ```
3. Save and redeploy

## ✅ Verification

Test your connection:
1. In MongoDB Atlas, go to **"Clusters"**
2. Click **"Browse Collections"**
3. If you can see the database browser, connection is working!

## 🆓 Free Tier Limits

- **Storage**: 512 MB (enough for thousands of goals)
- **RAM**: Shared (sufficient for development)
- **No credit card required**
- **Never expires** (as long as you use it)
- **Perfect for portfolio projects**

## 🐛 Troubleshooting

### Can't Find Free Tier
- Try refreshing the page
- Look for "M0" or "Free" in the tier list
- It's always available, just scroll down

### Connection Fails
- Verify IP whitelist includes `0.0.0.0/0` or your Render IP
- Check username/password are correct
- Ensure connection string has database name

### Password Issues
- Make sure password is URL-encoded if it has special characters
- Use the "Autogenerate Secure Password" feature

## 💡 Pro Tips

1. **Save Connection String**: Store it securely (password manager)
2. **Test Locally First**: Test connection with a simple .NET app before deploying
3. **Monitor Usage**: Check Atlas dashboard to see storage usage
4. **Backup**: Free tier includes basic backups

Your MongoDB Atlas free cluster is ready! 🎉

