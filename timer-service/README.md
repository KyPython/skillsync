# Timer Service

Go (Golang) microservice for Pomodoro-style time tracking in the SkillSync productivity app.

## Tech Stack

- **Go 1.21+**
- **Gin Web Framework**
- **In-memory storage** (can be extended to use database)

## Features

- CRUD operations for timers
- Start/Stop timer functionality
- Pomodoro-style time tracking
- Timer status management (IDLE, RUNNING, PAUSED, STOPPED)
- User-specific timer filtering

## Running the Service

### Prerequisites
- Go 1.21 or higher

### Run
```bash
go mod download
go run main.go
```

Service runs on: `http://localhost:8082`

## API Endpoints

- `POST /api/timers` - Create a new timer
- `GET /api/timers` - Get all timers
- `GET /api/timers/{id}` - Get timer by ID
- `GET /api/timers/user/{userId}` - Get timers by user ID
- `PUT /api/timers/{id}` - Update a timer
- `DELETE /api/timers/{id}` - Delete a timer
- `POST /api/timers/{id}/start` - Start a timer
- `POST /api/timers/{id}/stop` - Stop a timer
- `GET /health` - Health check

## Example Request

```bash
# Create a timer
curl -X POST http://localhost:8082/api/timers \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Focus Session",
    "duration": 25,
    "type": "POMODORO",
    "userId": 1
  }'

# Start the timer
curl -X POST http://localhost:8082/api/timers/{id}/start

# Stop the timer
curl -X POST http://localhost:8082/api/timers/{id}/stop
```

