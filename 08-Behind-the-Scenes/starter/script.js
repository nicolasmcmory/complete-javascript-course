'use strict';
/* console.log(me);
// console.log(job);
// console.log(year);

// In TDZ (temporal dead zone)
var me = 'nico';
let job = 'entrepreneur';
const year = 1988;

// Functions
console.log(addDecl(2, 3));
try {
  console.log(addExpr(2, 3));
} catch (e) {
  console.log(e);
}
try {
  console.log(addArrow(2, 3)); // returned as undefined besause of var which is hoisted but not initialized, if const or let it would be in TDZ
} catch (e) {
  console.log(e);
}

function addDecl(a, b) {
  return a + b;
}

// In TDZ (temporal dead zone) for functions assigned to variables
const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b; // using var pre ES6 will return undefined here as const and let are scoped in TDZ, functions and blocks, var are only scoped in functions

// Example
console.log(numProducts); // undefined
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1; // Creates property on global object (window in browsers)
let y = 2;
const z = 3;

console.log(x === window.x); // true, because var creates a property on the global object
console.log(y === window.y); // false
console.log(z === window.z); // false */

/* Best Practices: 
    -Don't use var, use let or const
    -Declare variables at the top of their scope
    -Type "window" in chrome console to see global variables */

// this keyword and variable
// this takes the value of the global object in non-strict mode or undefined in strict mode
// console.log(this); // window object in browsers

// const calcAge = function (birthYear) {
//   console.log(this); // undefined in strict mode, because regular functions have their own this keyword and in strict mode it is undefined
//   console.log(2037 - birthYear);
// };

// calcAge(1991);

// const calcAgeArrow = birthYear => {
//     console.log(this); // lexically binds this, here it will be window object because arrow functions do not have their own this keyword
//   console.log(2037 - birthYear);
// };

// calcAgeArrow(1988);

// "this" points to the object that is calling the method
// const nico = {
//   year: 1966,
//   calcAge: function () {
//     console.log(this); // nico object, because method is called on nico object, so "this" refers to nico
//     console.log(2037 - this.year);
//   },
// };

// nico.calcAge();

// const nicoTwo = {
//   year: 1988,
//   calcAge: nico.calcAge, // method borrowing, this points to nicoTwo object now
// };

// nicoTwo.calcAge();

// "this" is undefined here because f is called as a regular function, not as a method of an object
// const f = nico.calcAge;
// f(); // Uncaught TypeError: Cannot read properties of undefined (reading 'year')

// var firstName = 'Global Nico';

// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//     // const self = this; // workaround to preserve this keyword, as self refers to this of calcAge method
//     // const isMillennial = function () {
//     //   console.log(self.year >= 1981 && self.year <= 1996); // undefined, because regular function, this is undefined in strict mode, function within a function has its own this
//     // };

//     // isMillennial(); // Uncaught TypeError: Cannot read properties of undefined (reading 'year') because isMillennial is a regular function call, so this is undefined in strict mode

//     //Using arrow function to preserve this keyword from parent scope
//     const isMillennialArrow = () => {
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };

//     isMillennialArrow();
//   },
//   greet: () => console.log(`Hey ${this.firstName}`), // Uses 'this' from global scope, ie windows object
// }; // Object literal, not code block

// jonas.greet(); // Hey undefined, because this.firstName refers to window.firstName which is undefined, but if we define var firstName = 'Global Nico' it will print 'Hey Global Nico'
// jonas.calcAge();

// Best practice is to not use arrow functions as methods, should only be used for non-method functions

// const nico = {
//   firstName: 'Nico',
//   year: 1988,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
//   greet: function () {
//     console.log(`Hey ${this.firstName}`);
//   }, // Uses 'this' from global scope, ie windows object
// }; // Object literal, not code block

// const addExpr = function (a, b) {
//   console.log(arguments); // arguments object is available in regular functions
//   return a + b;
// };

// addExpr(2, 5);
// addExpr(2, 5, 8, 12); // can pass more arguments than defined parameters

// const addArrow = (a, b) => {
//   console.log(arguments); // Uncaught ReferenceError: arguments is not defined, because arrow functions do not have their own arguments object
//   return a + b;
// };

// // addArrow(2, 5, 8); // will throw error

// function add(...args) {
//   // rest parameters
//   return args.reduce((acc, cur) => acc + cur, 0);
// }

// console.log(add(2, 5));
// console.log(add(2, 5, 8, 12, 3));

// Memory management
// const jessica = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
//   family: ['Alice', 'Bob'],
// };

// Reference copy as fn example
// function marryPerson(originalPerson, newLastName){ 
//   originalPerson.lastName = newLastName;
//   return originalPerson;
//  }
 
//  const marriedJessica = marryPerson(jessica, 'Davis');

// const marriedJessica = jessica; // copied by reference
// marriedJessica.lastName = 'Davis';

// console.log('Before marriage:', jessica);
// console.log('After marriage:', jessica); // both will show lastName as 'Davis' because both variables point to the same object in memory (heap), changing the property values even if const is possible becasue we are not changing the reference pointed to by the const variable

// Create a shallow copy of jessica 
// const jessicaCopy = { ...jessica }; // shallow copy using spread operator
// jessicaCopy.lastName = 'Davis';
// jessicaCopy.family.push('Mary');
// jessicaCopy.family.push('John');

// jessicaCopy.family = ['Mary', 'John']; // this would not affect original object as we are changing the reference of family property to a new array

// jessicaCopy is a new object in memory, changing its properties does not affect the original jessica object

// console.log(jessica);
// console.log(jessicaCopy);

// Deep clone is needed for nested objects/arrays to completely separate the two objects in memory
// For deep clone, can use libraries like lodash or structuredClone in modern JS
// const jessicaDeepClone = structuredClone(jessica);
// jessicaDeepClone.family.push('Steve');

// console.log('After deep cloning:');
// console.log(jessica);
// console.log(jessicaDeepClone);

