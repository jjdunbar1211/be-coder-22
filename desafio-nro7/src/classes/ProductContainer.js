import fs from "fs";
import Product from "./Product.js";
import { __dirname, returnMessage } from "../utils.js";

export default class ProductContainer {

  constructor(path) {
    this.path = path;
  }

  async save(product) {
    if (!product.title) {
      return returnMessage(true, "El titulo es obligatorio", null);
    }
    if (!product.description) {
      return returnMessage(true, "La descripcion es obligatoria", null);
    }
    if (!product.code) {
      return returnMessage(true, "El codigo es obligatorio", null);
    }
    if (!product.stock) {
      return returnMessage(true, "El stock es obligatorio", null);
    }
    if (!product.price) {
      return returnMessage(true, "El precio es obligatorio", null);
    }
    if (!product.thumbnail) {
      return returnMessage(true, "La imagen es obligatoria", null);
    }
    try {
      const products = (await this.getAll()).payload;
      const idProducto = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      const newProduct = new Product(idProducto, product.title, product.description, product.code, product.stock, product.price, product.thumbnail);
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return returnMessage(false, "Producto guardado", newProduct);
    } catch (error) {
      return returnMessage(true, "Error al guardar el producto", null);
    }
  }

  async getById(id) {
    try {
      const products = (await this.getAll()).payload;
      const product = products.find(product => product.id === id);
      if (product) {
        return returnMessage(false, `Producto con id: ${id} encontrado`, product);
      } else {
        return returnMessage(true, `Producto con id: ${id} no encontrado`, null);
      }
    } catch (error) {
      return returnMessage(true, `Error al obtener el producto con id: ${id}`, null);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return returnMessage(false, "Productos encontrados", products);
    } catch (error) {
      return returnMessage(true, "Error al obtener los productos", null);
    }
  }

  async deleteById(id) {
    try {
      const products = (await this.getAll()).payload;
      const eliminatedProduct = products.find(product => product.id === id);
      console.log(eliminatedProduct)
      if (!eliminatedProduct) {
        return returnMessage(true, `Producto con id: ${id} no encontrado`, null);
      }
      const productsFiltered = products.filter(product => product.id !== id);
      console.log(productsFiltered)
      await fs.promises.writeFile(this.path, JSON.stringify(productsFiltered, null, 2));
      return returnMessage(false, `Producto con id: ${id} eliminado`, eliminatedProduct);
    } catch (error) {
      return returnMessage(true, `Error al intentar eliminar el producto con id: ${id}`, null);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "[]");
      return returnMessage(false, "Productos eliminados", null);
    } catch (error) {
      return returnMessage(true, "Error al eliminar los productos", null);
    }
  }

  async updateById(id, newProduct) {
    try {
      const products = (await this.getAll()).payload;
      const indexProduct = products.findIndex(product => product.id === id);
      if (indexProduct === -1) {
        await this.deleteImage(newProduct.thumbnail);
        return returnMessage(true, `Producto con id: ${id} no encontrado`, null);
      }
      const productToBeUpdated = products[indexProduct];
      products[indexProduct] = { ...productToBeUpdated, ...newProduct };
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return returnMessage(false, `Producto con id: ${id} actualizado`, products[indexProduct]);
    } catch (error) {
      return returnMessage(true, "Error al actualizar el producto", null);
    }
  }

}
