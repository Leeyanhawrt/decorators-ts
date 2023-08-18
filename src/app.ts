// Usually decorators start with a captial letter, when using a decorator factory it allows us to pass in params to the function
function Logger(logString: string) {
  return function (constructor: Function) {
    // console.log(logString);
    // console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const element = document.getElementById(hookId);
        if (element) {
          element.innerHTML = template;
          element.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// Decorators run when class is defined not when objects are instaniated. Factories are called with optional params while first class decorators are not
// Decorators functions are ran bottom up, WithTemplate runs before Logger will run, while decorator factories run top to bottom (Logger, WithTemplate)
@Logger("LOGGING - PERSON")
@WithTemplate("<h1>Testing</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    // console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// --- PROPERTY DECORATORS

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator");
  console.log(target);
  console.log(propertyName);
}

// Setter & Getter decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Method decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// Parameter decorator
function Log4(target: any, name: string | Symbol, postion: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(postion);
}

class Product {
  @Log
  _title: string;

  constructor(public t: string, private _price: number) {
    this._title = t;
  }

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be greater than 0!");
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const test = new Product("test", 5);
// console.log(test.getPriceWithTax(5));
test.price = 2;
// console.log(test);

function AutoBind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);
