import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';
import Team from '../database/models/team';
import { Response } from 'superagent';
// import { send } from 'process';
import { matches } from './utils';

chai.use(chaiHttp);

const { expect } = chai;

describe(' Testa a seção Matches', () => {

  let chaiHttpResponse: Response;

  describe('1-Testa a função PostMatch do Controller', () => {
    it('Testa se o valor de homeTeam e igual ao valor de awayTeam', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').send({
        homeTeam: 1, awayTeam: 1, homeTeamGoals: 1, awayTeamGoals: 2
      });
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    })
  }) 

  describe('2-Testa se retorna todas as partidas', () => {
    before( async () => {
        sinon.stub(Match, 'findAll').resolves(matches as any)
    });

    after(() => {(Match.findAll as sinon.SinonStub).restore()});

    it('Retorna todas as partidas', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches');
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.an('array');
    });
  });

  describe('3-Testa se retorna todas as partidas finalizadas', () => {
    before( async () => {
        sinon.stub(Match, 'findAll').resolves(matches[1] as any);
    });

    after(() => {(Match.findAll as sinon.SinonStub).restore()});

    it('Retornar todas as partidas finalizadas', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.an('object');
    });
  });

  describe('4-Testa se retorna todas as partidas em andamento', () => {
    before(async () => {
        sinon.stub(Match, "findAll").resolves(matches[40] as any);
    });
  
    after(() => {(Match.findAll as sinon.SinonStub).restore()});

    it('Retorna todas as partidas em andamento', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
    });
  })

  describe('5- Testa se finalizará uma partida', () => {
    before(async () => {
        sinon.stub(Match, "update").resolves(undefined);
    });
  
    after(() => {(Match.update as sinon.SinonStub).restore()});

    it('O endpoint finaliza a partida', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/41/finish');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');
    });
  })

});
