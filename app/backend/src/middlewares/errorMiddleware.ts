import { Request, Response, NextFunction } from 'express';
import Error from '../utils/error';

const error = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    return res.status(err.status).json({ message: `${err.message}` });
  }
  return res.status(500).json({ message: 'Internal Error' });
};

export default error;

// Referência : https://www.becomebetterprogrammer.com/how-to-use-error-handler-middleware-with-express-js-and-typescript/
