# MongoDB Connection String for Goals Service

## Your Connection String

```
mongodb+srv://kyjahntsmith_db_user:dfduMCe5tlcC2N4x@cluster0.cdejwi3.mongodb.net/skillsync_goals?retryWrites=true&w=majority
```

**Note**: Added `/skillsync_goals` database name and `retryWrites=true&w=majority` parameters.

## ✅ Connection Test

Your test code works! The connection is successful.

## 🔧 Use in Goals Service

### Option 1: Environment Variable (Recommended for Render)

In Render Dashboard → Goals Service → Environment Variables:

```
ConnectionStrings__MongoDB=mongodb+srv://kyjahntsmith_db_user:dfduMCe5tlcC2N4x@cluster0.cdejwi3.mongodb.net/skillsync_goals?retryWrites=true&w=majority
```

### Option 2: appsettings.json (For Local Development)

Update `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "MongoDB": "mongodb+srv://kyjahntsmith_db_user:dfduMCe5tlcC2N4x@cluster0.cdejwi3.mongodb.net/skillsync_goals?retryWrites=true&w=majority"
  }
}
```

## ⚠️ Security Note

**Never commit this file to Git!** The connection string contains your password.

The Goals Service already reads from environment variables, so it will work automatically in Render.

## 🚀 Next Steps

1. **Deploy Goals Service to Render**
2. **Add the connection string as environment variable** (see above)
3. **Deploy** - it will connect automatically!

Your MongoDB is ready! 🎉

