import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';
import { Response } from 'superagent';
// import { send } from 'process';

const {
  loginCorreto,
  loginSemSenha,
  loginSemEmail,
  // loginSenhaIncorreta,
  loginEmailIncorreto,
} = require('./utils')

chai.use(chaiHttp);

const { expect } = chai;

//const tokenFake = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NTk2MTc4ODgsImV4cCI6MTY2MDIyMjY4OH0.SdZuZP-8Mr-jCzXUHyflE5I2-DhuE11Bmr91lpEPgUk"

const invaliToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NTgzNTc1MjcsImV4cCI6MTY1ODk2MjMyN30.5PY03uLjRXWp364Fit4Wo_gYeC0UccQHXkjRoYug-00"

describe(' Testa a seção Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(user, "findOne")
      .resolves({ 
        username: 'admin',
        email: 'admin@admin.com',
        role: 'admin',
        password: '$2a$04$M7hUZciSJWdhCiPsAWkpqeAT4gEAkgTBGnSG0CHyxrlM4Hw6i/4.i'
      } as user);
  });

  after(()=>{
    (user.findOne as sinon.SinonStub).restore();
  })

  it('1-Testa se o email e senha estão corretos para fazer login ', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginCorreto)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('2-Testa que não é possível efetuar login sem a senha', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginSemSenha)
    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('3-Testa que não é possível fazer login sem o email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginSemEmail)
    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('4-Testa que não é possível fazer login com senha a incorreta', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'senha_incorreta',
    })
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('5-Testa que após efetuar o login, retorna o role', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginCorreto)
    const { token } = chaiHttpResponse.body;
  
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', token)
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.text).to.be.equal('{"role":"admin"}');
  });

  it('6-Testa se o token é inválido , caso esteja incoreto, não retornara o role', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', invaliToken)
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('7-Testa se não tiver authorization, retorna o erro', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', invaliToken);
    
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

});
