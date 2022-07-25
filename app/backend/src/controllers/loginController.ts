import { Request, Response } from 'express';
import LoginService from '../services/userService';
// import authToken from '../auth/authToken';
// import IPayloadToken from '../interfaces/IPayloadToken';
// import ThrowError from '../utils/throwError';

const loginCont = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await LoginService(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  // const user = await loginService(req.body);
  // if (!user.token) {
  //   return res.status(401).json({ message: 'Incorrect email or password' });
  // }
  // return res.status(200).json({ token: user.token });
  // ----- Esse aqui está passando corretamente!

  // const { email, password } = req.body;
  // const token = await loginService(email, password);
  // if (!token) {
  //   return res.status(401).json({ message: 'Incorrect email or password' });
  // }
  // return res.status(200).json(token);
};

export default { loginCont };
