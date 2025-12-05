# Goals Service

C#/.NET Core Web API service for managing learning goals and motivational quotes in the SkillSync productivity app.

## Tech Stack

- **.NET 8.0**
- **MongoDB** (via MongoDB.Driver)
- **ASP.NET Core Web API**
- **Swagger/OpenAPI**

## Features

- CRUD operations for learning goals
- Goal status tracking (ACTIVE, COMPLETED, PAUSED, CANCELLED)
- Progress tracking (0-100%)
- Motivational quotes API
- User-specific goal filtering

## Running the Service

### Prerequisites
- .NET 8.0 SDK
- MongoDB (running on localhost:27017 or configured connection string)

### Run
```bash
dotnet restore
dotnet run
```

Service runs on: `http://localhost:5001` (or configured port)

### Swagger UI
Access API documentation at: `http://localhost:5001/swagger`

## API Endpoints

- `POST /api/goals` - Create a new goal
- `GET /api/goals` - Get all goals
- `GET /api/goals/{id}` - Get goal by ID
- `GET /api/goals/user/{userId}` - Get goals by user ID
- `PUT /api/goals/{id}` - Update a goal
- `DELETE /api/goals/{id}` - Delete a goal
- `GET /api/goals/quote` - Get a random motivational quote

## Example Request

```bash
curl -X POST http://localhost:5001/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Go Programming",
    "description": "Master Go language fundamentals",
    "status": "ACTIVE",
    "progress": 25,
    "category": "Programming",
    "targetDate": "2024-12-31T00:00:00Z",
    "userId": 1
  }'
```

