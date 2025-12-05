# Free Disk Space - Quick Commands

Your disk is 100% full. Run these commands to free space:

## Quick Cache Cleanup (Safe to delete)

```bash
# Clear Go build cache (650MB)
rm -rf ~/Library/Caches/go-build/*

# Clear Spotify cache (1GB)
rm -rf ~/Library/Caches/com.spotify.client/*

# Clear Google cache (1.2GB)
rm -rf ~/Library/Caches/Google/*

# Clear CloudKit cache (1.9GB) - be careful, may contain iCloud data
# rm -rf ~/Library/Caches/CloudKit/*

# Clear npm cache
npm cache clean --force

# Clear Maven cache (if using Java)
rm -rf ~/.m2/repository/*

# Clear Docker (if not using)
docker system prune -a --volumes
```

## Check What's Using Space

```bash
# See largest directories
du -sh ~/* | sort -hr | head -10

# See largest files
find ~ -type f -size +100M 2>/dev/null | head -10
```

