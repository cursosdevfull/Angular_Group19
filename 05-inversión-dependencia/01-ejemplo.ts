class GMailProvider implements UserRepository {
  sent(sender: string, receiver: string, subject: string, body: string): void {
    this.sentMessage(sender, receiver, subject, body);
  }
  sentMessage(
    sender: string,
    receiver: string,
    subject: string,
    body: string
  ) {}
}

class Office365Provider implements UserRepository {
  sent(sender: string, receiver: string, subject: string, body: string): void {
    this.parameters(subject, body);
    this.sentNotification(sender, receiver);
  }
  parameters(subject: string, body: string) {}

  sentNotification(sender: string, receiver: string) {}
}

class YahooMailProvider implements UserRepository {
  sent(sender: string, receiver: string, subject: string, body: string): void {
    this.addSender(sender)
      .addReceiver(receiver)
      .addSubject(subject)
      .addBody(body)
      .sentMail();
  }

  addSender(sender: string) {
    return this;
  }

  addReceiver(receiver: string) {
    return this;
  }

  addSubject(subject: string) {
    return this;
  }

  addBody(body: string) {
    return this;
  }

  sentMail() {}
}

type UserRepository = {
  sent(sender: string, receiver: string, subject: string, body: string): void;
};

class User {
  repository: UserRepository;

  constructor() {
    this.repository = new YahooMailProvider();
  }

  register(firstname: string, lastname: string, email: string) {
    /*const mail = new GMailProvider()
        mail.sentMessage("replay@company.com", email, "Welcome", "Thanks for getting back")*/

    /*const mail = new Office365Provider()
        mail.parameters("Welcome", "Thanks for getting back")
        mail.sentNotification("replay@company.com", email)*/

    this.repository.sent(
      "replay@company.com",
      email,
      "Welcome",
      "Thanks for getting back"
    );
  }
}
