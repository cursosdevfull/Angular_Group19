class PaymentGateway {
  paymentUnique(product: string, amount: number) {
    console.log("payment completed");
  }
}

class PaymentCash extends PaymentGateway {
  paymentCash(product: string, amount: number, deadline: Date) {
    console.log("payment cash completed");
  }
}

class PaymentTransfer extends PaymentCash {
  paymentTransfer(product: string, amount: number, deadline: Date) {
    console.log("payment transfer completed");
  }
}

class EcommerceRetail {
  paymentProcess: PaymentTransfer;

  constructor() {
    this.paymentProcess = new PaymentTransfer();
  }

  processPurchase() {
    this.paymentProcess.paymentUnique("Clothes", 300);
  }
}

class EcommerceB2B {
  paymentProcess: PaymentTransfer;

  constructor() {
    this.paymentProcess = new PaymentTransfer();
  }

  processPurchase() {
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + 2);

    this.paymentProcess.paymentTransfer("Clothes", 300, deadline);
  }
}
