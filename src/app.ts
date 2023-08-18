// Usually decorators start with a captial letter, when using a decorator factory it allows us to pass in params to the function
function Logger(logString: string) {
  return function (constructor: Function) {
    // console.log(logString);
    // console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const element = document.getElementById(hookId);
    const p = new constructor();
    if (element) {
      element.innerHTML = template;
      element.querySelector("h1")!.textContent = p.name;
    }
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

// console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator");
  console.log(target);
  console.log(propertyName);
}

class Product {
  @Log
  _title: string;

  constructor(public t: string, private _price: number) {
    this._title = t;
  }

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be greater than 0!");
    }
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

const test = new Product("test", 5);
// console.log(test.getPriceWithTax(5));
test.price = 2;
// console.log(test);
