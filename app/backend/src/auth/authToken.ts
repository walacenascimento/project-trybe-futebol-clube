import { SignOptions, sign, verify } from 'jsonwebtoken';
// import jwt = require('jsonwebtoken');
// import { readFileSync } from 'fs';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET || 'jwt_secret';

const tokenGenerate = (payload = {}) => sign(payload, secret, jwtConfig);

const tokenVerifi = (payload: string) => verify(payload, secret);

export default { tokenGenerate, tokenVerifi };
