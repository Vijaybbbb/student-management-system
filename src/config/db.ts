import mongoose from 'mongoose';
import { config } from './env';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.strMongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
