import { Request, Response, NextFunction} from 'express';

const validPassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if(!password || password.length < 6 ) {
        return res.status(400).json({ message: "All fields must be filled" })
    }
};

export default validPassword;