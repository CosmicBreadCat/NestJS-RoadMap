function round(num, places = 2) {
  return Math.round(num * 10 ** places) / 10 ** places;
}

function cartPriceCalculator(items) {
  const summary = { subtotal: 0, discount: 0.0, tax: 0, finalTotal: 0 };
  summary.subtotal = round(
    items.reduce((acc, item) => (acc += item.price * item.quantity), 0),
  );
  if (summary.subtotal > 100) {
    summary.discount = round(summary.subtotal * 0.1);
  }
  summary.tax = round((summary.subtotal - summary.discount) * 0.14);
  summary.finalTotal = round(summary.subtotal - summary.discount + summary.tax);

  return summary;
}

let items = [
  { name: "item1", price: 19, quantity: 5 },
  { name: "item2", price: 28, quantity: 4 },
  { name: "item3", price: 37, quantity: 3 },
  { name: "item4", price: 46, quantity: 2 },
  { name: "item5", price: 55, quantity: 1 },
];

console.log(cartPriceCalculator(items));
