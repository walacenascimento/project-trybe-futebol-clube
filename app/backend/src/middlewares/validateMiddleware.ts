import { Request, Response, NextFunction } from 'express';
// import loginSchema from '../schema/loginSchema';

const validLogin = (req:Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();

  // const { error } = loginSchema.validate(req.body);
  // if (error) {
  //   if (error.details[0].type === 'any.required') {
  //     return res.status(400).json({ message: error.message });
  //   }
  //   return res.status(401).json({ message: error.message });
  // }
  // next();
};

export default { validLogin };
