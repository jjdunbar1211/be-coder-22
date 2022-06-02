import fs from "fs";
import Cart from "./Cart.js";
import { __dirname, returnMessage } from "../utils.js";

export default class CartContainer {
  
  constructor(path) {
    this.path = path;
  }

  async save(cart) {
    try {
      const carts = await this.getAll();
      const idNewCart = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
      const newCart = new Cart(idNewCart, cart.products);
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return returnMessage(false, `Carrito con id: ${idNewCart} guardado`, newCart);
    } catch (error) {
      return returnMessage(true, "Error al guardar el Carrito", null);
    }
  }

  async deleteById(id) {
    try {
      const carts = await this.getAll();
      const eliminatedCart = carts.find(cart => cart.id === id);
      if (!eliminatedCart) {
        return returnMessage(true, `Carrito con id: ${id} no existe`, null);
      }
      const cartsFiltered = carts.filter(cart => cart.id !== id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(cartsFiltered, null, 2)
      );
      return returnMessage(false, `Carrito con id: ${id} eliminado`, eliminatedCart);
    } catch (error) {
      return returnMessage(true, "Error al eliminar el Carrito", null);
    }
  }

  async addProductToCartById(id, product) {
    try {
      const carts = await this.getAll();
      const cartIndex = carts.findIndex(cart => cart.id === id);
      if (cartIndex === -1) {
        return returnMessage(true, `Carrito con id: ${id} no existe`, null);
      }
      const cart = carts[cartIndex];
      cart.products = [...cart.products, ...product];
      carts[cartIndex] = cart;
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return returnMessage(false, `Agregado/s al carrito con id: ${id}`, cart);
    } catch (error) {
      return returnMessage(true, "Error al agregar el/los producto/s al carrito", null);
    }
  }

  async deleteProductFromCartById(idCart, idProduct) {
    try {
      const carts = await this.getAll();
      const cartIndex = carts.findIndex(cart => cart.id === idCart);
      if (cartIndex === -1) {
        return returnMessage(true, `Carrito con id: ${id} guardado`, null);
      }
      const cart = carts[cartIndex]
      if (!cart.products.find(product => product.id === idProduct)) {
        return returnMessage(true, `Porducto con id: ${idProduct} no existe`, null);
      }
      cart.products = cart.products.filter(p => p.id !== idProduct);
      carts[cartIndex] = cart;
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return returnMessage(false, `Producto con id: ${idProduct} eliminado del carrito con id: ${idCart}`, cart);
    } catch (error) {
      return returnMessage(true, "Error al eliminar el producto del carrito", null);
    }
  }

  async getById(id) {
    try {
      const carts = await this.getAll();
      const cart = carts.find(cart => cart.id === id);
      if (cart) {
        return returnMessage(false, `Carrito con id: ${id} encontrado`, cart);
      } else {
        return returnMessage(true, `No hay carrito con id: ${id}`, null);
      }
    } catch (error) {
      return returnMessage(true, "Error al obtener el Carrito", null);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      return returnMessage(true, "Error al obtener los carritos", null);
    }
  }

}
