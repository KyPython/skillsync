# SkillSync - Microservices Productivity App

A full-stack microservices application demonstrating multi-language backend development with **Java**, **C#**, and **Go**, integrated through an API Gateway and served by a React frontend.

## 🏗️ Architecture

```
┌─────────────┐
│   Frontend  │ (React + TypeScript)
│  Port: 80   │
└──────┬──────┘
       │
┌──────▼──────────┐
│   API Gateway   │ (Node.js/Express)
│   Port: 3000    │
└──────┬──────────┘
       │
   ┌───┴───┬──────────┬──────────┐
   │       │          │          │
┌──▼──┐ ┌──▼──┐   ┌──▼──┐   ┌───▼──┐
│Task │ │Goal │   │Timer│   │Mongo │
│Java │ │ C#  │   │ Go  │   │ DB   │
│8080 │ │5001 │   │8082 │   │27017 │
└─────┘ └─────┘   └─────┘   └──────┘
```

## 📦 Services

| Service | Language | Framework | Port | Database |
|---------|----------|-----------|------|----------|
| **Task Service** | Java 17 | Spring Boot 3.2 | 8080 | H2 (in-memory) |
| **Goals Service** | C# | .NET 8.0 | 5001 | MongoDB |
| **Timer Service** | Go 1.21 | Gin | 8082 | In-memory |
| **API Gateway** | Node.js | Express | 3000 | - |
| **Frontend** | TypeScript | React 18 + Vite | 80 | - |

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose** (recommended)
- OR individual runtime environments:
  - Java 17+ & Maven
  - .NET 8.0 SDK
  - Go 1.21+
  - Node.js 18+
  - MongoDB (for Goals Service)

### Option 1: Docker Compose (Easiest)

```bash
# Clone and navigate to project
cd skillsync

# Start all services
docker-compose up --build

# Services will be available at:
# - Frontend: http://localhost
# - API Gateway: http://localhost:3000
# - Task Service: http://localhost:8080
# - Goals Service: http://localhost:5001
# - Timer Service: http://localhost:8082
```

### Option 2: Run Services Individually

#### 1. Task Service (Java)
```bash
cd task-service
mvn clean install
mvn spring-boot:run
# Runs on http://localhost:8080
```

#### 2. Goals Service (C#)
```bash
cd goals-service
dotnet restore
dotnet run
# Runs on http://localhost:5001
# Requires MongoDB running on localhost:27017
```

#### 3. Timer Service (Go)
```bash
cd timer-service
go mod download
go run main.go
# Runs on http://localhost:8082
```

#### 4. API Gateway (Node.js)
```bash
cd api-gateway
npm install
npm start
# Runs on http://localhost:3000
```

#### 5. Frontend (React)
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## 📚 API Documentation

### Task Service (`/api/tasks`)
- `POST /api/tasks` - Create task
- `GET /api/tasks` - List all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Goals Service (`/api/goals`)
- `POST /api/goals` - Create goal
- `GET /api/goals` - List all goals
- `GET /api/goals/{id}` - Get goal by ID
- `GET /api/goals/user/{userId}` - Get goals by user
- `PUT /api/goals/{id}` - Update goal
- `DELETE /api/goals/{id}` - Delete goal
- `GET /api/goals/quote` - Get motivational quote

### Timer Service (`/api/timers`)
- `POST /api/timers` - Create timer
- `GET /api/timers` - List all timers
- `GET /api/timers/{id}` - Get timer by ID
- `PUT /api/timers/{id}` - Update timer
- `DELETE /api/timers/{id}` - Delete timer
- `POST /api/timers/{id}/start` - Start timer
- `POST /api/timers/{id}/stop` - Stop timer

## 🧪 Testing

### Example API Calls

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Go Programming",
    "description": "Master Go fundamentals",
    "status": "NOT_STARTED",
    "priority": "HIGH"
  }'

# Create a goal
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete SkillSync Project",
    "description": "Build all microservices",
    "status": "ACTIVE",
    "progress": 50,
    "category": "Development"
  }'

# Create a timer
curl -X POST http://localhost:3000/api/timers \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Focus Session",
    "duration": 25,
    "type": "POMODORO"
  }'
```

## 🏗️ Project Structure

```
skillsync/
├── task-service/          # Java/Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── goals-service/         # C#/.NET
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   ├── GoalsService.csproj
│   └── Dockerfile
├── timer-service/         # Go
│   ├── handlers/
│   ├── services/
│   ├── models/
│   ├── go.mod
│   └── Dockerfile
├── api-gateway/           # Node.js
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── frontend/              # React + TypeScript
│   ├── src/
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## 🎯 Features

- ✅ **Multi-language microservices** (Java, C#, Go)
- ✅ **RESTful APIs** with proper error handling
- ✅ **API Gateway** for unified access
- ✅ **Modern React frontend** with TypeScript
- ✅ **Docker containerization** for easy deployment
- ✅ **Task management** with status and priority
- ✅ **Goal tracking** with progress bars
- ✅ **Pomodoro timer** functionality
- ✅ **Motivational quotes** API

## 🔮 Future Enhancements

- [ ] JWT Authentication (Firebase)
- [ ] User service for multi-user support
- [ ] Database persistence for Timer Service
- [ ] Real-time updates (WebSockets)
- [ ] Analytics dashboard
- [ ] GraphQL API layer
- [ ] Kubernetes deployment configs
- [ ] CI/CD pipelines
- [ ] Unit and integration tests
- [ ] API rate limiting
- [ ] Request logging and monitoring

## 📝 Development Notes

- Each service is independently deployable
- Services communicate via HTTP REST APIs
- Frontend proxies API calls through the gateway
- MongoDB is used for Goals Service persistence
- H2 in-memory DB for Task Service (can be swapped for PostgreSQL)
- Timer Service uses in-memory storage (can be extended to use a database)

## 🤝 Contributing

This is a portfolio project demonstrating:
- Microservices architecture
- Multi-language backend development
- API design and integration
- Modern frontend development
- Docker containerization

## 📄 License

MIT License - Feel free to use this as a learning resource or portfolio project.

---

**Built with ❤️ to showcase full-stack microservices development**

