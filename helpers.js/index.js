const checkLength = (array, name) => {
if (array.length === 0) {
  return { code: 404, message: `Não existem ${name} cadastrado(as)` };
} 
return array;
};

const checkId = (result, name) => {
  if (result.length > 1) {
    return result;
  }
  if (result.length === 1) {
    return result[0];
  }
  return { code: 404, message: `${name} not found` };
};

module.exports = {
   checkLength,
  checkId,
};