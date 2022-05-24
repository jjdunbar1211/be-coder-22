import express from 'express';
import Producto from './../class/producto.js';
import { contenido } from '../modules/app.js';
import { productos } from '../modules/data.js';

const router = express.Router();

// set de productos iniciales ...
for (let id = 1; id <= 3; id++) {
  const objDatos = contenido();
  const objProducto = new Producto(
    objDatos.title,
    objDatos.price,
    objDatos.thumbnail,
    id
  );
  productos.push(objProducto);
}

router.get('/productos/listar', (req, res) => {

  if (productos.length < 1) {
    return res.status(400).json({
      error: 'No hay productos cargados',
    });
  }

  res.json(productos);

});

router.get('/productos/listar/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const indexId = productos.findIndex(p => p.id === id);

  if (indexId === -1) {
    return res.status(400).json({
      error: 'Producto no encontrado',
    });
  }

  res.json(productos[indexId]);

});

router.post('/guardar', (req, res) => {

  const body = req.body;
  
  const errorGuardar = msg => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (body.title === undefined) {
    errorGuardar('title no definido');
  }

  if (body.price === undefined) {
    errorGuardar('price no definido');
  }

  if (isNaN(parseFloat(body.price))) {
    errorGuardar('price es una letra');
  }

  if (body.thumbnail === undefined) {
    errorGuardar('img no definida');
  }

  const objProducto = new Producto(
    body.title,
    body.price,
    body.thumbnail,
    productos.length + 1
  );
  
  productos.push(objProducto);

  res.json({
    objProducto,
  });

});

router.put('/productos/actualizar/:id', (req, res) => {

  const id = parseInt(req.params.id);
  const body = req.body;

  const msgErrorID = 'Producto no encontrado';
  const msgErrorParametros = 'Parámetros no válidos';

  const errorGuardar = msg => {
    return res.status(400).json({
      error: msg,
    });
  };

  const indexId = productos.findIndex(p => p.id === id);

  if (indexId === -1) {
    errorGuardar(msgErrorID);
  }

  if (body.title === undefined) {
    errorGuardar(msgErrorParametros);
  }

  if (body.price === undefined) {
    errorGuardar(msgErrorParametros);
  }

  if (isNaN(parseFloat(body.price))) {
    errorGuardar(msgErrorParametros);
  }

  if (body.thumbnail === undefined) {
    errorGuardar(msgErrorParametros);
  }

  productos[indexID] = {
    ...productos[indexID],
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail
  }

  res.json(
    productos[indexID]
  );

});

router.delete('/productos/borrar/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const msgErrorID = `No hay cargado un producto con id: ${id}`;

  const errorGuardar = msg => {
    return res.status(400).json({
      error: msg,
    });
  };

  let indexId = productos.findIndex(p => p.id === id);
  
  if (indexId === -1) {
    errorGuardar(msgErrorID);
  }

  const product = productos[indexID];
  productos.splice(indexID, 1);

  res.json(product);

});

export default router;