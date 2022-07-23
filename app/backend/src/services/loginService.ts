import * as bcrypt from 'bcryptjs';
import User from '../database/models/user';
import tokenGenerate from '../auth/authToken';
import ThrowError from '../utils/throwError';

const throwError = new ThrowError(401, 'Incorrect email or password');

const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user || (bcrypt.compareSync(password, user.password)) === false) {
    throw throwError;
    // return { message: 'Incorrect email or password / A mensagem vem do loginService ' };
  }
  const payload = { username: user.username, role: user.role, email: user.email };
  const token = tokenGenerate.tokenGenerate({ user });
  return { user: payload, token };
};

export default loginService;
