import * as bcrypt from 'bcryptjs';
import User from '../database/models/user';
import IUser from '../interfaces/IUsers';
import tokenGenerate from '../Utils/tokenGenerate';

export default class loginService {
  login = async (user: IUser) => {
    const { email, password } = user;
    const users = await User.findOne({ where: { email } });
    // if (postUsers) {
    //   const token = tokenGenerate(email);
    //   return { token };
    // }
    // throw Error('Incorrect email or password');
    if (!users) {
      throw new Error('Incorrect email or password');
    }
    const bcryptCompare = bcrypt.compareSync(password, users.password);
    if (!bcryptCompare) {
      throw new Error('Incorrect passowrd');
    }

    const token = tokenGenerate({ id: users.id, email });
    // const { id, userName, role } = users;
    return token;
  };
}
