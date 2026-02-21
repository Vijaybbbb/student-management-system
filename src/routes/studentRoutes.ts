import { Router } from 'express';
import * as studentController from '../controllers/studentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/login', studentController.login);
router.get('/tasks', authMiddleware('student'), studentController.getTasks);
router.put('/tasks/complete', authMiddleware('student'), studentController.completeTask);

export default router;
