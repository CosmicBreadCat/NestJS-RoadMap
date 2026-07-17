type Pending = { status: "Pending" };

type Confirmed = { status: "Confirmed" };

type Shipped = { status: "Shipped"; trackingNumber: string };

type Delivered = { status: "Delivered"; address: string };

type Cancelled = { status: "Cancelled"; reason: string };

type OrderState = { orderId: number } & (
  | Pending
  | Confirmed
  | Shipped
  | Delivered
  | Cancelled
);

type TransitionRequest =
  | { to: "Confirmed" }
  | { to: "Shipped"; trackingNumber: string }
  | { to: "Delivered"; address: string }
  | { to: "Cancelled"; reason: string };

const allowedTransitions: Record<
  OrderState["status"],
  TransitionRequest["to"][]
> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Shipped", "Cancelled"],
  Shipped: ["Delivered"],
  Delivered: [],
  Cancelled: [],
};

function transition(
  current: OrderState,
  request: TransitionRequest,
): OrderState {
  if (!allowedTransitions[current.status].includes(request.to)) {
    throw new Error(
      `Illegal transition from ${current.status} to ${request.to}`,
    );
  }

  switch (request.to) {
    case "Confirmed":
      return { orderId: current.orderId, status: "Confirmed" };
    case "Shipped":
      return {
        orderId: current.orderId,
        status: "Shipped",
        trackingNumber: request.trackingNumber,
      };
    case "Delivered":
      return {
        orderId: current.orderId,
        status: "Delivered",
        address: request.address,
      };
    case "Cancelled":
      return {
        orderId: current.orderId,
        status: "Cancelled",
        reason: request.reason,
      };
    default:
      const _exhaustiveCheck: never = request;
      return _exhaustiveCheck;
  }
}

function orderSummary(order: OrderState): string {
  switch (order.status) {
    case "Pending":
      return `Order ${order.orderId} is ${order.status}`;
    case "Confirmed":
      return `Order ${order.orderId} is ${order.status}`;
    case "Shipped":
      return `Order ${order.orderId} is ${order.status} with tracking number ${order.trackingNumber}`;
    case "Delivered":
      return `Order ${order.orderId} is ${order.status} to address ${order.address}`;
    case "Cancelled":
      return `Order ${order.orderId} is ${order.status} with reason ${order.reason}`;
    default:
      const _exhaustiveCheck: never = order;
      return _exhaustiveCheck;
  }
}
