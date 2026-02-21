import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const intStatusCode = err.statusCode || 500;
  const strMessage = err.message || 'Internal Server Error';

  res.status(intStatusCode).json({
    success: false,
    message: strMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
