 # SynergySphere – Advanced Team Collaboration Platform

## Overview

**SynergySphere** is built on a simple idea: teams do their best work when their tools truly support how they think, communicate, and move forward together. This platform goes beyond traditional project management software by becoming an intelligent backbone for teams — helping them stay organized, communicate better, manage resources more effectively, and make informed decisions without friction.

At its core, SynergySphere is about helping teams operate at their best — continuously improving, staying aligned, and working smarter every day.

## The Challenge

**Mission:** Design and build a desktop and mobile-ready platform that acts like a central nervous system for team collaboration. SynergySphere should not only streamline the basics like tasks and communication but also work proactively — catching potential issues early and helping teams stay ahead rather than constantly reacting.

This means creating a system that feels supportive, insightful, and seamless — something that naturally fits into the rhythm of a working team.

## Target User Pain Points Addressed

Teams everywhere deal with the same headaches. SynergySphere is here to solve the ones that slow everyone down the most:

- **Scattered Information:** Important files, chats, and decisions live in too many places. It's hard to keep track of what's where.
- **Unclear Progress:** Without visibility into tasks, it's tough to know how far along a project really is — or what's holding it up.
- **Resource Overload or Confusion:** Assignments can get messy. Team members end up overworked, underutilized, or unsure of what they're supposed to do.
- **Deadline Surprises:** We often notice we're behind when it's already too late. SynergySphere should surface potential issues before they become real problems.
- **Communication Gaps:** Updates get missed. People get left out of the loop. Conversations are buried in email or lost in scattered chats.

By addressing these pain points directly, SynergySphere positions itself as a platform that doesn't just organize — it orchestrates collaboration intelligently and proactively.

## MVP Features

This foundational version of SynergySphere focuses on core task management and team communication with a functional prototype accessible via both mobile and desktop interfaces:

- **User Authentication:** Register and login functionality
- **Project Management:** Create and manage projects
- **Team Collaboration:** Add team members to projects
- **Task Management:** Assign tasks with deadlines and track status (To-Do, In Progress, Done)
- **Communication Hub:** Project-specific threaded discussions
- **Progress Visualization:** Clear, intuitive task progress tracking
- **Notifications:** Basic notifications for important events
- **Responsive Design:** Clean, mobile-friendly interface optimized for both desktop and mobile platforms

## User Interface Design

### Mobile Application
Designed for accessibility and quick interactions, prioritizing core functionalities for users on the go:

- **Login/Sign Up Screen:** Standard authentication with email/password
- **Project Dashboard:** List of all user projects with summary statistics
- **Project Detail View:** Hub for specific project with task access
- **Task Management:** List/board view with task creation and editing capabilities
- **User Profile:** Basic settings and logout functionality

The mobile experience prioritizes "on-the-go" use cases with minimal taps for checking tasks, updating statuses, and receiving notifications.

### Desktop Application
Embodies "command center" aspects with broader project overviews, especially for project leads and managers, facilitating easier data entry for complex tasks and detailed descriptions.

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Vite

- **Backend:**
  - Node.js
  - CommonJS modules
  - SQL database

## Installation & Setup

### Prerequisites

- Node.js (v14 or above)
- npm or yarn
- SQL database (MySQL/PostgreSQL/SQLite)

### Backend Setup

1. Navigate to the backend directory:
cd backend

2. Install dependencies:
Install dependencies


3. Configure environment variables in `.env`:
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=synergysphere_db
JWT_SECRET=your_jwt_secret
PORT=5000

4. Set up database schema and run migrations

5. Start the backend server:
npm start


### Frontend Setup

1. Navigate to the frontend directory:
cd frontend

2. Install dependencies:
npm install

3. Configure environment variables in `.env`:
VITE_API_URL=http://localhost:5000

4. Start the development server:
npm run dev

5. Access the application at `http://localhost:5173`

## Usage

1. **Getting Started:** Register for a new account or log in with existing credentials
2. **Project Creation:** Create new projects and invite team members
3. **Task Management:** Break down work into tasks, assign them with deadlines, and track progress
4. **Communication:** Use project-specific discussion threads for focused team communication
5. **Progress Tracking:** Monitor task statuses and project progress through intuitive visualizations
6. **Notifications:** Stay updated with in-app notifications for assignments and important events

## System Architecture

The system employs efficient data structures for managing project, user, and task data, ensuring a stable and responsive user experience:

- **Frontend:** React-based SPA with TypeScript for type safety and Tailwind CSS for responsive design
- **Backend:** RESTful API built with Node.js handling authentication, project management, and real-time updates
- **Database:** SQL database with optimized schema for project, user, and task relationships
- **Real-time Features:** WebSocket integration for live notifications and updates

## Development

### Project Structure
synergysphere/
├── frontend/ # React + TypeScript + Vite
├── backend/ # Node.js + Express
├── database/ # SQL schema and migrations
└── docs/ # Documentation


### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

## License

MIT License

---

**Built for Odoo Hackathon 2025**

*SynergySphere - Where teams sync, collaborate, and thrive together.*