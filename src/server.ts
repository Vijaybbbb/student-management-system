import express from 'express';
import { connectDB } from './config/db';
import { config } from './config/env';
import adminRoutes from './routes/adminRoutes';
import studentRoutes from './routes/studentRoutes';
import { errorHandler } from './middleware/errorHandler';
import { seedDatabase } from './utils/seed';

const app = express();

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

app.use(errorHandler);

connectDB().then(async () => {
  await seedDatabase();
  app.listen(config.intPort, () => {
    console.log(`Server running on port ${config.intPort}`);
  });
});
