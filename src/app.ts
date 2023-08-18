// Usually decorators start with a captial letter, when using a decorator factory it allows us to pass in params to the function
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// Decorators run when class is defined not when objects are instaniated. Factories are called with optional params while first class decorators are not
@Logger("LOGGING - PERSON")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
