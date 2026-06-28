# JavaScript Backend Assignments

## General Rules

You must write clean JavaScript code using Node.js.

Do not use external packages unless the assignment explicitly allows it.

Your code should be readable, modular, and easy to review.

For every assignment, include:

- The source code.
- A short `README.md` explaining how to run it.
- Example inputs and outputs.
- Notes about important decisions or assumptions you made.

---

# Assignment 1: Receipt Generator

## Goal

Build a small receipt generator that receives raw order data and returns a formatted receipt.

## Input Example

```js
const order = {
  customerName: "Ahmad Ali",
  quantity: "3",
  unitPrice: "19.99",
  discount: "5",
  taxRate: "0.19",
  shipping: "5",
  status: "paid",
};
```

## Requirements

Create a function called:

```js
generateReceipt(order);
```

The function should:

- Prepare the customer name for printing.
- Prepare numeric fields before doing calculations.
- Calculate:
  - subtotal
  - discount amount
  - tax amount
  - shipping cost
  - final total

- Apply reasonable default values for optional fields when they are not provided.
- Add a short message based on the order status.
- Return a formatted multiline receipt.

## Expected Output Style

The result should be a readable receipt string, for example:

```txt
Receipt
Customer: Ahmad Ali
Subtotal: 59.97
Discount: 5.00
Tax: 10.44
Shipping: 5.00
Total: 70.41
Status: Payment received
```

You may choose your own exact formatting, but it must be consistent and easy to read.

---

# Assignment 2: User Import Cleaner

## Goal

You receive user data from another system. Clean it, validate it, remove duplicate records, and generate a report.

## Input Example

```js
const users = [
  {
    id: 1,
    name: "Sara",
    email: "sara@example.com",
    age: "25",
    roles: "admin,user",
    score: "88",
  },
  {
    id: 2,
    name: "Omar",
    email: "omar@example.com",
    age: "22",
    roles: "user",
    score: "70",
  },
  {
    id: 3,
    name: "Ali",
    email: "ali@example.com",
    age: "30",
    roles: "editor,user",
    score: "91",
  },
  {
    id: 4,
    name: "Lina",
    email: "lina@example.com",
    age: "28",
    roles: "user",
    score: "95",
  },
];
```

## Requirements

Create a function called:

```js
cleanUsers(users);
```

The function should:

- Prepare names and emails for consistent use.
- Prepare age and score as numeric values.
- Validate each user record.
- Remove records that cannot be used.
- Remove duplicate users by email.
- Convert the roles field into a list.
- Sort valid users by score from highest to lowest.
- Return a report containing:
  - cleaned users
  - removed users with reason
  - top 3 users
  - a comma-separated list of valid emails

## Output Example Shape

```js
{
  cleanedUsers: [],
  removedUsers: [],
  topUsers: [],
  validEmails: ""
}
```

The exact content depends on the input data.

---

# Assignment 3: Functional Metrics Engine

## Goal

Build a small analytics engine for backend events.

## Input Example

```js
const events = [
  { type: "login", userId: 1, duration: 120 },
  { type: "logout", userId: 1, duration: 20 },
  { type: "login", userId: 2, duration: 80 },
  { type: "purchase", userId: 2, duration: 300 },
  { type: "login", userId: 1, duration: 100 },
];
```

## Requirements

Create reusable functions that can:

- Filter events by type.
- Get unique user IDs.
- Calculate average duration.
- Group events by type.
- Create configurable metric functions.
- Accept multiple event lists.
- Merge event lists.
- Work with event properties in a clean and readable way.

Your code should be organized so that each function has one clear responsibility.

## Example Usage

```js
const loginEvents = filterEventsByType(events, "login");
const userIds = getUniqueUserIds(events);
const average = getAverageDuration(events);
const grouped = groupEventsByType(events);
```

---

# Assignment 4: Inventory and Order System

## Goal

Build a small backend-style inventory and order system.

## Requirements

Create the following classes:

## Product

Represents a general product.

Properties:

- id
- name
- price

Methods:

- getPrice()
- getDescription()

## PhysicalProduct

Represents a product that requires shipping.

Extra properties:

- weight
- shippingCost

## DigitalProduct

Represents a downloadable product.

Extra properties:

- fileSize
- downloadLink

## Cart

Stores products selected by the customer.

Methods:

- addProduct(product)
- removeProduct(productId)
- getTotal()
- listProducts()

## Order

Created from a cart.

Properties:

- orderId
- products
- total
- status

Methods:

- pay()
- cancel()
- getSummary()

## Additional Requirements

- Use modern JavaScript class syntax.
- Keep responsibilities separated between classes.
- Add validation where it makes sense.
- Use modules to export and import your classes.
- Demonstrate the system with both physical and digital products.

---

# Assignment 5: Module-Based Utility Package

## Goal

Split your code into multiple modules and expose a clean public API.

## Required File Structure

```txt
src/
  products.js
  cart.js
  order.js
  validators.js
  formatters.js
  index.js
```

## Requirements

- Place product-related code in `products.js`.
- Place cart-related code in `cart.js`.
- Place order-related code in `order.js`.
- Place validation helpers in `validators.js`.
- Place formatting helpers in `formatters.js`.
- Use `index.js` as the main entry point for exports.
- Demonstrate different import and export styles.
- Keep modules reusable and easy to test.
- Do not mix demo code with core module logic.

## Example

A user of your package should be able to import selected functionality from `src/index.js`.

---

# Assignment 6: Async Order Processor

## Goal

Simulate asynchronous backend order processing.

## Requirements

Create an async flow that simulates:

- Fetching an order from a fake database.
- Checking inventory.
- Processing payment.
- Sending confirmation.
- Returning a final summary.

Each step should behave asynchronously.

Your implementation should include:

- A clear order-processing flow.
- Error handling.
- A custom error type where useful.
- Retry behavior for operations that may temporarily fail.
- A final report that shows what happened during processing.

## Example Flow

```txt
Fetch order
Check inventory
Process payment
Send confirmation
Return summary
```

You may simulate success and failure cases using timers, random values, or configurable fake responses.

---

# Assignment 7: Generator-Based Pagination

## Goal

Build a pagination system using generator functions.

## Requirements

Create a generator function called:

```js
paginate(items, pageSize);
```

The generator should:

- Yield one page at a time.
- Stop after all items are consumed.
- Validate pagination input.
- Work with a large list of items.
- Demonstrate manual `.next()` usage.
- Demonstrate usage inside a `for...of` loop.

## Bonus

Create another generator that filters items before pagination.

## Example Usage

```js
const items = [1, 2, 3, 4, 5, 6, 7];
const pages = paginate(items, 3);

console.log(pages.next());
console.log(pages.next());

for (const page of paginate(items, 3)) {
  console.log(page);
}
```
