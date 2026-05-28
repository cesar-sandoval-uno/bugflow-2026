# BugFlow

BugFlow is a collaborative bug tracking system built to help software development teams efficiently report, manage, and resolve issues across projects.

The platform provides secure role-based access, real-time collaboration through comments, project management, issue tracking, and notifications — all within a modern full-stack monorepo architecture.

---

# 🚀 Tech Stack

## Monorepo
- Nx Workspace

## Frontend
- Angular 22
- Angular Signals
- Angular Router
- Auth0 Authentication
- TailwindCSS

## Backend
- NestJS
- TypeORM
- PostgreSQL (AWS RDS)
- JWT Authentication (RS256)
- Auth0 Authorization

## Testing
- Jest
- Playwright

---

# ✨ Features

## Authentication & Authorization
- Auth0 login integration
- JWT-based authentication
- Role-based access control
- Secure API protection with guards
- Refresh token support

## User Management
- Admin user management
- Role assignment (Admin, Developer, Tester)
- Automatic user synchronization

## Project Management
- Create and manage projects
- Invite collaborators
- Project ownership
- Team-based access restrictions

## Issue Tracking
- Create, edit, and manage issues
- Issue priorities
- Issue statuses
- Assignee management
- Filtering and sorting

## Comments & Collaboration
- Real-time issue discussions
- Comment editing and deletion
- Ownership validation
- Activity tracking

## Notifications
- Assignment notifications
- Status change notifications
- Comment activity notifications

## Security
- Helmet protection
- JWT validation
- CORS configuration
- Validation pipes
- Role guards
- Secure Auth0 integration

---

# 👥 User Roles

## Admin
- Full system access
- Manage users and projects
- Assign roles
- View all projects and issues

## Developer
- Work on assigned issues
- Create and update issues
- Participate in discussions
- Access assigned projects

## Tester
- Report bugs and issues
- Comment on issues
- Track issue progress
- Access assigned projects

---

# 📁 Monorepo Structure

```bash
.
|__api              # NestJS backend
|__web              # Angular frontend
|__shared-types     # Shared DTOs, enums, and interfaces
|__data-access      # Shared frontend data layer
|__ui               # Shared UI components
|__api-e2e          # Backend E2E tests
|__web-e2e          # Frontend E2E tests
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
NODE_ENV=development

AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```

---

# 📦 Installation

## Clone the repository

```bash
git clone https://github.com/cesar-sandoval-uno/bugflow-2026.git
cd bugflow
```

## Install dependencies

```bash
npm install
```

---

# ▶️ Running the Application

## Start frontend and backend

```bash
npm run dev
```

## Production build

```bash
npm run build
```

---

# 🧪 Testing

## Unit tests

```bash
nx test api
nx test web
```

## E2E tests

```bash
nx e2e api-e2e
nx e2e web-e2e
```

---

# 🔐 Security Notes

BugFlow includes several security best practices:

- RS256 JWT validation
- Auth0 integration
- Secure role validation
- ValidationPipe sanitization
- Helmet middleware
- Restricted CORS configuration
- Refresh token rotation support
- Secure environment variable usage

---

# 📚 API Documentation

Swagger documentation is available during development:

```bash
http://localhost:3000/api/docs
```

---

# 🛣️ Roadmap

Planned improvements:

- Kanban board
- File attachments
- Email notifications
- Activity audit logs
- Advanced filtering and search
- Real-time updates with WebSockets
- CI/CD pipelines
- Docker deployment

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit pull requests.

---

# 📄 License

This project is licensed under the MIT License.

---

---