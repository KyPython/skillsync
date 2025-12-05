# Getting MongoDB Atlas Connection String

## Step-by-Step Guide

### 1. Click "Connect your application"

You're already on this screen! Click the **"Connect your application"** option.

### 2. Select Driver

- Choose **"C#"** (for your .NET Goals Service)
- Version: Latest is fine

### 3. Copy Connection String

You'll see a connection string like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 4. Customize the Connection String

**Replace these parts:**

1. **`<username>`** → Your database username
   - If you don't have one yet:
     - Go to "Database Access" (left sidebar)
     - Click "Add New Database User"
     - Create username: `skillsync`
     - Create/generate password
     - Save the password!

2. **`<password>`** → Your database password
   - Use the password you just created

3. **Add database name** → Add `/skillsync_goals` before the `?`
   - Final format: `...mongodb.net/skillsync_goals?retryWrites=true...`

### 5. Final Connection String Format

Should look like:
```
mongodb+srv://skillsync:YourPassword123@cluster0.xxxxx.mongodb.net/skillsync_goals?retryWrites=true&w=majority
```

### 6. Whitelist IP Addresses (Important!)

Before using the connection string:

1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - ⚠️ Only for development/testing
   - For production, use specific IPs
4. Click **"Confirm"**

### 7. Use in Render

When deploying Goals Service to Render:

1. Go to Render Dashboard → `skillsync-goals-service`
2. Environment → Environment Variables
3. Add:
   ```
   ConnectionStrings__MongoDB=mongodb+srv://skillsync:YourPassword123@cluster0.xxxxx.mongodb.net/skillsync_goals?retryWrites=true&w=majority
   ```
4. Save and redeploy

## 🔒 Security Notes

- **Never commit** connection strings to Git
- Use environment variables in Render
- For production, use specific IP whitelist (not 0.0.0.0/0)
- Store password securely (password manager)

## ✅ Test Connection

You can test the connection:
1. In Atlas, go to "Clusters"
2. Click "Browse Collections"
3. If you can browse, connection works!

## 🐛 Troubleshooting

**Connection fails?**
- Check IP whitelist includes Render's IPs or 0.0.0.0/0
- Verify username/password are correct
- Ensure database name is in connection string
- Check cluster is running (not paused)

**Can't find database user?**
- Go to "Database Access" → Create new user
- Use "Atlas admin" privileges for development

Your connection string is ready! 🎉

