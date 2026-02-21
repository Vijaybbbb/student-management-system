import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  objUser?: any;
}

export const authMiddleware = (strRole: 'admin' | 'student') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const strToken = req.headers.authorization?.split(' ')[1];
      
      if (!strToken) {
        return res.status(401).json({ success: false, message: 'No token provided' });
      }

      const objDecoded = verifyToken(strToken);
      
      if (objDecoded.strRole !== strRole) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }

      req.objUser = objDecoded;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
};
