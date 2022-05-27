const sinon = require('sinon');
const {expect} = require ('chai');
const salesService = require('../../../services/salesService')
const salesModel = require('../../../models/salesModel')



describe('Busca todos as vendas no BD(service)', () => {

  describe('-quando não existe nenhuma venda no BD:', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([[]])
    });
    after(() => {
      salesModel.getAll.restore();
    })

    it('retorna um objeto com as chaves "code" e "message"', async() => {
      const response = await salesService.getAll();
      expect(response).to.be.an('object');
      expect(response).to.has.keys('code', 'message')
    })
  })


  describe('-quando existem vendas no BD', () => {
    before(() => {
      const result = [[
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]]

      sinon.stub(salesModel, 'getAll').resolves(result)
    });
    after(() => {
      salesModel.getAll.restore();
    })

    it('retorna um array não vazio:', async() => {
      const response = await salesService.getAll();
      expect(response).to.be.an('array');
      expect(response).to.not.be.empty;
    })
  })
})

describe('Busca vendas pelo id(service)', () => {
  describe('-quando o produto não existe:', () => {
    before(() => {
      const resultExecute = [[]];

      sinon.stub(salesModel, 'getById').resolves(resultExecute)
    });
    after(() => {
      salesModel.getById.restore();
    })
    it('retonar um array vazio', async() => {
      const response = await salesService.getById(1);
      expect(response).to.be.an('object');
      expect(response).to.has.keys('code', 'message')
    })
  })

  describe('-quando as vendas existem:', () => {
    before(() => {
      const result = [[
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ],[]];

      sinon.stub(salesModel, 'getById').resolves(result)
    });
    after(() => {
      salesModel.getById.restore();
    })

    it('retorna um array não vazio e os elementos to array possuem as chaves necessárias', async() => {
      const response = await salesService.getById();
      expect(response).to.be.an('array');
      response.forEach((item) => expect(item).to.has.keys('date', 'productId', 'quantity'))
      
    })
  })
})