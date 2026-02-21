# Student Management System API

A RESTful API for managing students and tasks built with Express.js, TypeScript, MongoDB, and JWT authentication.

## API URL
```
http://localhost:5000/api
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/student-management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

## Installation

```bash
npm install
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Default Credentials

The application automatically creates default users on first run:

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**Student:**
- Email: `john@example.com`
- Password: `student123`

## API Documentation

### Admin Endpoints

#### 1. Admin Login
**POST** `/api/admin/login`

Request:
```json
{
  "strEmail": "admin@example.com",
  "strPassword": "admin123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Add Student
**POST** `/api/admin/students`

Headers:
```
Authorization: Bearer <admin_token>
```

Request:
```json
{
  "strName": "John Doe",
  "strEmail": "john@example.com",
  "strDepartment": "Computer Science",
  "strPassword": "student123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Computer Science"
  }
}
```

#### 3. Assign Task
**POST** `/api/admin/tasks`

Headers:
```
Authorization: Bearer <admin_token>
```

Request:
```json
{
  "strStudentId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "strTitle": "Complete Assignment 1",
  "strDescription": "Solve all problems in Chapter 3",
  "dateDueTime": "2024-12-31T23:59:59.000Z"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "studentId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Complete Assignment 1",
    "description": "Solve all problems in Chapter 3",
    "dueTime": "2024-12-31T23:59:59.000Z",
    "status": "pending"
  }
}
```

### Student Endpoints

#### 1. Student Login
**POST** `/api/student/login`

Request:
```json
{
  "strEmail": "john@example.com",
  "strPassword": "student123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Get All Tasks
**GET** `/api/student/tasks`

Headers:
```
Authorization: Bearer <student_token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Complete Assignment 1",
      "description": "Solve all problems in Chapter 3",
      "dueTime": "2024-12-31T23:59:59.000Z",
      "status": "pending"
    },
    {
      "id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "title": "Submit Project",
      "description": "Final year project submission",
      "dueTime": "2024-01-15T23:59:59.000Z",
      "status": "overdue"
    }
  ]
}
```

#### 3. Mark Task as Completed
**PUT** `/api/student/tasks/complete`

Headers:
```
Authorization: Bearer <student_token>
```

Request:
```json
{
  "strTaskId": "65a1b2c3d4e5f6g7h8i9j0k2"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Complete Assignment 1",
    "status": "completed"
  }
}
```

## Task Status

- **pending**: Task is assigned and not yet completed
- **overdue**: Task due time has passed and not completed
- **completed**: Task has been marked as completed by student

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `401` - Unauthorized (Invalid/Missing token)
- `403` - Forbidden (Access denied)
- `500` - Internal Server Error

## Notes

- All requests and responses are in JSON format
- JWT tokens expire after 24 hours
- Admin can only access admin endpoints
- Students can only access their own tasks
- Passwords are hashed using bcrypt
- Task status automatically updates to "overdue" when fetched after due time

## Docker Deployment

### Build and Run with Docker

```bash
# Build image
docker build -t student-management-api .

# Run container
docker run -p 5000:5000 --env-file .env student-management-api
```

### Using Docker Compose

```bash
# Start application
docker-compose up -d

# Stop application
docker-compose down

# View logs
docker-compose logs -f
```

## EC2 Deployment

See [EC2_DEPLOYMENT.md](EC2_DEPLOYMENT.md) for detailed deployment instructions.
