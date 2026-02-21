import mongoose from 'mongoose';
import Admin from '../models/Admin';
import Student from '../models/Student';
import { config } from '../config/env';

export const seedDatabase = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      await Admin.create({
        strEmail: 'admin@example.com',
        strPassword: 'admin123'
      });
      console.log('Default admin created');
    }

    const studentCount = await Student.countDocuments();
    
    if (studentCount === 0) {
      await Student.create({
        strName: 'John Doe',
        strEmail: 'john@example.com',
        strDepartment: 'Computer Science',
        strPassword: 'student123'
      });
      console.log('Default student created');
    }
  } catch (error) {
    console.error('Seed error:', error);
  }
};
