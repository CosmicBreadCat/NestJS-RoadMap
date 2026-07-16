"use strict";
function* serialGenerator(start = 0) {
    let count = start;
    while (true) {
        yield count++;
    }
}
class BaseGateway {
    history = [];
    serial = serialGenerator(1);
    processPayment(amount) {
        if (amount <= 0)
            throw new Error("Amount must be positive");
        this.chargeProvider(amount);
        return this.record(amount, "payment");
    }
    refund(transactionId) {
        const original = this.history.find((t) => t.id === transactionId);
        if (!original) {
            throw new Error(`Transaction ${transactionId} not found`);
        }
        if (original.type !== "payment") {
            throw new Error(`Transaction ${transactionId} is not a payment`);
        }
        const alreadyRefunded = this.history.some((t) => t.type === "refund" && t.refundedTransactionId === transactionId);
        if (alreadyRefunded) {
            throw new Error(`Transaction ${transactionId} was already refunded`);
        }
        this.refundProvider(original.amount);
        const tx = this.record(original.amount, "refund");
        return tx;
    }
    getTransactionHistory() {
        return this.history;
    }
    record(amount, type, refundedTransactionId) {
        const tx = {
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
    providerName = "Stripe";
    chargeProvider(amount) {
        // Stripe-specific API call would go here
    }
    refundProvider(transactionID) {
        // Stripe-specific refund call
    }
}
class PayPalGateway extends BaseGateway {
    providerName = "PayPal";
    chargeProvider(amount) {
        // PayPal-specific API call would go here
    }
    refundProvider(transactionID) {
        // PayPal-specific refund call
    }
}
class PaymentProcessor {
    gateway;
    constructor(gateway) {
        this.gateway = gateway;
    }
    charge(amount) {
        return this.gateway.processPayment(amount);
    }
    issueRefund(transactionID) {
        return this.gateway.refund(transactionID);
    }
    history() {
        return this.gateway.getTransactionHistory();
    }
}
