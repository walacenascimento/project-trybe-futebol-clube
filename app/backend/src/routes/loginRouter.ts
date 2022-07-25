import * as express from 'express';
import loginRouter from '../controllers/loginController';
// import loginValid from '../middlewares/validateMiddleware';
import loginValid from '../middlewares/validateMiddleware';
import authLoginCont from '../middlewares/authLoginMidlleware';

const login = express.Router();

login.post('/login', loginValid.validLogin, loginRouter.loginCont);
login.get('/login/validate', authLoginCont);

// login.post('/login', loginRouter.loginCont);
// login.get('/login/validate', loginValid.validLogin, authLoginCont);

export default login;
