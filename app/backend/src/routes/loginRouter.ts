import * as express from 'express';
import loginRouter from '../controllers/loginController';
import loginValid from '../middlewares/validate';

const login = express.Router();

login.post('/', loginValid.validLogin, loginRouter.loginCont);
login.get('/', loginRouter.authLoginCont);

export default login;
