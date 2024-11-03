class Database {
  host = "localhost";
  port = 3306;
  user = "user123";
  pass = "12345";
  connection: any;

  constructor() {
    this.connection = this.getConnection(
      this.host,
      this.port,
      this.user,
      this.pass
    );
  }

  async getConnection(
    host: string,
    port: number,
    user: string,
    password: string
  ) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 1500);
    });

    await promise;

    return {
      async save(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        gender: string,
        age: number
      ) {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(true), 1500);
        });
        await promise;
        console.log("user saved");
      },
      async update(
        userId: number,
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        gender: string,
        age: number
      ) {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(true), 1500);
        });
        await promise;
        console.log("user updated");
      },
      async delete(userId: number) {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(true), 1500);
        });
        await promise;
        console.log("user deleted");
      },
    };
  }
}

class Email {
  sentEmailRegistered(firstname: string, lastname: string, email: string) {
    console.log("email registered send");
  }

  sentEmailUpdated(firstname: string, lastname: string, email: string) {
    console.log("email updated send");
  }

  sentEmailDeleted(firstname: string, lastname: string, email: string) {
    console.log("email deleted send");
  }
}

class UserModelDomain {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
  database: Database;
  mail: Email;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    gender: string,
    age: number
  ) {
    this.database = new Database();
    this.mail = new Email();

    if (age < 18) throw "Age must be greater than 17";

    const regex = /^[a-zA-Z0-9._%+-]+@(company\.com|pe\.company\.com)$/;
    if (!email.match(regex)) throw "Email has not right structure";

    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.age = age;

    this.userId = new Date().getTime();
    this.createdAt = new Date();
  }

  save() {
    this.database.connection.save(
      this.firstname,
      this.lastname,
      this.email,
      this.password,
      this.gender,
      this.age
    );
    this.mail.sentEmailRegistered(this.firstname, this.lastname, this.email);
  }

  update() {
    this.database.connection.update(
      this.userId,
      this.firstname,
      this.lastname,
      this.email,
      this.password,
      this.gender,
      this.age
    );
    this.mail.sentEmailUpdated(this.firstname, this.lastname, this.email);
  }

  delete() {
    this.database.connection.delete(this.userId);
    this.mail.sentEmailDeleted(this.firstname, this.lastname, this.email);
  }
}
