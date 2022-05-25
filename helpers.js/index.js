const checkLenght = (array, name) => {
if (array.lenght === 0) {
  return { s: 404, message: `Não existem ${name} cadastrado(s)` };
} 
return { s: 200, message: array };
};

// const checkId = (result, name) => {
//   if (result[0]) {
//     const response = result[0];
//     return { s: 200, response };
//   }
//   return { s: 200, message: `${name} not found` };
// };

module.exports = {
  checkLenght,
};