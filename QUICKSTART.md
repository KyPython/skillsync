# SkillSync Quick Start Guide

## 🚀 Fastest Way to Run Everything

### Using Docker Compose (Recommended)

```bash
# 1. Navigate to project root
cd skillsync

# 2. Start all services
docker-compose up --build

# 3. Access the application
# Frontend: http://localhost
# API Gateway: http://localhost:3000
```

That's it! All services will start automatically.

### Manual Setup (For Development)

If you want to run services individually for development:

#### Prerequisites Check
```bash
# Check Java
java -version  # Should be 17+

# Check .NET
dotnet --version  # Should be 8.0+

# Check Go
go version  # Should be 1.21+

# Check Node.js
node --version  # Should be 18+

# Check MongoDB (for Goals Service)
mongod --version  # Optional if using Docker
```

#### Step-by-Step Manual Start

**Terminal 1: Task Service (Java)**
```bash
cd task-service
mvn clean install
mvn spring-boot:run
# Wait for: "Started TaskServiceApplication"
```

**Terminal 2: Goals Service (C#)**
```bash
cd goals-service
dotnet restore
dotnet run
# Wait for: "Now listening on: http://localhost:5001"
```

**Terminal 3: Timer Service (Go)**
```bash
cd timer-service
go mod download
go run main.go
# Wait for: "Timer Service starting on port 8082"
```

**Terminal 4: API Gateway (Node.js)**
```bash
cd api-gateway
npm install
npm start
# Wait for: "API Gateway running on port 3000"
```

**Terminal 5: Frontend (React)**
```bash
cd frontend
npm install
npm run dev
# Wait for: "Local: http://localhost:5173"
```

## 🧪 Test the Services

### Test Task Service
```bash
curl http://localhost:8080/api/tasks
```

### Test Goals Service
```bash
curl http://localhost:5001/api/goals
```

### Test Timer Service
```bash
curl http://localhost:8082/api/timers
```

### Test API Gateway
```bash
curl http://localhost:3000/api/tasks
curl http://localhost:3000/api/goals
curl http://localhost:3000/api/timers
```

## 🐛 Troubleshooting

### Port Already in Use
If a port is already in use, you can:
1. Stop the service using that port
2. Change the port in the service's configuration
3. Use Docker Compose (it handles port conflicts better)

### MongoDB Connection Issues
If Goals Service can't connect to MongoDB:
- Ensure MongoDB is running: `mongod` or use Docker: `docker run -d -p 27017:27017 mongo:7.0`
- Check connection string in `goals-service/appsettings.json`

### Service Not Starting
- Check logs for error messages
- Verify all dependencies are installed
- Ensure required ports are available
- Check environment variables

## 📊 Service Health Checks

- Task Service: http://localhost:8080/actuator/health (if actuator is enabled)
- Goals Service: http://localhost:5001/health
- Timer Service: http://localhost:8082/health
- API Gateway: http://localhost:3000/health

## 🎯 Next Steps

1. Open the frontend at http://localhost:5173 (dev) or http://localhost (Docker)
2. Create some tasks, goals, and timers
3. Explore the API through the gateway
4. Check individual service READMEs for detailed documentation

## 💡 Development Tips

- Use `docker-compose up` for quick testing
- Run services individually for debugging
- Check service logs: `docker-compose logs [service-name]`
- Frontend hot-reloads automatically in dev mode
- API Gateway proxies all requests, so you can test through it

