import { leerMessages } from './app.js';

const productos = [];
const messages = [];

function checkMessagesOld() {
  let messageOld = JSON.parse(leerMessages());
  if (messageOld !== -1) {
    messages.push.apply(messages, messageOld);
  }
}

checkMessagesOld();

export { productos, messages };