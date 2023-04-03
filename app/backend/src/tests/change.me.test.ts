import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import Teams from '../database/models/Teams';
import teamsServices from '../services/teams.services';
import MatchesMock from './mocks/MatchesMock';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [  
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    },
    {
      "id": 5,
      "teamName": "Cruzeiro"
    },
    {
      "id": 6,
      "teamName": "Ferroviária"
    },
    {
      "id": 7,
      "teamName": "Flamengo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
    {
      "id": 10,
      "teamName": "Minas Brasília"
    },
    {
      "id": 11,
      "teamName": "Napoli-SC"
    },
    {
      "id": 12,
      "teamName": "Palmeiras"
    },
    {
      "id": 13,
      "teamName": "Real Brasília"
    },
    {
      "id": 14,
      "teamName": "Santos"
    },
    {
      "id": 15,
      "teamName": "São José-SP"
    },
    {
      "id": 16,
      "teamName": "São Paulo"
    }
]


describe('Testa o backend da aplicação', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;
  afterEach(sinon.restore);

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('A rota /teams deve retornar os times corretamente', async () => {
    const teamsResponse = await chai.request(app).get('/teams');
    expect(teamsResponse.status).to.equal(200);
    expect(teamsResponse.body).to.deep.equal(teamsMock);
  });

  it('A rota /teams/id deve retornar os itens corretamente', async () => {
    const teamsResponse = await chai.request(app).get('/teams/3');
    expect(teamsResponse.status).to.equal(200);
    expect(teamsResponse.body).to.deep.equal(teamsMock[2]);
  });

  it('A rota /teams/id deve retornar um erro caso o time não esteja cadastrado', async() => {
    const teamsResponse = await chai.request(app).get('/teams/999');
    expect(teamsResponse.status).to.equal(404);
    expect(teamsResponse.body).to.deep.equal({"message": "Time não encontrado"})
  });

  it('A rota /login deve retornar um erro caso não seja informado o Email', async () => {
    const loginResponse = await chai.request(app).post('/login').send({"password" : "secret_user"});
    expect(loginResponse.status).to.equal(400);
    expect(loginResponse.body).to.deep.equal({"message": "All fields must be filled"})
  });

  it('A rota /login deve retornar um erro caso não seja informado o Password', async () => {
    const loginResponse = await chai.request(app).post('/login').send({"email":"user@user.com"});
    expect(loginResponse.status).to.equal(400);
    expect(loginResponse.body).to.deep.equal({"message": "All fields must be filled"})
  });

  it('A rota /login deve retornar um erro caso seja informado um email inválido', async () => {
    const loginResponse = await chai.request(app).post('/login').send({"email":"@user.com", "password":"secret_user"});
    expect(loginResponse.status).to.equal(401);
    expect(loginResponse.body).to.deep.equal({"message": "Invalid email or password"})
  });

  it('A rota /login deve retornar um erro caso sseja informado uma senha inválida', async () => {
    const loginResponse = await chai.request(app).post('/login').send({"email":"user@user.com", "password":"jhonsons baby"});
    expect(loginResponse.status).to.equal(401);
    expect(loginResponse.body).to.deep.equal({"message": "Invalid email or password"})
  });

  it('A rota /matches deve retornar todas as partidas registradas', async () => {
    const matchesResponse = await chai.request(app).get('/matches');
    expect(matchesResponse.status).to.equal(200)
    expect(matchesResponse.body).to.deep.equal(MatchesMock)
  })
  


});
