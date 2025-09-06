@echo off
echo Starting SynergySphere Development Environment...
echo.

echo Installing dependencies...
call npm install
call cd backend && npm install

echo.
echo Setting up database...
call cd backend && npm run setup-db

echo.
echo Starting both backend and frontend...
echo Backend will run on http://localhost:3001
echo Frontend will run on http://localhost:3000
echo.

call npm run dev
