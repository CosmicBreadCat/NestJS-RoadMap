### Shop System Demo

#### Products

A **DigitalProduct** and a **PhysicalProduct** are created and added to a cart.

| Field | Digital Product   | Physical Product  |
| ----- | ----------------- | ----------------- |
| ID    | 1                 | 2                 |
| Name  | Video Game        | Keyboard          |
| Price | $60               | $100              |
| Extra | 15000mb file size | 2kg, $10 shipping |

#### Order Lifecycle

An order is created from the cart with a total of **$160**, then paid and cancelled.

| Step             | Status      |
| ---------------- | ----------- |
| Order created    | `pending`   |
| After `pay()`    | `paid`      |
| After `cancel()` | `cancelled` |

---

#### Demo Code:

```js
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
```

---

#### Outputs:

```json
{
  orderId: 1,
  products: [
    DigitalProduct {
      id: 1,
      name: 'Video Game',
      price: 60,
      fileSize: 15000,
      downloadLink: 'https://www.mygamestore.com'
    },
    PhysicalProduct {
      id: 2,
      name: 'Keyboard',
      price: 100,
      weight: 2,
      shippingCost: 10
    }
  ],
  total: 160,
  status: 'pending'
}
```

```json
{
  orderId: 1,
  products: [
    DigitalProduct {
      id: 1,
      name: 'Video Game',
      price: 60,
      fileSize: 15000,
      downloadLink: 'https://www.mygamestore.com'
    },
    PhysicalProduct {
      id: 2,
      name: 'Keyboard',
      price: 100,
      weight: 2,
      shippingCost: 10
    }
  ],
  total: 160,
  status: 'paid'
}
```

```json
{
  orderId: 1,
  products: [
    DigitalProduct {
      id: 1,
      name: 'Video Game',
      price: 60,
      fileSize: 15000,
      downloadLink: 'https://www.mygamestore.com'
    },
    PhysicalProduct {
      id: 2,
      name: 'Keyboard',
      price: 100,
      weight: 2,
      shippingCost: 10
    }
  ],
  total: 160,
  status: 'cancelled'
}
```

---

#### Notes:

- Chose to ommit validators.js and formatters.js as none were needed
