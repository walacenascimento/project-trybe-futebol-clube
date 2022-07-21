import * as express from 'express';
import loginRouter from '../controllers/loginController';

const userRouter = express.Router();
// const loginController = new LoginController();

userRouter.post('/', loginRouter.loginCont);

export default userRouter;
