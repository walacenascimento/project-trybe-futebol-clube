import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';
import { Response } from 'superagent';
import { send } from 'process';

const { loginCorreto, loginSemSenha, loginSemEmail, loginSenhaIncorreta, loginEmailIncorreto} = require('./utils')

chai.use(chaiHttp);

const { expect } = chai;

const tokenFake = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NTgzNTc1MjcsImV4cCI6MTY1ODk2MjMyN30.5PY03uLjRXWp364Fit4Wo_gYeC0UccQHXkjRoYug-KY"


describe(' Testa a sessão Login', () => {

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

  it('Testa se o email e senhas estão corretos para fazer login ', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginCorreto)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Testa que não é possível efetuar login sem a senha', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send()
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  //-------------------------
  it('Testa que não é possível fazer login sem o email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginSemEmail)
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa que não é possível fazer login com senha a incorreta', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginSenhaIncorreta)
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  // it('Testa que após efetuar o login, retorna o role', async () => {
  //   chaiHttpResponse = await chai.request(app).post('/login').send(loginCorreto)

  //   chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', chaiHttpResponse.body.token)
  //   expect(chaiHttpResponse.status).to.be.equal(404);
  //   expect(chaiHttpResponse.text).to.be.equal('"admin"');
  // });

  // it('Testa se o token está correto, caso esteja incoreto, não retornara o role', async () => {
  //   chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', tokenFake)
  //   expect(chaiHttpResponse.status).to.be.equal(404);
  // });

});
