# SynergySphere Setup Guide

## Prerequisites

Before running SynergySphere, you need to have the following installed:

### 1. Node.js
- Download and install Node.js (v18 or higher) from [nodejs.org](https://nodejs.org/)

### 2. MySQL Database
- Download and install MySQL from [mysql.com](https://dev.mysql.com/downloads/mysql/)
- Or use MySQL via XAMPP, WAMP, or similar local development environment
- Make sure MySQL service is running

### 3. Database Setup
1. Start MySQL service
2. Create a database user (optional, can use root)
3. Update the `.env` file in the `backend` folder with your MySQL credentials

## Quick Start

### Option 1: Using the provided scripts (Recommended)

**Windows:**
```bash
# Run the setup script
run-dev.bat
```

**Linux/Mac:**
```bash
# Make the script executable and run
chmod +x run-dev.sh
./run-dev.sh
```

### Option 2: Manual setup

1. **Install dependencies:**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

2. **Setup database:**
   ```bash
   cd backend
   npm run setup-db
   ```

3. **Start both services:**
   ```bash
   # From the root directory
   npm run dev
   ```

## Accessing the Application

- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## Troubleshooting

### Database Connection Issues
If you get database connection errors:

1. **Check if MySQL is running:**
   - Windows: Check Services or Task Manager
   - Linux/Mac: `sudo systemctl status mysql` or `brew services list | grep mysql`

2. **Verify MySQL credentials:**
   - Update `backend/.env` with correct database credentials
   - Default: host=localhost, port=3306, user=root, password=(empty)

3. **Create database manually:**
   ```sql
   CREATE DATABASE synergysphere;
   ```

### Port Already in Use
If ports 3000 or 3001 are already in use:

1. **Kill processes using the ports:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   netstat -ano | findstr :3001
   taskkill /PID <PID_NUMBER> /F
   
   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   lsof -ti:3001 | xargs kill -9
   ```

2. **Or change ports in configuration files**

### Frontend Not Loading
- Check if the backend is running on port 3001
- Verify CORS settings in `backend/src/middleware/security.js`
- Check browser console for errors

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
npm run dev
```

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests (if available)
npm test
```

## Production Deployment

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Start production servers:**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (protected)

### Projects
- `POST /api/projects` - Create project (protected)
- `GET /api/projects` - Get user projects (protected)
- `GET /api/projects/:id` - Get project details (protected)

### Tasks
- `POST /api/tasks/projects/:id/tasks` - Create task (protected)
- `GET /api/tasks/projects/:id/tasks` - Get project tasks (protected)
- `PUT /api/tasks/:id` - Update task (protected)

### Comments
- `POST /api/comments/projects/:id/messages` - Create comment (protected)
- `GET /api/comments/projects/:id/messages` - Get project comments (protected)

## Support

If you encounter any issues:
1. Check this troubleshooting guide
2. Check the console logs for error messages
3. Verify all prerequisites are installed
4. Ensure MySQL is running and accessible
