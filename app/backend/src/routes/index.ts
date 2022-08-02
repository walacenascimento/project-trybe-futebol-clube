// import * as express from 'express';
import { Application as App } from 'express';
import error from '../middlewares/errorMiddleware';
import loginValid from '../middlewares/validateMiddleware';
import authLogin from '../middlewares/authLoginMidlleware';

import loginRouter from '../controllers/loginController'; // mudar o nome no import
import controller from '../controllers/teamsController'; // mudar o nome no import
import matches from '../controllers/matchController';

const Routes = (app: App) => {
  // const login = express.Router();

  // Rotas de user
  app.post('/login', loginValid.validLogin, loginRouter.loginCont);
  app.get('/login/validate', authLogin.authLoginCont);

  // Rotas de teams
  app.get('/teams', controller.getTeamsCont);
  app.get('/teams/:id', controller.getTeamById);

  // Rotas de matechs
  app.get('/matches', matches.getMatch);
  app.post('/matches', authLogin.authTokenMatch, matches.postMatch);
  app.patch('/matches/:id/finish', matches.patchMatch);
  app.patch('/matches/:id', matches.patchMatchId);

  // login.post('/login', loginValid.validLogin, loginRouter.loginCont);
  // login.get('/login/validate', authLoginCont);

  // login.post('/login', loginRouter.loginCont);
  // login.get('/login/validate', loginValid.validLogin, authLoginCont);

  app.use(error);

  // export default login;
};

export default Routes;
