import { NextFunction, Request, Response } from 'express';
import authToken from '../auth/authToken';
import IPayloadToken from '../interfaces/IPayloadToken';

const authLoginCont = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  try {
    const token = authToken.tokenVerifi(authorization) as IPayloadToken;
    const { role } = token.user;
    return res.status(200).json({ role });
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const authTokenMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    authToken.tokenVerifi(authorization) as IPayloadToken;
    // const { role } = token.user;
    // return res.status(200).json({ role });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default {
  authLoginCont, authTokenMatch,
};
