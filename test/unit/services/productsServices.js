const sinon = require('sinon');
const {expect} = require ('chai');
const productsService = require('../../../services/productsService')
const productsModel = require('../../../models/productsModel')

describe('Busca todos os produtos no BD(service)', () => {

  describe('-quando não existe nenhum produto no BD:', () => {
    before(() => {
      const result = [[]]
      sinon.stub(productsModel, 'getAll').resolves(result)
    });
    after(() => {
      productsModel.getAll.restore();
    })

    it('retorna um objeto com as chaves code e message', async() => {
      const response = await productsService.getAll();
      expect(response).to.be.an('object');
      expect(response).to.has.keys('code', 'message')
    })
  })


  describe('-quando existem produtos no BD:', () => {
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

describe('Busca produto pelo id(service)', () => {
  describe('-quando o produto não existe:', () => {
    before(() => {
      const resultExecute = [[]];

      sinon.stub(productsModel, 'getById').resolves(resultExecute)
    });
    after(() => {
      productsModel.getById.restore();
    })
    it('retonar um array vazio', async() => {
      const response = await productsService.getById(1);
      expect(response).to.be.an('object');
      expect(response).to.has.keys('code', 'message')
    })
  })

  describe('-quando o produto existe:', () => {
    before(() => {
      const result = [[{id: 1, name:'pantufa', quantity:10}]];

      sinon.stub(productsModel, 'getById').resolves(result)
    });
    after(() => {
      productsModel.getById.restore();
    })

    it('retorna um  array com um objeto tendo as chaves id, name e quantity', async() => {
      const response = await productsService.getById();
      expect(response).to.be.an('array');
      expect(response[0]).to.has.keys('id', 'name', 'quantity')
    })
  })
})

describe('Edita um produto com sucesso(service):', ()=> {
  before(() => {
    const resultExecute = [{affectedRows: 1}];
    sinon.stub(productsModel, 'getById').resolves([[123]])
    sinon.stub(productsModel, 'edit').resolves({affectedRows: 1})
  });
  after(() => {
    productsModel.getById.restore()
    productsModel.edit.restore();
  })

  it('retorna um objeto com as chaves id, name e quantity', async() => {
    const response = await productsService.edit('chapéu', 2, 1);
    expect(response).to.be.an('object');
    expect(response).to.has.keys('id', 'name', 'quantity')
  })
})

describe('Deleta um produto(service)', ()=> {

  describe('- ao tentar deletar um produto que não existe:', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([{ code: 404, message: 'Product not found' }])
    });
    after(() => {
      productsModel.getById.restore();
    })
  
    it('retorna um objeto com as chaves code e message', async() => {
      const response = await productsService.deleteProduct(1);
      expect(response).to.be.an('object');
      expect(response).to.has.keys('code', 'message')
    })
  })

  describe('-ao tentar deletar um produto que existe:', () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves([[123]])
      sinon.stub(productsModel, 'deleteProduct').resolves([[{affectedRows: 1}]])
    });
    after(() => {
      productsModel.getById.restore();
      productsModel.deleteProduct.restore();
    })
    it('retorna um array não vazio', async() => {
      const response = await productsService.deleteProduct(1);
      expect(response).to.be.an('array');
      expect(response).to.not.be.empty
    })
  })
 
})