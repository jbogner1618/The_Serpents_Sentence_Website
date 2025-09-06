@echo off
echo === The Serpent's Sentence Website - GitHub Push Helper ===
echo.

echo Building website...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Aborting.
    pause
    exit /b 1
)

echo.
echo === Git Status ===
git status
echo.

set /p COMMIT_MSG="Enter commit message: "

echo.
echo Adding all files to Git...
git add .

echo.
echo Committing changes...
git commit -m "%COMMIT_MSG%"

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo === Process Complete ===
echo.
echo If you need to deploy to FTP:
echo 1. Open FileZilla
echo 2. Import the site manager file (filezilla-site-manager.xml)
echo 3. Connect to "The Serpent's Sentence" site
echo 4. Upload the contents of the dist/ folder
echo.

pause
