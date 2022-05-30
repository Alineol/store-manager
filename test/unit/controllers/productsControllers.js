const sinon = require('sinon');
const {expect} = require ('chai');
const productsService = require('../../../services/productsService')
const productsController = require('../../../controllers/productsController');

describe('1- Busca todos os produtos no BD(controller)', () => {
  const response = {}
  const request = {}

  describe('- quando não existe nenhum produto no BD:', () => {
    before(() => {

    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()

    sinon.stub(productsService, 'getAll').resolves({code: 404, message: 'produtos não cadastrados'})
  });

    after(() => {
      productsService.getAll.restore();
    })

    it('é chamado o status 404 com um objeto ', async() => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })


  describe('- quando existem produtos no BD:', () => {

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves([
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
      productsService.getAll.restore();
    })

    it('é chamando o status 200 com um array como resposta ', async() => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true); 
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })
})

describe('2- Busca produtos pelo id(controler)', () => {
  const response = {}
  const request = {}
  describe('- quando é encontrado um produto:', () => {

    before(() => {
      request.params = { id:1}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(productsService, 'getById').resolves([{
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }])
      
    })

    after(() => {
      productsService.getById.restore()
    })

    it('é chamado status 200 com um objeto no json', async() => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })

  describe('- quando não é encontrado um produto:', () => {
    before(() => {
      request.params = { id:8}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()

      sinon.stub(productsService, 'getById').resolves({ code: 404, message: `Product not found` })
    })

    after(() => {
      productsService.getById.restore()
    })

    it('é chamado status 404 com um objeto no json', async() => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })
})

describe('3- Ao criar um novo produto', () => {
  const response = {}
  const request = {}

  describe('-ao cria um produto com um nome que já existe:', () => {
    before(() => {
      request.body = { name: "Traje de encolhimento", quantity: 10 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
      sinon.stub(productsService, 'create').resolves({code: 409, message: 'Product already exists'})
    });
    after(() => {
      productsService.create.restore();
    })

    it('é chamado status 409 com um objeto no json', async() => {
      await productsController.create(request, response);
      expect(response.status.calledWith(409)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    })
  })

  describe('-ao criar um produto com sucesso', () => {
    before(() => {
          request.body = { name: "chapeu maluco", quantity: 10 }
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns()
          sinon.stub(productsService, 'create').resolves(
            {
              "id": 3,
              "name": "chapeu maluco",
              "quantity": 10
            },
          )
        });
        after(() => {
          productsService.create.restore();
        })

        it('é chamado status 200 com um objeto no json', async() => {
          await productsController.create(request, response);
          console.log(response.status)
          expect(response.status.calledWith(201)).to.be.equal(true);
          expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
        })
  })
})