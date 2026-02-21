import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/adminService';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { strEmail, strPassword } = req.body;
    const objResult = await adminService.adminLogin(strEmail, strPassword);
    res.json({ success: true, data: objResult });
  } catch (error: any) {
    next(error);
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { strName, strEmail, strDepartment, strPassword } = req.body;
    const objResult = await adminService.addStudent(strName, strEmail, strDepartment, strPassword);
    res.status(201).json({ success: true, data: objResult });
  } catch (error: any) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { strStudentId, strTitle, strDescription, dateDueTime } = req.body;
    const objResult = await adminService.assignTask(strStudentId, strTitle, strDescription, new Date(dateDueTime));
    res.status(201).json({ success: true, data: objResult });
  } catch (error: any) {
    next(error);
  }
};
