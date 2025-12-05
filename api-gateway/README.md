# API Gateway

Node.js/Express API Gateway that routes requests to all SkillSync microservices.

## Tech Stack

- **Node.js** (ES Modules)
- **Express.js**
- **Axios** (for service proxying)
- **CORS**

## Features

- Single entry point for all microservices
- Request routing to appropriate services
- CORS enabled
- Error handling and forwarding

## Running the Gateway

### Prerequisites
- Node.js 18+ (with ES Modules support)

### Install Dependencies
```bash
npm install
```

### Run
```bash
npm start
# or for development with auto-reload
npm run dev
```

Gateway runs on: `http://localhost:3000`

## Environment Variables

Create a `.env` file:
```
PORT=3000
TASK_SERVICE_URL=http://localhost:8080
GOALS_SERVICE_URL=http://localhost:5001
TIMER_SERVICE_URL=http://localhost:8082
```

## API Routes

All routes are proxied to their respective services:

- `/api/tasks/*` → Task Service (Java/Spring Boot)
- `/api/goals/*` → Goals Service (C#/.NET)
- `/api/timers/*` → Timer Service (Go)

## Example

```bash
# Access tasks through gateway
curl http://localhost:3000/api/tasks

# Access goals through gateway
curl http://localhost:3000/api/goals

# Access timers through gateway
curl http://localhost:3000/api/timers
```

