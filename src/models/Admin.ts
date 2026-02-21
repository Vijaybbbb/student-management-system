import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  strEmail: string;
  strPassword: string;
  comparePassword(strPassword: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>({
  strEmail: { type: String, required: true, unique: true },
  strPassword: { type: String, required: true }
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('strPassword')) return next();
  this.strPassword = await bcrypt.hash(this.strPassword, 10);
  next();
});

adminSchema.methods.comparePassword = async function(strPassword: string): Promise<boolean> {
  return bcrypt.compare(strPassword, this.strPassword);
};

export default mongoose.model<IAdmin>('Admin', adminSchema);
