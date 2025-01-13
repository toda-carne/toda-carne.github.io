
const bigDay = new Date(2019, 6, 19);
console.log(bigDay.toLocaleDateString());
if (bigDay.getTime() < Date.now()) {
  console.log("Once upon a time...");
}


class MyClass {
  // Constructor
  constructor() {
    // Constructor body
  }
  // Instance field
  myField = "foo";
  // Instance method
  myMethod() {
	console.log("myMethod body");
  }
  // Static field
  static myStaticField = "bar";
  // Static method
  static myStaticMethod() {
	console.log("myStaticMethod body");
  }
  // Static block
  static {
    // Static initialization code
  }
  // Fields, methods, static fields, and static methods all have
  // "private" forms
  #myPrivateField = "bar";
}

const myInstance = new MyClass();
//const myInstance = new MyClass();
console.log(myInstance.myField); // 'foo'
myInstance.myMethod();


function MyClass2() {
  this.myField2 = "foo2";
  // Constructor body
}

MyClass2.myStaticField2 = "bar2";

MyClass2.myStaticMethod2 = function () {
	console.log("myStaticMethod2 body");
};

MyClass2.prototype.myMethod2 = function () {
	console.log("myMethod2 body");
};

(function () {
  // Static initialization code
})();

const myInstance2 = new MyClass2();
console.log(myInstance2.myField2); // 'foo'
myInstance2.myMethod2();


class Color {
  constructor(r, g, b) {
    this.values = [r, g, b];
  }
  get red() {
    return this.values[0];
  }
  set red(value) {
    this.values[0] = value;
  }
}

const red = new Color(255, 0, 0);
red.red = 32;
console.log(red.red); // 0

class ColorWithAlpha extends Color {
  #alpha;
  constructor(r, g, b, a) {
    super(r, g, b);
    this.#alpha = a;
  }
  get alpha() {
    return this.#alpha;
  }
  set alpha(value) {
    if (value < 0 || value > 1) {
      throw new RangeError("Alpha value must be between 0 and 1");
    }
    this.#alpha = value;
  }
}

const color = new ColorWithAlpha(255, 0, 0, 0.5);
console.log(color.red); // 255


