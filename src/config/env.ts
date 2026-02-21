import dotenv from 'dotenv';

dotenv.config();

export const config = {
  intPort: parseInt(process.env.PORT || '5000'),
  strMongoUri: process.env.MONGO_URI || '',
  strJwtSecret: process.env.JWT_SECRET || ''
};
