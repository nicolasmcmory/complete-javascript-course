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
const nico = {
  year: 1966,
  calcAge: function () {
    console.log(this); // nico object, because method is called on nico object, so "this" refers to nico
    console.log(2037 - this.year);
  },
};

nico.calcAge();

const nicoTwo = {
  year: 1988,
  calcAge: nico.calcAge, // method borrowing, this points to nicoTwo object now
};

nicoTwo.calcAge();


// "this" is undefined here because f is called as a regular function, not as a method of an object 
const f = nico.calcAge;
f(); // Uncaught TypeError: Cannot read properties of undefined (reading 'year')