const checkLenght = (array, name) => {
if (array.lenght === 0) {
  return { code: 404, message: `Não existem${name} cadastrado(as)` };
} 
return array;
};

const checkId = (result, name) => {
  console.log(result);
  if (result[0]) {
    return result;
  }
  return { code: 404, message: `${name} not found` };
};

module.exports = {
  checkLenght,
  checkId,
};