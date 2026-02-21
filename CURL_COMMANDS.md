# CURL COMMANDS FOR TESTING API

## 1. ADMIN LOGIN
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"strEmail":"admin@example.com","strPassword":"admin123"}'

## 2. ADD STUDENT (Replace YOUR_ADMIN_TOKEN)
curl -X POST http://localhost:5000/api/admin/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"strName":"John Doe","strEmail":"john@example.com","strDepartment":"Computer Science","strPassword":"student123"}'

## 3. ASSIGN TASK (Replace YOUR_ADMIN_TOKEN and YOUR_STUDENT_ID)
curl -X POST http://localhost:5000/api/admin/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"strStudentId":"YOUR_STUDENT_ID","strTitle":"Complete Assignment 1","strDescription":"Solve all problems in Chapter 3","dateDueTime":"2024-12-31T23:59:59.000Z"}'

## 4. STUDENT LOGIN
curl -X POST http://localhost:5000/api/student/login \
  -H "Content-Type: application/json" \
  -d '{"strEmail":"john@example.com","strPassword":"student123"}'

## 5. GET ALL TASKS (Replace YOUR_STUDENT_TOKEN)
curl -X GET http://localhost:5000/api/student/tasks \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"

## 6. MARK TASK AS COMPLETED (Replace YOUR_STUDENT_TOKEN and YOUR_TASK_ID)
curl -X PUT http://localhost:5000/api/student/tasks/complete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{"strTaskId":"YOUR_TASK_ID"}'

## ERROR TEST - Unauthorized Access
curl -X GET http://localhost:5000/api/student/tasks

## ERROR TEST - Invalid Token
curl -X GET http://localhost:5000/api/student/tasks \
  -H "Authorization: Bearer invalid_token"

## ERROR TEST - Admin trying to access student endpoint
curl -X GET http://localhost:5000/api/student/tasks \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
