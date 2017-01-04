const ChatApp = require ("./ChatApp.js");
const emmiters = require ("./emmiters.js");

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');


webinarChat.on('message', emmiters.chatOnMessage);
facebookChat.on('message', emmiters.chatOnMessage);
vkChat.on('message', emmiters.chatOnMessage);

//Добавить обработчик события message для Чата Вебинара (webinarChat),
//который выводит в консоль сообщение 'Готовлюсь к ответу'.
//Обработчик создать в отдельной функции.
webinarChat.on('message', emmiters.showReadyForAnswer);

//Для Вконтакте (vkChat) установить максимальное количество обработчиков событий, равное 2.
vkChat.setMaxListeners(2);

//Добавить обработчик 'Готовлюсь к ответу' из пункта 1.1 к чату Вконтакте.
vkChat.on('message', emmiters.showReadyForAnswer);

//Для чата вконтакте (vkChat) добавить обработчик close,
//выводящий в консоль текст "Чат вконтакте закрылся :(".
vkChat.once('close', emmiters.vkClose);
vkChat.close();


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', emmiters.chatOnMessage);
}, 10000 );

// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', emmiters.chatOnMessage);
}, 15000 );

// Добавить код, который через 30 секунд отписывает chatOnMessage от вебинара webinarChat.
setTimeout( ()=> {
  console.log('Закрываю chatOnMessage для вебинара! Остались showReadyForAnswer для вебинара и VK');
webinarChat.removeListener('message', emmiters.chatOnMessage);
}, 30000 );


