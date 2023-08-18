// Usually decorators start with a captial letter
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

// Decorators run when class is defined not when objects are instaniated
@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
