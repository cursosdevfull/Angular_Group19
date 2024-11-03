class NotificationV1 {
  sentEmail(
    sender: string,
    receiver: string,
    subject: string,
    body: string,
    isHtml: boolean
  ) {
    console.log("message send by email");
  }
}

class NotificationV2 extends NotificationV1 {
  sentSMS(subject: string, body: string, phone: number) {
    console.log("message send by sms");
  }
}

class NotificationV3 extends NotificationV2 {
  sentWhatsapp(subject: string, body: string, phone: number) {
    console.log("message send by whatsapp");
  }
}

const notification = new NotificationV3();
notification.sentEmail(
  "replay@company.com",
  "user@email.com",
  "Bienvenido",
  "Hola, bienvenido",
  true
);
