// import * as express from 'express';
import { Application as App } from 'express';
import error from '../middlewares/errorMiddleware';
import loginValid from '../middlewares/validateMiddleware';
import authLoginCont from '../middlewares/authLoginMidlleware';

import loginRouter from '../controllers/loginController';
import controller from '../controllers/teamsController';

const Routes = (app: App) => {
  // const login = express.Router();

  app.post('/login', loginValid.validLogin, loginRouter.loginCont);
  app.get('/login/validate', authLoginCont);

  app.get('/teams', controller.getTeamsCont);
  app.get('/teams/:id', controller.getTeamById);

  // login.post('/login', loginValid.validLogin, loginRouter.loginCont);
  // login.get('/login/validate', authLoginCont);

  // login.post('/login', loginRouter.loginCont);
  // login.get('/login/validate', loginValid.validLogin, authLoginCont);

  app.use(error);

  // export default login;
};

export default Routes;
