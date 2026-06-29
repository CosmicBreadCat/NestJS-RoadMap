function fakeAPICall(msg, ms, successChance) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > successChance;
      if (success) {
        resolve(`${msg} success`);
      } else {
        reject(new Error(`${msg} failed`));
      }
    }, ms);
  });
}

async function retry(fn, attempts, report) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) {
        throw error;
      }
      report.steps.push(`${error.message} - retrying (${i + 1}/${attempts})`);
    }
  }
}

function fakeFetch() {
  return fakeAPICall("Fetch", 1000, 0.5);
}

function fakeInventoryCheck() {
  return fakeAPICall("Inventory Check", 1000, 0.5);
}

function fakePaymentProcess() {
  return fakeAPICall("Payment Process", 1000, 0.5);
}

function fakeConfirmation() {
  return fakeAPICall("Confirmation", 1000, 0.5);
}

async function processOrder(order) {
  const report = { orderID: order.orderID, steps: [], success: false };

  try {
    const fetch = await retry(fakeFetch, 3, report);
    report.steps.push(fetch);

    const inventory = await retry(fakeInventoryCheck, 3, report);
    report.steps.push(inventory);

    const payment = await retry(fakePaymentProcess, 3, report);
    report.steps.push(payment);

    const confirmation = await retry(fakeConfirmation, 3, report);
    report.steps.push(confirmation);

    report.success = true;
  } catch (error) {
    report.steps.push(error.message);
  }

  return report;
}

async function main() {
  const order = { orderID: 1 };
  const result = await processOrder(order);
  console.log(JSON.stringify(result, null, 2));
}

main();
