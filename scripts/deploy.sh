#!/usr/bin/env bash
set -e

BUILD_DIR=build
DEPLOY_BRANCH=deploy
TMP_DIR=.deploy-worktree
RELEASE_REF="${RELEASE_REF:-main}"

# Ensure build exists
if [ ! -d "$BUILD_DIR" ]; then
  echo "Build directory not found"
  exit 1
fi

# Clean old worktree if exists
git worktree remove "$TMP_DIR" --force 2>/dev/null || true

# Create or reuse deploy branch
git fetch origin "$DEPLOY_BRANCH" || true
git worktree add "$TMP_DIR" "$DEPLOY_BRANCH" || git worktree add -B "$DEPLOY_BRANCH" "$TMP_DIR"

# Git identity
git config --global user.email "iamogbz+github@gmail.com"
git config --global user.name "Emmanuel Ogbizi-Ugbe"

# Determine deployment target path
if [ "$RELEASE_REF" = "main" ]; then
  TARGET_DIR="$TMP_DIR"
else
  TARGET_DIR="$TMP_DIR/$RELEASE_REF"
fi

# Prepare target directory
mkdir -p "$TARGET_DIR"

# Remove previous contents
rm -rf "$TARGET_DIR"/*

# Copy build output
echo "letters-from-the-abyss.com" > "$BUILD_DIR"/CNAME
cp -R "$BUILD_DIR"/* "$TARGET_DIR"/

# Commit & push
cd "$TMP_DIR"
git add .
git commit -m "Deploy build [$RELEASE_REF] $(date -u +'%Y-%m-%d %H:%M:%S')" || echo "No changes to deploy"
git push origin "$DEPLOY_BRANCH"

# Cleanup
cd ..
git worktree remove "$TMP_DIR"

echo "Deployment complete for release: $RELEASE_REF"
