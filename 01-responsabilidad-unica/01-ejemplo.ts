class UserModelData {
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

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    gender: string,
    age: number
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.age = age;

    this.userId = new Date().getTime();
    this.createdAt = new Date();
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
  connection: any;

  host = "localhost";
  port = 3306;
  user = "user123";
  pass = "12345";

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    gender: string,
    age: number
  ) {
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

  save() {
    this.connection.save(
      this.firstname,
      this.lastname,
      this.email,
      this.password,
      this.gender,
      this.age
    );
  }

  update() {
    this.connection.update(
      this.userId,
      this.firstname,
      this.lastname,
      this.email,
      this.password,
      this.gender,
      this.age
    );
  }

  delete() {
    this.connection.delete(this.userId);
  }

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
