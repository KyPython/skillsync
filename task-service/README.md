# Task Service

A Spring Boot microservice for managing tasks in the SkillSync productivity app.

## Overview

This service provides RESTful APIs for CRUD operations on tasks, including status tracking, priority management, and assignment capabilities.

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (in-memory for development)
- **Lombok**
- **Maven**

## Project Structure

```
task-service/
├── src/
│   ├── main/
│   │   ├── java/com/kython/skillsync/taskservice/
│   │   │   ├── TaskServiceApplication.java
│   │   │   ├── controller/
│   │   │   │   └── TaskController.java
│   │   │   ├── service/
│   │   │   │   └── TaskService.java
│   │   │   ├── repository/
│   │   │   │   └── TaskRepository.java
│   │   │   ├── model/
│   │   │   │   ├── Task.java
│   │   │   │   ├── TaskStatus.java
│   │   │   │   └── TaskPriority.java
│   │   │   ├── dto/
│   │   │   │   ├── TaskRequest.java
│   │   │   │   └── TaskResponse.java
│   │   │   └── exception/
│   │   │       ├── TaskNotFoundException.java
│   │   │       ├── GlobalExceptionHandler.java
│   │   │       └── ErrorResponse.java
│   │   └── resources/
│   │       └── application.yml
│   └── test/
└── pom.xml
```

## Running the Application

1. **Prerequisites:**
   - Java 17 or higher
   - Maven 3.6+

2. **Build and Run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. **Access H2 Console:**
   - URL: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:taskdb`
   - Username: `sa`
   - Password: (empty)

## API Endpoints

### 1. Create Task
**POST** `/api/tasks`

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the task service",
  "status": "NOT_STARTED",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59",
  "assigneeId": 1
}
```

**Response:** `201 CREATED`
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the task service",
  "status": "NOT_STARTED",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59",
  "assigneeId": 1,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 2. Get All Tasks
**GET** `/api/tasks`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the task service",
    "status": "NOT_STARTED",
    "priority": "HIGH",
    "dueDate": "2024-12-31T23:59:59",
    "assigneeId": 1,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  }
]
```

### 3. Get Task by ID
**GET** `/api/tasks/{id}`

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the task service",
  "status": "NOT_STARTED",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59",
  "assigneeId": 1,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### 4. Update Task
**PUT** `/api/tasks/{id}`

**Request Body:**
```json
{
  "title": "Complete project documentation - Updated",
  "description": "Write comprehensive documentation for the task service",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59",
  "assigneeId": 1
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Complete project documentation - Updated",
  "description": "Write comprehensive documentation for the task service",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59",
  "assigneeId": 1,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T11:00:00"
}
```

### 5. Delete Task
**DELETE** `/api/tasks/{id}`

**Response:** `204 NO CONTENT`

## cURL Examples

### Create Task
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation",
    "status": "NOT_STARTED",
    "priority": "HIGH",
    "dueDate": "2024-12-31T23:59:59",
    "assigneeId": 1
  }'
```

### Get All Tasks
```bash
curl -X GET http://localhost:8080/api/tasks
```

### Get Task by ID
```bash
curl -X GET http://localhost:8080/api/tasks/1
```

### Update Task
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation - Updated",
    "description": "Write comprehensive documentation",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "dueDate": "2024-12-31T23:59:59",
    "assigneeId": 1
  }'
```

### Delete Task
```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

## Error Responses

### Task Not Found (404)
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Task not found with id: 999",
  "path": "/api/tasks/999"
}
```

### Validation Error (400)
```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Invalid input data",
  "path": "/api/tasks",
  "validationErrors": {
    "title": "Title is required",
    "status": "Status is required"
  }
}
```

## Domain Model

### Task Entity
- `id`: Long (Primary Key, Auto-generated)
- `title`: String (Required)
- `description`: String (Optional, max 1000 chars)
- `status`: TaskStatus enum (NOT_STARTED, IN_PROGRESS, COMPLETED)
- `dueDate`: LocalDateTime (Optional)
- `priority`: TaskPriority enum (LOW, MEDIUM, HIGH)
- `assigneeId`: Long (Optional, for future user service integration)
- `createdAt`: LocalDateTime (Auto-set on creation)
- `updatedAt`: LocalDateTime (Auto-updated on modification)

## Future Enhancements

- Authentication & Authorization
- Integration with User Service
- Task filtering and pagination
- Task search functionality
- Task history/audit log
- Database migration to PostgreSQL/MySQL
- API Gateway integration
- Distributed tracing
- Metrics and monitoring

## Notes

- The service uses H2 in-memory database for development
- All timestamps are in ISO-8601 format
- Validation is performed on request DTOs
- Global exception handling provides consistent error responses
- The service is designed to be easily integrated with other microservices

