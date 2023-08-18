// Usually decorators start with a captial letter, when using a decorator factory it allows us to pass in params to the function
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
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
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
