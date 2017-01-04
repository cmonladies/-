let chatOnMessage = (message) => {
  console.log(message);
};

const showReadyForAnswer = (message) => {
  console.log( message, '=> Готовлюсь к ответу');
};


const vkClose = () => {
  console.log("Чат вконтакте закрылся :(");
};

module.exports = {chatOnMessage, showReadyForAnswer, vkClose};