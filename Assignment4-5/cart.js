import { Product } from "./products.js";

export class Cart {
  constructor() {
    this.contents = [];
  }

  addProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Argument must be a Product instance");
    }

    this.contents.push(product);
  }

  removeProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Argument must be a Product instance");
    }

    const index = this.contents.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.contents.splice(index, 1);
    }
  }

  getTotal() {
    return this.contents.reduce((sum, p) => sum + p.price, 0);
  }

  listProducts() {
    return this.contents;
  }
}
