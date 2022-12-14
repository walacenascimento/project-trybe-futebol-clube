// import * as express from 'express';
import { Application as App } from 'express';
import error from '../middlewares/errorMiddleware';
import loginValid from '../middlewares/validateMiddleware';
import authLogin from '../middlewares/authLoginMidlleware';

import loginRouter from '../controllers/loginController'; // mudar o nome no import
import controller from '../controllers/teamsController'; // mudar o nome no import
import matches from '../controllers/matchController';
import leaderboard from '../controllers/leaderBoardController';

const Routes = (app: App) => {
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

  // Rotas de leaderBoard
  app.get('/leaderboard/home', leaderboard.leaderboardHomeCont);
  app.get('/leaderboard/away', leaderboard.leaderboardAwayCont);

  app.use(error);
};

export default Routes;
