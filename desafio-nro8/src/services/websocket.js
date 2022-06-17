import { Server } from 'socket.io';
import moment from 'moment';

import Container from '../model/Container.js';

import { options as sqlite3Options } from "../db/options/sqlite3.db.js";
const sqlite3Model = new Container(sqlite3Options, "messages");

import { options as mysqlOptions } from "../db/options/mysql.js";
const mysqlModel = new Container(mysqlOptions, "products");

import createTables from '../model/createTables.js'


export const initWsServer = async (server) => {

  createTables();

  const io = new Server(server);

  let messages = [];
  let products = [];

  io.on('connection', async (socket) => {
    console.log('Nueva Conexion establecida!');
    socket.emit('message', 'CONECTADO.')
    messages = await sqlite3Model.getElementsAll();
    products = await mysqlModel.getElementsAll();
    socket.emit('updateChat', messages);
    socket.emit('update', products)

    socket.on('new-product', async (data) => {
      await mysqlModel.insertElement(data);
      socket.emit('update', [data]);
    });

    socket.on('new-message', async (data) => {
      let now = new Date();
      let date = moment(now).format('DD/MM/YYYY HH:MM:SS');
      const newMessage = [{ email: data.email, date, text: data.text }];
      await sqlite3Model.insertElement(newMessage);
      socket.emit('updateChat', newMessage);
    });

  })

  return io;

}

