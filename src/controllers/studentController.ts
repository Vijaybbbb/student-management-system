import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import * as studentService from '../services/studentService';

export const login = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { strEmail, strPassword } = req.body;
    const objResult = await studentService.studentLogin(strEmail, strPassword);
    res.json({ success: true, data: objResult });
  } catch (error: any) {
    next(error);
  }
};

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const strStudentId = req.objUser.strId;
    const arrTasks = await studentService.getStudentTasks(strStudentId);
    res.json({ success: true, data: arrTasks });
  } catch (error: any) {
    next(error);
  }
};

export const completeTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { strTaskId } = req.body;
    const strStudentId = req.objUser.strId;
    const objResult = await studentService.updateTaskStatus(strTaskId, strStudentId);
    res.json({ success: true, data: objResult });
  } catch (error: any) {
    next(error);
  }
};
