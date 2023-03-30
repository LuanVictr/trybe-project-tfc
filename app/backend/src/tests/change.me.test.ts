import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import Teams from '../database/models/Teams';
import teamsMock from './mocks/teamsMock.json'
import teamsServices from '../services/teams.services';

chai.use(chaiHttp);

const { expect } = chai;

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
    sinon.stub(Teams, "findAll" ).resolves(teamsMock);
    const result = await teamsServices.getAllTeams();
    expect(result).to.be.deep.equal(teamsMock);
  });
});
