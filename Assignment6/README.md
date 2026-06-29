### Async Order Processor Simulation

No actual logic is executed, all this simulates is the delay between the async parts of the process

Example call:

```js
async function main() {
  const order = { orderID: 1 };
  const result = await processOrder(order);
  console.log(JSON.stringify(result, null, 2));
}

main();
```

Example output:

```json
{
  "orderID": 1,
  "steps": [
    "Fetch success",
    "Inventory Check failed - retrying (1/3)",
    "Inventory Check success",
    "Payment Process success",
    "Confirmation failed - retrying (1/3)",
    "Confirmation failed - retrying (2/3)",
    "Confirmation success"
  ],
  "success": true
}
```

---

#### Notes:

- I decided to not add any logic to the flow since its not central to the point of this assignment.
- Created custom wait and retry functions which simulate responce times and failed + repeated requests.
