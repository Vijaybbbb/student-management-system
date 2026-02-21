import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (objPayload: object): string => {
  return jwt.sign(objPayload, config.strJwtSecret, { expiresIn: '24h' });
};

export const verifyToken = (strToken: string): any => {
  return jwt.verify(strToken, config.strJwtSecret);
};
