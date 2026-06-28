// test data
const order = {
  customerName: "Ahmad Ali",
  quantity: "3",
  unitPrice: "19.99",
  discount: "5",
  taxRate: "0.19",
  shipping: "5",
  status: "paid",
};

function generateReceipt(order) {
  let subtotal = (+order.unitPrice ?? 20) * (+order.quantity ?? 1);
  let discount = +order.discount ?? 0;
  let tax = (subtotal - discount) * (+order.taxRate ?? 0.2);
  let shipping = +order.shipping ?? 5;
  const output = `
  Receipt:
    Customer: ${order.customerName ?? "John Doe"}
    Subtotal: ${subtotal.toFixed(2)}
    Discount: ${discount.toFixed(2)}
    Tax: ${tax.toFixed(2)}
    Shipping: ${shipping.toFixed(2)}
    Total: ${(subtotal + tax + shipping - discount).toFixed(2)}
    Status: ${order.status ?? "Not Paid"}`;
  return output;
}

console.log(generateReceipt(order));
