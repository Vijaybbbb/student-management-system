import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IStudent extends Document {
  strName: string;
  strEmail: string;
  strDepartment: string;
  strPassword: string;
  comparePassword(strPassword: string): Promise<boolean>;
}

const studentSchema = new Schema<IStudent>({
  strName: { type: String, required: true },
  strEmail: { type: String, required: true, unique: true },
  strDepartment: { type: String, required: true },
  strPassword: { type: String, required: true }
});

studentSchema.pre('save', async function(next) {
  if (!this.isModified('strPassword')) return next();
  this.strPassword = await bcrypt.hash(this.strPassword, 10);
  next();
});

studentSchema.methods.comparePassword = async function(strPassword: string): Promise<boolean> {
  return bcrypt.compare(strPassword, this.strPassword);
};

export default mongoose.model<IStudent>('Student', studentSchema);
