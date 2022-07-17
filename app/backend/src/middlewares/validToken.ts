// import { Request, Response, NextFunction } from 'express';

// const validToken = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;
//     if(!token) {
//         res.status(401).json({ message: 'Token not found' });
//     }
//     try {
//         return next();
//     } catch (err) {
//         res.status(401).json({ message: 'Expired or invalid token'})
//     }
// };

// export default validToken;