export class Product {
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

export class PhysicalProduct extends Product {
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

export class DigitalProduct extends Product {
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
