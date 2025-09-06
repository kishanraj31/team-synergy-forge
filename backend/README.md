# SynergySphere Backend API

A complete Node.js + Express backend for the SynergySphere team collaboration platform with MySQL database integration.

## 🚀 Features

- **Authentication**: JWT-based user authentication with bcrypt password hashing
- **Project Management**: Create, manage, and collaborate on projects
- **Task Management**: Kanban-style task tracking with status updates
- **Real-time Messaging**: Threaded comments and discussions
- **Team Collaboration**: Add/remove team members from projects
- **Security**: Rate limiting, CORS, helmet security headers
- **Validation**: Comprehensive input validation with Joi
- **Error Handling**: Robust error handling with proper HTTP status codes

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd synergysphere-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=synergysphere

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

   # CORS Configuration
   FRONTEND_URL=http://localhost:3000

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Database Setup**
   ```bash
   # Create MySQL database and tables
   npm run setup-db
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📊 Database Schema

The API uses the following MySQL tables:

- **Users**: User authentication and profile information
- **Projects**: Project management and metadata
- **Tasks**: Task tracking with Kanban status
- **ProjectMembers**: Many-to-many relationship between users and projects
- **Comments**: Threaded discussions and messaging

## 🔗 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (protected)
- `PUT /auth/profile` - Update user profile (protected)

### Projects
- `POST /api/projects` - Create new project (protected)
- `GET /api/projects` - Get user projects (protected)
- `GET /api/projects/:id` - Get project details (protected)
- `PUT /api/projects/:id` - Update project (protected, creator only)
- `DELETE /api/projects/:id` - Delete project (protected, creator only)
- `POST /api/projects/:id/members` - Add project member (protected, creator only)
- `DELETE /api/projects/:id/members/:memberId` - Remove project member (protected, creator only)

### Tasks
- `POST /api/tasks/projects/:id/tasks` - Create task (protected)
- `GET /api/tasks/projects/:id/tasks` - Get project tasks (protected)
- `GET /api/tasks/projects/:id/tasks/status` - Get tasks by status (protected)
- `GET /api/tasks/my-tasks` - Get my assigned tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Comments/Messages
- `POST /api/comments/projects/:id/messages` - Create comment (protected)
- `GET /api/comments/projects/:id/messages` - Get project comments (protected)
- `GET /api/comments/recent` - Get recent comments (protected)
- `GET /api/comments/:id` - Get single comment (protected)
- `PUT /api/comments/:id` - Update comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for protection
- **Input Validation**: Comprehensive validation with Joi
- **SQL Injection Protection**: Parameterized queries

## 🧪 Testing

```bash
# Run tests
npm test
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── projectController.js # Project management
│   │   ├── taskController.js    # Task management
│   │   └── commentController.js # Comment/messaging
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication
│   │   ├── validation.js       # Input validation
│   │   ├── errorHandler.js     # Error handling
│   │   └── security.js         # Security middleware
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── projects.js         # Project routes
│   │   ├── tasks.js            # Task routes
│   │   └── comments.js         # Comment routes
│   └── server.js               # Main server file
├── database/
│   └── schema.sql              # Database schema
├── scripts/
│   └── setup-database.js      # Database setup script
├── package.json
├── env.example
└── README.md
```

## 🚀 Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database credentials
3. Set a strong JWT secret
4. Configure CORS for your frontend domain
5. Use a process manager like PM2 for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
