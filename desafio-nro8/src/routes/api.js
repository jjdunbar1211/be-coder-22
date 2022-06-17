import express from 'express';

const router = express.Router();

//MODEL
import Container from '../model/Container.js';
import { options as mysqlOptions } from "../db/options/mysql.js";
const mysqlModel = new Container(mysqlOptions, "messages");

//MIDDLEWARES
function validateProduct(req, res, next) {
  const { title, price, imageUrl } = req.body;
  if (!title || !price || !imageUrl) return res.status(406).json({ error: "Invalid product." });
  else next();
}

async function productsAvailable(req, res, next) {
  try {
    const response = await model.isEmpty();
    if (!response) res.status(404).json({ error: "There aren't products loaded." });
    else next();
  } catch (error) {
    res.status(500).json({ error: "Error while checking if products table is empty.", description: error.message });
  }
}

function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "The ID entered is not a number." });
  if (!Number.isInteger(id)) return res.status(400).json({ error: "The ID entered is not an integer." });
  next();
}

async function productExists(req, res, next) {
  const id = Number(req.params.id);
  try {
    const product = await mysqlModel.getElementById(id);
    if (!product) res.status(404).json({ error: "Product not found" });
    else next();
  } catch (error) {
    res.status(500).json({ error: "Error while checking if product exists.", description: error.message });
  }
}

//HELPER FUNCTIONS
async function emitLoadProducts() {
  try {
    const products = await mysqlModel.getElementsAll();
    const { io } = require("../server");
    io.sockets.emit("loadProducts", products);
  } catch (error) {
    console.log(error.message);
  }
}

router.get('/productos/listar', productsAvailable, async (req, res) => {
  try {
    const products = await mysqlModel.getElementsAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error while getting all products.", description: error.message });
  }
});

router.get('/productos/listar/:id', productsAvailable, validateId, productExists, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await mysqlModel.getElementById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error while getting product by ID.", description: error.message });
  }
});

router.post('/guardar', validateProduct, async (req, res) => {
  try {
    const product = await mysqlModel.insertElement(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error while inserting new product.", description: error.message });
  }
  await emitLoadProducts();
});

router.put('/productos/actualizar/:id', productsAvailable, validateId, productExists, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await mysqlModel.updateElement(id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error while updating product.", description: error.message });
  }
  await emitLoadProducts();
});

router.delete('/productos/borrar/:id', productsAvailable, validateId, productExists, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await mysqlModel.deleteElementById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error while deleting product.", description: error.message });
  }
  await emitLoadProducts();
});

export default router;