import * as bcrypt from 'bcryptjs';
import User from '../database/models/user';
import tokenGenerate from '../auth/authToken';

const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user || (bcrypt.compareSync(password, user.password)) === false) {
    return { message: 'Incorrect email or password' };
  }
  const payload = { username: user.username, role: user.role, email: user.email };
  const token = tokenGenerate.tokenGenerate({ user });
  return { user: payload, token };
};

export default loginService;

// -----------------------------------------------
// import User from '../database/models/user';
// import IUser from '../interfaces/IUsers';
// import { tokenGenerate, tokenVerifi } from '../auth/tokenGenerate';
// // import validToken from '../middlewares/validToken';
// import passwordCompare from '../auth/passwordBcrypt';

// class LoginService {
//   // constructor(private models = new User()) {}
//   constructor(private models = User) {
//     this.models = User;
//   }

//   loginServ = async (email: string, password: string): Promise<IUser | null> => {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       throw new Error('All fields must be filled');
//     }

//     const passoword = passwordCompare(password, user.password);
//     if (!passoword) {
//       throw new Error('Incorrect passowrd');
//     }

//     const token = tokenGenerate({ data: { role: user.role, id: user.id } });
//     // const { id, userName, role } = users;
//     return {
//       user: {
//         id: user.id,
//         userName: user.username,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     };
//   };

//   validServ = async (token: string): Promise<string | null> => {
//     if (!token) throw new Error('Token not found ');
//     const data = tokenVerifi(token);
//     const user = await User.findOne({ where: { id: data } });
//     if (!user) return null;

//     const loginUser = user.role;
//     return loginUser;
//   };
// }

// export default new LoginService();
