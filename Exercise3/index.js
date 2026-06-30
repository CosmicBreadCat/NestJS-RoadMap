function getDate() {
  let currentdate = new Date();
  return (
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds()
  );
}

class BankAccount {
  #history = [];
  constructor(owner, initialBalance) {
    if (typeof owner !== "string" || owner === "") {
      throw new Error("Owner must be a non empty string");
    }
    if (typeof initialBalance !== "number" || initialBalance < 0) {
      throw new Error("Initial balance must be a positive number");
    }

    this.owner = owner;
    this.balance = initialBalance;
  }

  deposit(amount) {
    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    this.balance += amount;

    this.#history.push({
      date: getDate(),
      action: `Deposit of ${amount} into account.`,
    });
  }

  withdraw(amount) {
    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Amount must be a positive number");
    }

    if (this.balance - amount > 0) {
      this.balance += amount;

      this.#history.push({
        date: getDate(),
        action: `Withdrawl of ${amount} from account.`,
      });
    } else {
      throw new Error("Overdraw error, amount requested greater than balance");
    }
  }

  getHistory() {
    return [...this.#history];
  }

  transfer(amount, target) {
    if (typeof amount !== "number" || amount < 0) {
      throw new Error("Amount must be a positive number");
    }
    if ((!target) instanceof BankAccount) {
      throw new Error("Target must be a bank account");
    }

    this.withdraw(amount);
    target.deposit(amount);
  }
}

const acc1 = new BankAccount("John Doe", 10000);
const acc2 = new BankAccount("Jane Doe", 10000);

acc1.deposit(5000);
acc1.withdraw(2000);
acc1.transfer(1500, acc2);

console.log(acc1.getHistory());
