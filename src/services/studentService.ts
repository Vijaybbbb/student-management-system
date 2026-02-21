import Student from '../models/Student';
import Task from '../models/Task';
import { generateToken } from '../utils/jwt';

export const studentLogin = async (strEmail: string, strPassword: string) => {
  const objStudent = await Student.findOne({ strEmail });
  
  if (!objStudent || !(await objStudent.comparePassword(strPassword))) {
    throw new Error('Invalid credentials');
  }

  const strToken = generateToken({ strId: objStudent._id, strRole: 'student' });
  return { token: strToken };
};

export const getStudentTasks = async (strStudentId: string) => {
  const arrTasks = await Task.find({ strStudentId });
  const dateNow = new Date();

  return arrTasks.map(objTask => {
    let strStatus = objTask.strStatus;
    if (strStatus !== 'completed' && new Date(objTask.dateDueTime) < dateNow) {
      strStatus = 'overdue';
    }
    
    return {
      id: objTask._id,
      title: objTask.strTitle,
      description: objTask.strDescription,
      dueTime: objTask.dateDueTime,
      status: strStatus
    };
  });
};

export const updateTaskStatus = async (strTaskId: string, strStudentId: string) => {
  const objTask = await Task.findOne({ _id: strTaskId, strStudentId });
  
  if (!objTask) {
    throw new Error('Task not found');
  }

  objTask.strStatus = 'completed';
  await objTask.save();

  return {
    id: objTask._id,
    title: objTask.strTitle,
    status: objTask.strStatus
  };
};
