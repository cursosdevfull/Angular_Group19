export class Validations {
  private static emailRegEx: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  private static passwordRegEx: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  static validateEmail(email: string, pattern?: RegExp): boolean {
    return pattern ? pattern.test(email) : this.emailRegEx.test(email);
  }

  static validatePassword(password: string, pattern?: RegExp): boolean {
    return pattern ? pattern.test(password) : this.passwordRegEx.test(password);
  }
}
