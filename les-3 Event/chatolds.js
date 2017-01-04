const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  }

  close() {
    console.log(`${this.title}`,' closing');
    this.emit('close');
  }
}



let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');


let chatOnMessage = (message) => {
  console.log(message);
};

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);


//Добавить обработчик события message для Чата Вебинара (webinarChat),
//который выводит в консоль сообщение 'Готовлюсь к ответу'.
//Обработчик создать в отдельной функции.

const showReadyForAnswer = (message) => {
  console.log( message, '=> Готовлюсь к ответу');
}
webinarChat.on('message',showReadyForAnswer);

//Для Вконтакте (vkChat) установить максимальное количество обработчиков событий, равное 2.

vkChat.setMaxListeners(2);
/* Демонстрация
vkChat.on('testMaxListeners',() => {
  console.log(1);
});
vkChat.on('testMaxListeners',() => {
  console.log(2);
});
vkChat.on('testMaxListeners',() => {
  console.log(3);
});
vkChat.emit('testMaxListeners');
*/

//Добавить обработчик 'Готовлюсь к ответу' из пункта 1.1 к чату Вконтакте.
vkChat.on('message', showReadyForAnswer);

//Для чата вконтакте (vkChat) добавить обработчик close,
//выводящий в консоль текст "Чат вконтакте закрылся :(".

vkChat.on('close', () => {
  console.log("Чат вконтакте закрылся :(");
});
vkChat.close();


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

// Добавить код, который через 30 секунд отписывает chatOnMessage от вебинара webinarChat.
setTimeout( ()=> {
  console.log('Закрываю chatOnMessage для вебинара! Остались showReadyForAnswer для вебинара и VK');
webinarChat.removeListener('message', chatOnMessage);
}, 30000 );


