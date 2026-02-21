import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/login', adminController.login);
router.post('/students', authMiddleware('admin'), adminController.createStudent);
router.post('/tasks', authMiddleware('admin'), adminController.createTask);

export default router;
