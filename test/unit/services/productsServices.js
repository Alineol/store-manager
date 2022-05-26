const sinon = require('sinon');
const {expect} = require ('chai');
const productsService = require('../../../services/productsService')
const productsModel = require('../../../models/productsModel')

describe('Busca todos os produtos no BD(service)', () => {

  describe('quando não existe nenhum produto no BD', () => {
    before(() => {
      const result = [[]]
      sinon.stub(productsModel, 'getAll').resolves(result)
    });
    after(() => {
      productsModel.getAll.restore();
    })

    it('retorna um objeto', async() => {
      const response = await productsService.getAll();
      expect(response).to.be.an('object');
      expect(response).to.has.keys('code', 'message')
    })
  })


  describe('quando existem produtos no BD', () => {
    before(() => {
      const result = [[
          { id: 1, name: 'Martelo de Thor', quantity: 10 },
          { id: 2, name: 'Traje de encolhimento', quantity: 20 }
        ]]

      sinon.stub(productsModel, 'getAll').resolves(result)
    });
    after(() => {
      productsModel.getAll.restore();
    })

    it('retorna um array não vazio', async() => {
      const response = await productsService.getAll();
      expect(response).to.be.an('array');
      expect(response).to.not.be.empty;
    })
  })
})

// describe('busca produto pelo id', () => {
//   describe('quando o produto não existe', () => {
//     before(() => {
//       const resultExecute = [[]];

//       sinon.stub(connection, 'execute').resolves(resultExecute)
//     });
//     after(() => {
//       connection.execute.restore();
//     })
//     it('retonar um array vazio', async() => {
//       const [response] = await productsService.getById(1);
//       expect(response).to.be.an('array');
//       expect(response).to.be.empty;
//     })
//   })

//   describe('quando o produto existe', () => {
//     before(() => {
//       const resultExecute = [{id: 1, name:'pantufa', quantity:10}];

//       sinon.stub(connection, 'execute').resolves(resultExecute)
//     });
//     after(() => {
//       connection.execute.restore();
//     })

//     it('retorna um array não vazio', async() => {
//       const response = await productsService.getById();
//       expect(response).to.be.an('array');
//       expect(response).to.not.be.empty;
//     })
//   })
// })