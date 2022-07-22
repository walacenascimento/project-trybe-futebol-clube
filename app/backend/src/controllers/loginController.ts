import { Request, Response } from 'express';
import loginService from '../services/loginService';
import authToken from '../auth/authToken';
import IPayloadToken from '../interfaces/IPayloadToken';

const loginCont = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginService(email, password);
  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  return res.status(200).json(user);
};

const authLoginCont = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  try {
    const token = authToken.tokenVerifi(authorization) as IPayloadToken;
    // console.log(token);
    const { role } = token.user;
    return res.status(200).json(role);
  } catch (error) {
    return res.status(401).json({ message: 'Token Invalid!' });
  }
};

export default { loginCont, authLoginCont };
