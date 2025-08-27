@echo off
echo 🚀 Deploying Portfolio to GitHub...
echo.

echo 📝 Adding all changes...
git add .

echo 💬 Enter commit message:
set /p commit_msg=

echo 🔄 Committing changes...
git commit -m "%commit_msg%"

echo 🚀 Pushing to GitHub...
git push origin main

echo ✅ Deployment complete!
echo 🌐 Your portfolio is now live at: https://github.com/mohany6/Portfoilo.git
echo.
pause
