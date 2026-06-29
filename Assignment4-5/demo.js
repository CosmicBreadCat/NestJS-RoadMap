import * as shop from "./index.js";

let myDigitalProduct = new shop.DigitalProduct(
  1,
  "Video Game",
  60,
  15000,
  "https://www.mygamestore.com",
);

let myPhysicalProduct = new shop.PhysicalProduct(2, "Keyboard", 100, 2, 10);

let cart = new shop.Cart();

cart.addProduct(myDigitalProduct);
cart.addProduct(myPhysicalProduct);

let order = new shop.Order(1, cart);

console.log(order.getSummary());
order.pay();
console.log(order.getSummary());
order.cancel();
console.log(order.getSummary());
