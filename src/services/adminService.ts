import Admin from '../models/Admin';
import Student from '../models/Student';
import Task from '../models/Task';
import { generateToken } from '../utils/jwt';

export const adminLogin = async (strEmail: string, strPassword: string) => {
  const objAdmin = await Admin.findOne({ strEmail });
  
  if (!objAdmin || !(await objAdmin.comparePassword(strPassword))) {
    throw new Error('Invalid credentials');
  }

  const strToken = generateToken({ strId: objAdmin._id, strRole: 'admin' });
  return { token: strToken };
};

export const addStudent = async (strName: string, strEmail: string, strDepartment: string, strPassword: string) => {
  const objExisting = await Student.findOne({ strEmail });
  
  if (objExisting) {
    throw new Error('Student already exists');
  }

  const objStudent = await Student.create({ strName, strEmail, strDepartment, strPassword });
  return { 
    id: objStudent._id, 
    name: objStudent.strName, 
    email: objStudent.strEmail, 
    department: objStudent.strDepartment 
  };
};

export const assignTask = async (strStudentId: string, strTitle: string, strDescription: string, dateDueTime: Date) => {
  const objStudent = await Student.findById(strStudentId);
  
  if (!objStudent) {
    throw new Error('Student not found');
  }

  const objTask = await Task.create({ strStudentId, strTitle, strDescription, dateDueTime });
  return {
    id: objTask._id,
    studentId: objTask.strStudentId,
    title: objTask.strTitle,
    description: objTask.strDescription,
    dueTime: objTask.dateDueTime,
    status: objTask.strStatus
  };
};
