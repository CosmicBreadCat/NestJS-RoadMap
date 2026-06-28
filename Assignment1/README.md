### Simple function which takes in an object and prints out a recipt string

takes in an input object like so:

```JS
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

and outputs a string like so:

```
Receipt:
Customer: Ahmad Ali
Subtotal: 59.97
Discount: 5.00
Tax: 10.44
Shipping: 5.00
Total: 70.41
Status: paid
```

---

#### Notes:

- Added default values for all fields so the function runs even if some fields are missing.
- Casting of all fields from string to numbers (because JS is an untyped mess :P).
