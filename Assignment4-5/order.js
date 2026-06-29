import { Cart } from "./cart.js";

export class Order {
  constructor(orderId, cart) {
    if (typeof orderId !== "number" || isNaN(orderId)) {
      throw new Error("Order ID must be a valid number");
    }
    if (!(cart instanceof Cart)) {
      throw new Error("Argument must be a Cart instance");
    }
    if (cart.contents.length === 0) {
      throw new Error("Cart must have at least one item");
    }

    this.orderId = orderId;
    this.products = [...cart.contents];
    this.total = cart.getTotal();
    this.status = "pending";
  }

  pay() {
    if (this.status !== "pending") {
      throw new Error("Order cannot be paid in its current status");
    }
    this.status = "paid";
  }

  cancel() {
    if (this.status === "cancelled") {
      throw new Error("Order is already cancelled");
    }
    this.status = "cancelled";
  }

  getSummary() {
    return {
      orderId: this.orderId,
      products: this.products,
      total: this.total,
      status: this.status,
    };
  }
}
