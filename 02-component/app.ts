function Component(options: { selector: string; template: string }) {
  return (target: new (...args: any[]) => any) => {
    console.log("Componente creado con", options);
    const instance = new target();

    const ref = document.querySelector(options.selector);

    if (ref) {
      ref.innerHTML = options.template;

      ref.querySelector("h1")!.textContent += ", " + instance.name;
    }
  };
}

@Component({
  selector: "#root",
  template: "<h1>Hola mundo</h1>",
})
class Person {
  name = "John Colt";

  constructor() {
    console.log("Hola, soy", this.name);
  }
}
