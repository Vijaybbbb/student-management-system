import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  strStudentId: mongoose.Types.ObjectId;
  strTitle: string;
  strDescription: string;
  dateDueTime: Date;
  strStatus: 'pending' | 'completed' | 'overdue';
}

const taskSchema = new Schema<ITask>({
  strStudentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  strTitle: { type: String, required: true },
  strDescription: { type: String, required: true },
  dateDueTime: { type: Date, required: true },
  strStatus: { type: String, enum: ['pending', 'completed', 'overdue'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model<ITask>('Task', taskSchema);
