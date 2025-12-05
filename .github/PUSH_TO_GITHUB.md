# Push to GitHub - Instructions

## Option 1: Using GitHub CLI (gh)

If you have GitHub CLI installed:

```bash
cd /Users/ky/skillsync
gh repo create skillsync --public --source=. --remote=origin --push
```

## Option 2: Manual Setup

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `skillsync` (or your preferred name)
3. Description: "Microservices productivity app with Java, C#, and Go"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Add Remote and Push

```bash
cd /Users/ky/skillsync

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/skillsync.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/skillsync.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Verify

Visit your repository on GitHub to verify all files are uploaded.

## Option 3: Using GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Select `/Users/ky/skillsync`
4. Publish repository to GitHub

