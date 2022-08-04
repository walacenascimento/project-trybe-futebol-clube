import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
import { Response } from 'superagent';

import { teams , team } from './utils'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a seção de rotas de /teams e /teams/:id', () => {

    let chaiHttpResponse: Response;
  
    describe('1-Testa se o retorno foi bem sucedidos', () => {
      before(async () => {
        sinon.stub(Team, "findAll").resolves(teams as any);
    
        sinon.stub(Team, 'findByPk').resolves(team as any);
      });
    
      after(()=>{
        (Team.findAll as sinon.SinonStub).restore();
        (Team.findByPk as sinon.SinonStub).restore();
      })
  
      it('O endpoint retorna todos os times', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.an('array');
      });
  
      it('O endpoint retorna o time especificado pela id', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/1');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.property('id');
        expect(chaiHttpResponse.body).to.have.property('teamName');
      });
    })
  
    describe('2- Testa se time não existe', () => {
  
      before(async () => {
        sinon.stub(Team, 'findByPk').resolves(null);
      });
    
      after(()=>{
        (Team.findByPk as sinon.SinonStub).restore();
      })
  
      it('Não é possível retornar um time não cadastrado', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/999999');
  
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.equal(null);
      });
    })
  });
  
