// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 4));

// exports
const { add, multiply, divide } = require("./test-module-2");
console.log(add(2, 4));
