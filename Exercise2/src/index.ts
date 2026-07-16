interface PaymentGateway {
  processPayment(amount: number): Transaction;
  refund(amount: number): Transaction;
  getTransactionHistory(): Array<Transaction>;
}

type Transaction = {
  id: number;
  amount: number;
  time: Date;
  type: "payment" | "refund";
  gateway: string;
  refundedTransactionId?: number;
};

function* serialGenerator(
  start: number = 0,
): Generator<number, never, unknown> {
  let count = start;
  while (true) {
    yield count++;
  }
}

abstract class BaseGateway implements PaymentGateway {
  protected history: Transaction[] = [];
  private serial = serialGenerator(1);

  processPayment(amount: number): Transaction {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.chargeProvider(amount);
    return this.record(amount, "payment");
  }

  refund(transactionId: number): Transaction {
    const original = this.history.find((t) => t.id === transactionId);

    if (!original) {
      throw new Error(`Transaction ${transactionId} not found`);
    }
    if (original.type !== "payment") {
      throw new Error(`Transaction ${transactionId} is not a payment`);
    }
    const alreadyRefunded = this.history.some(
      (t) => t.type === "refund" && t.refundedTransactionId === transactionId,
    );
    if (alreadyRefunded) {
      throw new Error(`Transaction ${transactionId} was already refunded`);
    }

    this.refundProvider(original.amount);

    const tx = this.record(original.amount, "refund");
    return tx;
  }

  getTransactionHistory(): Transaction[] {
    return this.history;
  }

  protected abstract chargeProvider(amount: number): void;
  protected abstract refundProvider(transactionID: number): void;
  protected abstract get providerName(): string;

  private record(
    amount: number,
    type: Transaction["type"],
    refundedTransactionId?: number,
  ): Transaction {
    const tx: Transaction = {
      id: this.serial.next().value,
      amount,
      time: new Date(),
      type,
      gateway: this.providerName,
    };

    if (refundedTransactionId !== undefined) {
      tx.refundedTransactionId = refundedTransactionId;
    }

    this.history.push(tx);
    return tx;
  }
}

class StripeGateway extends BaseGateway {
  protected providerName = "Stripe";
  protected chargeProvider(amount: number): void {
    // Stripe-specific charge call
  }
  protected refundProvider(amount: number): void {
    // Stripe-specific refund call
  }
}

class PayPalGateway extends BaseGateway {
  protected providerName = "PayPal";
  protected chargeProvider(amount: number): void {
    // PayPal-specific charge call
  }
  protected refundProvider(amount: number): void {
    // PayPal-specific refund call
  }
}

class PaymentProcessor {
  constructor(private gateway: PaymentGateway) {}

  charge(amount: number): Transaction {
    return this.gateway.processPayment(amount);
  }

  issueRefund(transactionID: number): Transaction {
    return this.gateway.refund(transactionID);
  }

  history(): Transaction[] {
    return this.gateway.getTransactionHistory();
  }
}
