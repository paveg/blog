#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

deploy_at=`date "+%Y/%m/%d %H:%M:%S"`
build_message="Rebuilding site at $deploy_at"
post_message="Post at $deploy_at"

# Build the project.
hugo -t hugo-bootstrap-premium

# Go To Public folder
cd public
# Add changes to git.
git add .

# Commit changes.
git commit -m "$build_message"

# Push source and build repos.
git push --force origin master

# Come Back up to the Project Root
cd ..

# Commit source repository changes
git add .
git commit -m "$post_message"
git push --force
