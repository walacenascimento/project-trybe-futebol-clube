import jwt = require('jsonwebtoken');
import IToken from '../interfaces/IToken';

// const { JWT_SECRET } = process.env;
const secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig:IToken = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const tokenGenerate = (payload = {}) => jwt.sign({ data: payload }, secret, jwtConfig);

export default tokenGenerate;
