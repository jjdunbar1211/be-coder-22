const express = require('express');
const { products } = require('../../data/data.products');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/vista', (req, res) => {
    res.render('listproducts', {
        layout: 'index',
        products: products,
        productExists: products.length === 0 ? false : true
    }); 
});

router.get('/agregar', (req, res) => {
    res.render('addproducts', { layout: 'index' });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === parseInt(id));
    if (!product) {
        return res.status(404).json({ success: false, error: `No hay producto con id: ${id}.` });
    }
    return res.json({ success: true, result: product });
});

router.post('/guardar', (req, res) => {
    const { title, price, image } = req.body;
    if (!title || !price || !image) {
        return res.status(400).json({ succes: false, error: 'Falta algún dato.' });
    }
    const newProduct = {
        id: products[products.length - 1].id + 1,
        title,
        price,
        image
    };
    products.push(newProduct);
    return res.redirect('/api/products/vista');
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { newTitle, newPrice, newImage } = req.body;
    if (!newTitle && !newPrice && !newImage) {
        return res.status(400).json({ success: false, error: 'Debe modificarse al menos un dato.' });
    };
    const productIndex = products.findIndex(product => product.id === parseInt(id));
    if (productIndex < 0) return res.status(404).json({ success: false, error: `No hay producto con id: ${productId}.` });
    const newProduct = {
        ...products[productIndex],
    };
    newProduct.title = newTitle || newProduct.title;
    newProduct.price = newPrice || newProduct.price;
    newProduct.image = newImage || newProduct.image;
    products[productIndex] = newProduct;
    return res.json({ success: true, result: newProduct });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === parseInt(id));
    if (productIndex < 0) return res.status(404).json({ success: false, error: `No hay producto con id: ${id}.` });
    products.splice(productIndex, 1);
    return res.json({ success: true, result: `Producto con id: ${id} arafueee. ` });
});

module.exports = { productsRoutes: router };