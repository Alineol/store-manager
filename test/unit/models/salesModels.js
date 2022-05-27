const sinon = require('sinon');
const {expect} = require ('chai');
const connection = require ('../../../models/connection');
const salesModel = require('../../../models/salesModel')

describe('Busca todas as vendas no BD(model)', () => {
  describe('quando não existe nenhuma venda no BD', () => {
    before(() => {
      const resultExecute = [[]];

      sinon.stub(connection, 'execute').resolves(resultExecute)
    });
    after(() => {
      connection.execute.restore();
    })

    it('retorna um array vazio', async() => {
      const [response] = await salesModel.getAll();
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    })
  })
  describe('quando existe vendas no BD', () => {
    before(() => {
      const resultExecute = [{saleId: 1,
      date: "2022-05-26T14:05:00.000Z",
      quantity: 5,
      productId: 1}];

      sinon.stub(connection, 'execute').resolves(resultExecute)
    });
    after(() => {
      connection.execute.restore();
    })

    it('retorna um array não vazio', async() => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
      expect(response).to.not.be.empty;
    })
  })
})

describe('busca venda pelo id', () => {
  describe('quando a venda não existe', () => {
    before(() => {
      const resultExecute = [[]];

      sinon.stub(connection, 'execute').resolves(resultExecute)
    });
    after(() => {
      connection.execute.restore();
    })
    it('retonar um array vazio', async() => {
      const [response] = await salesModel.getById(1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    })
  })

  describe('quando a venda existe', () => {
    before(() => {
      const resultExecute = [{
        saleId: 1,
        date: "2022-05-26T14:05:00.000Z",
        quantity: 5,
        productId: 1
      }];

      sinon.stub(connection, 'execute').resolves(resultExecute)
    });
    after(() => {
      connection.execute.restore();
    })

    it('retorna um array não vazio', async() => {
      const response = await salesModel.getById();
      expect(response).to.be.an('array');
      expect(response).to.not.be.empty;
    })
  })
})