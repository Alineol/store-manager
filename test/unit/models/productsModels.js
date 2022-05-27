const sinon = require('sinon');
const {expect} = require ('chai');
const connection = require ('../../../models/connection');
const productsModel = require('../../../models/productsModel')

describe('Busca todos os produtos no BD(model)', () => {
  describe('quando não existe nenhum produto no BD', () => {
    before(() => {
      const resultExecute = [[]];

      sinon.stub(connection, 'execute').resolves(resultExecute)
    });
    after(() => {
      connection.execute.restore();
    })

    it('retorna um array vazio', async() => {
      const [response] = await productsModel.getAll();
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    })
  })
  describe('quando existem produtos no BD', () => {
    before(() => {
      const resultExecute = [{id: 1, name:'pantufa', quantity:10}];

      sinon.stub(connection, 'execute').resolves(resultExecute)
    });
    after(() => {
      connection.execute.restore();
    })

    it('retorna um array não vazio', async() => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
      expect(response).to.not.be.empty;
    })
  })
})

describe('busca produto pelo id(model)', () => {
  describe('quando o produto não existe', () => {
    before(() => {
      const resultExecute = [[]];

      sinon.stub(connection, 'execute').resolves(resultExecute)
    });
    after(() => {
      connection.execute.restore();
    })
    it('retonar um array vazio', async() => {
      const [response] = await productsModel.getById(1);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    })
  })

  describe('quando o produto existe', () => {
    before(() => {
      const resultExecute = [{id: 1, name:'pantufa', quantity:10}];

      sinon.stub(connection, 'execute').resolves(resultExecute)
    });
    after(() => {
      connection.execute.restore();
    })

    it('retorna um array não vazio', async() => {
      const response = await productsModel.getById();
      expect(response).to.be.an('array');
      expect(response).to.not.be.empty;
    })
  })
})

describe('Ao editar um produto com sucesso:', () => {
  before(() => {
    const resultExecute = [[{affectedRows: 1}]];

    sinon.stub(connection, 'execute').resolves(resultExecute)
  });
  after(() => {
    connection.execute.restore();
  })
  it('retorna um array não vazio', async() => {
    const response = await productsModel.edit(1, 'name', 1);
    expect(response).to.be.an('array');
    expect(response).to.not.be.empty;
  })
})

describe('Ao deletar um produto com sucesso:', () => {
  before(() => {
    const resultExecute = [[{affectedRows: 1}]];

    sinon.stub(connection, 'execute').resolves(resultExecute)
  });
  after(() => {
    connection.execute.restore();
  })
  it('retorna um array não vazio', async() => {
    const response = await productsModel.deleteProduct(1);
    expect(response).to.be.an('array');
    expect(response).to.not.be.empty;
  })
})

describe('Ao criar um produto com sucesso:', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{insertId: 1}])
  });
  after(() => {
    connection.execute.restore();
  })
  it('retorna o numero do novo id criado', async() => {
    const response = await productsModel.create('name', 2);
    expect(response).to.be.an('number');
    // expect(response).to.not.be.empty;
  })
})