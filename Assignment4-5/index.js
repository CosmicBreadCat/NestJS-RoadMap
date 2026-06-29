class Product {
  constructor(id, name, price) {
    if (typeof id !== "number" || isNaN(id)) {
      throw new Error("ID must be a valid number");
    }
    if (typeof name !== "string" || name === "") {
      throw new Error("Name must be a non empty string");
    }
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
      throw new Error("Price must be a valid number");
    }

    this.id = id;
    this.name = name;
    this.price = price;
  }

  getPrice() {
    return this.price;
  }
  getDescription() {
    return { id: this.id, name: this.name, price: this.price };
  }
}

class PhysicalProduct extends Product {
  constructor(id, name, price, weight, shippingCost) {
    super(id, name, price);
    if (typeof weight !== "number" || isNaN(weight) || weight <= 0) {
      throw new Error("Weight must be a valid positive number");
    }
    if (
      typeof shippingCost !== "number" ||
      isNaN(shippingCost) ||
      shippingCost < 0
    ) {
      throw new Error("Shipping Cost must be a valid number");
    }

    this.weight = weight;
    this.shippingCost = shippingCost;
  }
}

class DigitalProduct extends Product {
  constructor(id, name, price, fileSize, downloadLink) {
    super(id, name, price);
    if (typeof fileSize !== "number" || isNaN(fileSize) || fileSize <= 0) {
      throw new Error("File Size must be a valid positive number");
    }
    if (typeof downloadLink !== "string" || downloadLink === "") {
      throw new Error("URL must be a non empty string");
    }

    this.fileSize = fileSize;
    this.downloadLink = downloadLink;
  }
}

class Cart {
  constructor() {
    this.contents = [];
  }

  addProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Argument must be a Product instance");
    }

    this.contents.push(product);
  }

  removeProduct(product) {
    if (!(product instanceof Product)) {
      throw new Error("Argument must be a Product instance");
    }

    const index = this.contents.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.contents.splice(index, 1);
    }
  }

  getTotal() {
    return this.contents.reduce((sum, p) => sum + p.price, 0);
  }

  listProducts() {
    return this.contents;
  }
}

class Order {
  constructor(orderId, cart) {
    if (typeof orderId !== "number" || isNaN(orderId)) {
      throw new Error("Order ID must be a valid number");
    }
    if (!(cart instanceof Cart)) {
      throw new Error("Argument must be a Cart instance");
    }
    if (cart.contents.length === 0) {
      throw new Error("Cart must have at least one item");
    }

    this.orderId = orderId;
    this.products = [...cart.contents];
    this.total = cart.getTotal();
    this.status = "pending";
  }

  pay() {
    if (this.status !== "pending") {
      throw new Error("Order cannot be paid in its current status");
    }
    this.status = "paid";
  }

  cancel() {
    if (this.status === "cancelled") {
      throw new Error("Order is already cancelled");
    }
    this.status = "cancelled";
  }

  getSummary() {
    return {
      orderId: this.orderId,
      products: this.products,
      total: this.total,
      status: this.status,
    };
  }
}
