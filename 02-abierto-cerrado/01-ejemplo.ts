class NotificationMessage {
  sentMessage(
    sender: string,
    receiver: string,
    subject: string,
    body: string,
    isHtml: boolean
  ) {
    console.log("message send to email");
  }

  sentMessageWhatsapp(
    sender: string,
    receiver: string,
    subject: string,
    body: string,
    phone: number
  ) {
    console.log("message send to whatsapp");
  }
}

class NotificationMessageBot extends NotificationMessage {
  sentMessageWhatsappBot(
    sender: string,
    receiver: string,
    subject: string,
    phone: number
  ) {
    console.log("message send to whatsapp");
  }
}

class User {
  register(firstname: string, lastname: string, email: string) {
    const notification = new NotificationMessage();
    notification.sentMessage(
      "replay@mydomain.com",
      email,
      "Welcome",
      "Welcome to our community",
      true
    );
  }
}

class Customer {
  register(firstname: string, lastname: string, email: string, phone: number) {
    const notification = new NotificationMessage();
    notification.sentMessage(
      "replay@mydomain.com",
      email,
      "Welcome",
      "Welcome to our community",
      true
    );
    notification.sentMessageWhatsapp(
      "replay@mydomain.com",
      email,
      "Welcome",
      "Welcome to our community",
      phone
    );
  }
}

class Buyer {
  request(
    firstname: string,
    lastname: string,
    email: string,
    phone: number,
    product: string
  ) {
    const notification = new NotificationMessageBot();
    notification.sentMessage(
      "replay@mydomain.com",
      email,
      "Your purchase",
      "Process is finished",
      true
    );
    notification.sentMessageWhatsappBot(
      "replay@mydomain.com",
      email,
      "Welcome",
      phone
    );
  }
}
