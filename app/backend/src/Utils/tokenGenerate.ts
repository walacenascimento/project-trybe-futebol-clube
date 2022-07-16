import Jwt = require('jsonwebtoken');

// const { JWT_SECRET } = process.env;
const secret = process.env.JWT_SECRET || 'secret';

const tokenGenerate = (email: string ) => {
    const token = Jwt.sign({ data: { email} }, secret, {
        expiresIn: '1d',
    });
    return token;
};

export default tokenGenerate;