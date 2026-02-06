'use strict';

// const bookings = [];

// const createBooking = function (
//   flightNum = 1,
//   numPassenger = 2,
//   price = 100 * numPassenger,
// ) {
//   const booking = {
//     flightNum,
//     numPassenger,
//     price,
//   };

//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('lh123', undefined, 1);

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr.' + passenger.name;

//   if (passenger.passport === 24739479284) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas);

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greetArrow = greeting => name => console.log(greeting + ' ' + name);

// const greeting = greet('hey there');

// greeting('jonas');
// greeting('steven');
// greet('hello')('jonas');

// // const greetArrowUse = greetArrow('hey');
// greetArrow('hey')('dude');

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, passengerName) {
//     console.log(
//       `${passengerName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}` });
//   },
// };

// lufthansa.book(239, 'Jonas Nana');
// console.log(...lufthansa.bookings);

// const eurowings = {
//   name: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// book.call(eurowings, 23 ,'Someone')
// console.log(eurowings)

// book.call(lufthansa, 239, 'marie poppins')
// console.log(lufthansa)

// const bookEW = book.bind(lufthansa)
// bookEW(23, 'steven williams')

// const bookEW23 = book.bind(lufthansa,23)

// bookEW23('dude')

// lufthansa.planes = 300

// lufthansa.buyPlane = function(){
//   this.planes++
//   console.log(this.planes);
// }

// document.querySelector('.buy').addEventListener('click', () => lufthansa.buyPlane());

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)
// 1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// const poll = {
//   choices: [
//     ['Javascript', 0],
//     ['Python', 0],
//     ['Rust', 0],
//     ['C++', 0],
//   ],
//   registerNewAnswer() {
//     let question = 'What is your favourite programming language?\n';

//     this.choices.forEach((choice, i) => {
//       question += i + ': ' + choice[0] + '\n';
//     });

//     let result = Number(prompt(question));
//     this.type = String(prompt('What type?')) || this.type;

//     while (!result || result > this.choices.length || result <= 0) {
//       result = Number(prompt(question));
//       this.type = String(prompt('What type?')) || this.type;
//     }
//     this.choices[result][1]++;
//     return this.displayResults();
//   },
//   type: 'array',
//   displayResults() {
//     const scores = this.choices.map(([language, score]) => score);

//     if (this.type == 'string') {
//       console.log(`Poll results are: ${scores.join(", ")}`);
//     } else if (this.type == 'array') {
//       console.log(...this.choices);
//     }
//   },
// };

// 2. Call this method whenever the user clicks the "Answer poll" button.
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".

// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

///////////////////////////////////////////
// IIFE

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
// h();
f();
console.dir(f)


///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

/*
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/