/* 
    tres rutas
        1) / --> html con listado de los endpoints que pide el desafío
        2) /productos --> endpoint que trae la lista de productos 
        3) /productoRandom --> trae un producto al azar de la lista
*/

import express from 'express';
import Contenedor from './contenedor.js';

const app = express();

app.get('/', (req, res) => {
    res.send(`<div style="background: #3CEFAB;">
    <h1 style="text-align: center;">Desafío Nro. 3</h1>
    <h2 style="text-align: center;">Mignone Carlos - Backend Coderhouse</h2></div>
    <ul>
    <li>Ruta get '/productos' devuelve el listado de productos.</li>
    <li>Ruta get '/productoRandom' devuelva un producto elegido al azar.</li>
    </li>
    </ul>`)
})

const unContenedor = new Contenedor('productos.txt');

app.get('/productos', async (req, res) => {
    const productos = await unContenedor.getAll();
    res.status(200).json(productos);
})

app.get('/productoRandom', async (req, res) => {
    const cantidadDeProductos = (await unContenedor.getAll()).length;
    const randomProduct = await unContenedor.getById(Math.floor(Math.random() * (cantidadDeProductos)) + 1);
    res.status(200).json(randomProduct)
});


app.get('*', (req, res) => {
    res.status(404).send('Enpoint no implementado.');
});

app.listen(8080, () => {
    console.log('Servidor http escuchando en el puerto 8080.');
})

app.on("error", error => console.log(`Error en servidor ${error.message}.`));

