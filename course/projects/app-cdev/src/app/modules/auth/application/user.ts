export class User {
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;
  private roleId: string;

  constructor(
    name: string,
    lastname: string,
    email: string,
    password: string,
    roleId: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.roleId = roleId;
  }

  properties() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roleId: this.roleId,
    };
  }
}
