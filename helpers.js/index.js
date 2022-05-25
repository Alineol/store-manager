const checkLenght = (array, name) => {
if (array.lenght === 0) {
  return { s: 200, m: `Não existem ${name} cadastrado(s)` };
} 
return { s: 200, m: array };
};

module.exports = {
  checkLenght,
};