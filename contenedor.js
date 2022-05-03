import fs from 'fs'

export default class Contenedor {
    constructor(nombreArchivoConExtension) {
        this.rutaAlArchivo = `./${nombreArchivoConExtension}`;
    }

    async save(product) {
        try {
            const data = await this.getAll();
            const newProduct = {
                id: newData[newData.length - 1].id + 1,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            data.push(newProduct);
            await fs.promises.writeFile(this.rutaAlArchivo, JSON.stringify(data));
            return newProduct.id;
        } catch (err) {
            console.log('[save] --> error al guardar un nuevo producto.');
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.rutaAlArchivo, { encoding: 'utf8' });
            return JSON.parse(data);
        } catch (error) {
            console.log('[getAll] --> error al recuperar el listado de productos.');
        }
    }

    async getById(idProdABuscar) {
        try {
            const dataJSON = await fs.promises.readFile(this.rutaAlArchivo, { encoding: 'utf8' });
            const data = JSON.parse(dataJSON);
            let productoEncontrado;
            if (data) {
                productoEncontrado = data.find(p => p.id == idProdABuscar);
            }
            return productoEncontrado;
        } catch (error) {
            console.log(`[getById] --> error al recuperar el producto con id: ${idProdABuscar}.`);
        }
    }

    async deleteById(idProdAEliminar) {
        try {
            const data = await fs.promises.readFile(this.rutaAlArchivo, { encoding: 'utf8' });
            const dataJson = JSON.parse(data);
            const newData = dataJson.filter(p => p.id !== idProdAEliminar);
            await fs.promises.writeFile(this.rutaAlArchivo, JSON.stringify(newData));
        } catch (error) {
            console.error(`[deleteById] --> error al eliminar el producto con id: ${idProdAEliminar}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.rutaAlArchivo, JSON.stringify([]));
        } catch (error) {
            console.log('[deleteAll] --> error al eliminar todos los productos de la lista.');
        }
    }

}



