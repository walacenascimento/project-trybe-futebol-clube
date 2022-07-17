import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import loginSchema from '../schema/loginSchema';

// passando a validação de login
const validLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  //   const { email, password } = loginSchema.validate(req.body);
  //   if (!email || password) {
  //     res.status(400).json({ message: 'All fields must be filled' });
  //   }
  next();
};

const { JWT_SECRET } = process.env;
const secret = JWT_SECRET as string;

const validToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    req.body.data = decoded.data;
    return next();
  } catch (err) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default { validLogin, validToken };
