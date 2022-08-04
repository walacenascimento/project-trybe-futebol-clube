import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Sequelize from '../database/models';
import { Response } from 'superagent';

import { leaderboardHome, leaderboardAway } from './utils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a seção de Leaderboard', () => {

    let chaiHttpResponse: Response;
  
    describe('1-Testa a leaderboard Home', () => {
      before(async () => {
        sinon
          .stub(Sequelize, "query")
          .resolves([leaderboardHome] as any)
      });
    
      after(()=>{
        (Sequelize.query as sinon.SinonStub).restore();
      })
    
      it('Testa se retorna leaderboard home', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.an('array');
  
      });
    })
  
    describe('2-Testa a leaderboard Away', () => {
      before(async () => {
        sinon
          .stub(Sequelize, "query")
          .resolves([leaderboardAway] as any)
      });
    
      after(()=>{
        (Sequelize.query as sinon.SinonStub).restore();
      })
    
      it('Testa se retorna a leaderboard away', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.an('array');
  
      });
    })
  });
  