const sinon = require('sinon');
const {expect} = require ('chai');
const salesController = require('../../../controllers/salesController')
const salesService = require('../../../services/salesService');

describe('Busca todas as vendas no BD(controller)', () => {
  const response = {}
  const request = {}

  describe('-quando não existe nenhum produto no BD:', () => {
    before(() => {

    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()

    sinon.stub(salesService, 'getAll').resolves({code: 404, message: 'produtos não cadastrados'})
  });

    after(() => {
      salesService.getAll.restore();
    })

    it('é chamado o status 404 com um objeto ', async() => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })


  describe('-quando existem produtos no BD:', () => {

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves([
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        }
      ])
    });
    after(() => {
      salesService.getAll.restore();
    })

    it('é chamando o status 200 com um array como resposta ', async() => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true); 
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })
})

describe(' Busca vendas pelo id(controler)', () => {
  const response = {}
  const request = {}
  describe('- quando uma ou mais vendas são encontradas:', () => {

    before(() => {
      request.params = { id:1}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(salesService, 'getById').resolves([[
        {
          "date": "2022-05-27T18:18:08.000Z",
          "quantity": 5,
          "productId": 1
        },
        {
          "date": "2022-05-27T18:18:08.000Z",
          "quantity": 10,
          "productId": 2
        }
      ]])
    })

    after(() => {
      salesService.getById.restore()
    })

    it('é chamado status 200 com um array no json', async() => {
      await salesController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('- quando vendas não são encontradas pelo id:', () => {
    before(() => {
      request.params = { id:8}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(salesService, 'getById').resolves({ code: 404, message: `Product not found` })
    })

    after(() => {
      salesService.getById.restore()
    })

    it('é chamado status 404 com um objeto no json', async() => {
      await salesController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })
})

describe('Cria uma nova venda:', () => {
  const response = {}
  const request = {}
  describe('- ao criar venda com um produto', () => {

    before(() => {
      request.body =  [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(salesService, 'create').resolves({ id: 10, itemsSold: [
        {
          "productId": 1,
          "quantity": 3
        }
      ] });
    })

    after(() => {
      salesService.create.restore()
    })

    it('é chamado status 201 com um objeto no json', async() => {
      await salesController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })

  describe('- ao criar venda com mais de um produto:', () => {

    before(() => {
      request.body =    [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(salesService, 'create').resolves( {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 2
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      });
    })

    after(() => {
      salesService.create.restore()
    })

    it('é chamado status 201 com um objeto no json', async() => {
      await salesController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })
})

// describe('Edita uma venda:', () => {
//   const response = {}
//   const request = {}
//   describe('- ao registrar uma venda com sucesso:', () => {

//     before(() => {
//       request.body =  [
//         {
//           "productId": 1,
//           "quantity": 3
//         }
//       ]
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns()

//       sinon.stub(salesService, 'create').resolves({ id: 10, itemsSold: [
//         {
//           "productId": 1,
//           "quantity": 3
//         }
//       ] });
//     })

//     after(() => {
//       salesService.create.restore()
//     })

//     it('é chamado status 201 com um objeto no json', async() => {
//       await salesController.create(request, response);
//       expect(response.status.calledWith(201)).to.be.equal(true);
//       expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
//     })
//   })

//   describe('- ao registrar venda, com mais de um produto ,com sucesso:', () => {

//     before(() => {
//       request.body =    [
//         {
//           "productId": 1,
//           "quantity": 2
//         },
//         {
//           "productId": 2,
//           "quantity": 5
//         }
//       ]
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns()

//       sinon.stub(salesService, 'create').resolves( {
//         "id": 1,
//         "itemsSold": [
//           {
//             "productId": 1,
//             "quantity": 2
//           },
//           {
//             "productId": 2,
//             "quantity": 5
//           }
//         ]
//       });
//     })

//     after(() => {
//       salesService.create.restore()
//     })

//     it('é chamado status 201 com um objeto no json', async() => {
//       await salesController.create(request, response);
//       expect(response.status.calledWith(201)).to.be.equal(true);
//       expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
//     })
//   })
// })


