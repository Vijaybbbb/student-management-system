# EC2 API Test Commands
# Replace 52.87.217.216 with your EC2 public IP

## 1. Admin Login
curl http://52.87.217.216:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"strEmail":"admin@example.com","strPassword":"admin123"}'

## 2. Add Student (Replace YOUR_ADMIN_TOKEN)
curl http://52.87.217.216:5000/api/admin/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"strName":"Jane Smith","strEmail":"jane@example.com","strDepartment":"Engineering","strPassword":"student456"}'

## 3. Assign Task (Replace YOUR_ADMIN_TOKEN and YOUR_STUDENT_ID)
curl http://52.87.217.216:5000/api/admin/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"strStudentId":"YOUR_STUDENT_ID","strTitle":"Complete Project","strDescription":"Build REST API","dateDueTime":"2024-12-31T23:59:59.000Z"}'

## 4. Student Login
curl http://52.87.217.216:5000/api/student/login \
  -H "Content-Type: application/json" \
  -d '{"strEmail":"john@example.com","strPassword":"student123"}'

## 5. Get All Tasks (Replace YOUR_STUDENT_TOKEN)
curl http://52.87.217.216:5000/api/student/tasks \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"

## 6. Mark Task as Completed (Replace YOUR_STUDENT_TOKEN and YOUR_TASK_ID)
curl http://52.87.217.216:5000/api/student/tasks/complete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{"strTaskId":"YOUR_TASK_ID"}'
