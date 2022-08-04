import * as bcrypt from 'bcryptjs';
import User from '../database/models/user';
import tokenGenerate from '../auth/authToken';

const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Incorrect email or password');
  }
  const bcryptCompare = bcrypt.compareSync(password, user.password);
  if (!bcryptCompare) {
    throw new Error('Incorrect email or password');
  }
  const token = tokenGenerate.tokenGenerate({ user });
  return token;
};

export default loginService;
