const express = require('express');
const { productsRoutes } = require('./products/products.routes');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/products', productsRoutes);

module.exports = { apiRoutes: router };