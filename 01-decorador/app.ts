function Logger(target: Function) {
  console.log("Logging...");
  console.log(target);
}

@Logger
class Person {
  name = "Jhon";

  constructor() {
    console.log("Creating a person object called", this.name);
  }
}

const person = new Person();
