export default class Cart {
  
    constructor(id, products) {
      this.id = id;
      this.products = products;
      this.timestamp = Date.now();
    }
  
    getId() {
      return this.id;
    }
  
    getProducts() {
      return this.products;
    }
  
    setProducts(products) {
      this.products = products;
    }
  
    getTimestamp() {
      return this.timestamp;
    }
  
  }
  