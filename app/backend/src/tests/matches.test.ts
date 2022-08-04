import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';
import { Response } from 'superagent';
// import { send } from 'process';
import { matches } from './utils';

chai.use(chaiHttp);

const { expect } = chai;

describe(' Testa a sessão Matches', () => {

  let chaiHttpResponse: Response;

  describe('1-Testa se retornará todas as partidas', () => {
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

  describe('2-Retorna todas as partidas finalizadas', () => {
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

  describe('Retorna todas as partidas em andamento', () => {
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

  describe('Finaliza uma partida', () => {
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
