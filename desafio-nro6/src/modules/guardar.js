import Producto from '../class/producto.js';
import Message from '../class/message.js';
import moment from 'moment';
import { productos, messages } from './data.js';
import { guardarMessages } from './../modules/app.js';

export function guardarFromForm(data) {

  let flagError = false;

  if (data.title === undefined || data.title === '') {
    flagError = true;
  }

  if (data.price === undefined || data.price === '') {
    flagError = true;
  }

  if (isNaN(parseFloat(data.price))) {
    flagError = true;
  }

  if (data.thumbnail === undefined || data.thumbnail === '') {
    flagError = true;
  }

  if (flagError) {
    return 400;
  } else {
    const objProducto = new Producto(
      data.title,
      data.price,
      data.thumbnail,
      productos.length + 1
    );
    productos.push(objProducto);
    return 200;
  }
}

export function guardarNewMessage(data) {
  let now = new Date();
  let date = moment(now).format('DD/MM/YYYY HH:MM:SS');
  const newMessage = new Message(data.email, date, data.text);
  messages.push(newMessage);
  guardarMessages(messages);
}