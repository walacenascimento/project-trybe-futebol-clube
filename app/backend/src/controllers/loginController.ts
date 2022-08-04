import { Request, Response } from 'express';
import LoginService from '../services/userService';

const loginCont = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await LoginService(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
};

export default { loginCont };
