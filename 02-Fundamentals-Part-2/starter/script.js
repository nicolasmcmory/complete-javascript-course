"use strict";

// let hasDriversLicense = false;
// const pastTest = true;

// if (pastTest) hasDriversLicense = true;

// if (hasDriversLicense) console.log("I can drive");

// // const interface = "Audio";

//Function declaration
// function calcAg1(birthYear) {
//   return 2037 - birthYear;
// }

// const age1 = calcAg1(1911);

// console.log(age1);

//Function expression
// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// };

// const age2 = calcAge2(1935);

// console.log(age2);

//Arrow function
// const calcAge3 = (birthYear) => 2037 - birthYear;

// const age3 = calcAge3(1991);

// console.log(age3);

// const yearsUntilRet = (birthYear) => {
//   const retirementAge = 70;
//   const age = 2037 - birthYear;
//   return retirementAge - age;
// };

// console.log(yearsUntilRet(1991));

// const yearsUntilRetName = (birthYear, name) => {
//   const retirementAge = 70;
//   const age = 2037 - birthYear;
//   const retirement = retirementAge - age;
//   return `${name} will retire in ${retirement} years.`;
// };

// console.log(yearsUntilRetName(1991, "James"));
// console.log(yearsUntilRetName(1988, "Nico"));

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//   const applePieces = cutFruitPieces(apples);
//   const orangePieces = cutFruitPieces(oranges);
//   const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces.`;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));

// const calcAge = function (birthYear) {
//   return 2037 - birthYear;
// };

// //Calculate average of each team
// const calcAverage = (scores) => {
//   let sum = 0;
//   for (let score of scores) {
//     sum += score;
//   }

//   const avg = sum / scores.length;

//   return avg;
// };

// const checkWinner = function (t1Name, avgScore1, t2Name, avgScore2) {
//   let results = {
//     winnerName: "",
//     winnerScore: 0,
//     looserName: "",
//     looserScore: 0,
//   };
//   if (avgScore1 >= avgScore2 * 2) {
//     results.winnerName = t1Name;
//     results.looserName = t2Name;
//     results.winnerScore = avgScore1;
//     results.looserScore = avgScore2;
//   } else if (avgScore2 >= avgScore1 * 2) {
//     results.winnerName = t2Name;
//     results.looserName = t1Name;
//     results.winnerScore = avgScore2;
//     results.looserScore = avgScore1;
//   }
//   return results;
// };

// //Print winning team
// function printWinner(t1Name, scoresT1, t2Name, scoresT2) {
//   const results = checkWinner(t1Name,
//     calcAverage(scoresT1),t2Name,
//     calcAverage(scoresT2)
//   );

//   let statement = `${results.winnerName}s win (${results.winnerScore} vs ${results.looserScore})`;

//   if (results.winnerScore == 0) {
//     statement = "No team wins..";
//   }

//   return statement;
// }

// const scoreDolphins = [300, 23, 71]
// const scoreKoalas = [65, 54, 49]

// console.log(printWinner("Dolphins", scoreDolphins , "Koalas", scoreKoalas));

//Tip calculator based on bill value
// const tipCalculator = function (bill) {
//   return bill >= 50 || bill <= 300 ? bill * 0.15 : bill * 0.2;
// };

// //Print values to console
// function print(result) {
//   console.log(
//     `The bill was ${result.bill}, the tip was ${result.tip}, and the total value ${result.total}.`
//   );
// }

// const calculator = (bills) => {
//   let results = new Array();
//   for (let bill of bills) {
//     let tip = tipCalculator(bill);
//     let result = {
//       bill: bill,
//       tip: tip,
//       total: bill + tip,
//     };

//     print(result);
//   }

//   return results;
// };

// const bills = new Array(275, 300, 450);
// const tips = calculator(bills);

// const person = {
//   name: "dude",
//   year: 1992,
//   profession: "Teacher",
//   driverLicence: true,
//   age: null,
//   calcAge: function () {
//     this.age = 2037 - this.year;
//     return this.age;
//   },
//   getSummary: function () {
//     let driverYesNo = this.driverLicence ? "has" : "doesn't have";
//     this.summary = `${this.name} is a ${this.calcAge()} old ${
//       this.profession
//     }, and they ${driverYesNo} a driver's license.`;
//   },
// };

// // person.calcAge()
// person.getSummary();
// person.age;

// console.log(person.summary);
// console.log(person.age);

class Person {
  constructor(firstName, lastName, birthYear, weight, height) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.weight = weight;
    this.height = height;
  }

  calcBMI() {
    const BMI = this.weight / this.height ** 2;
    return BMI;
  }

  print() {
    console.log(
      `${this.firstName} was born in ${this.birthYear}, weighs ${
        this.weight
      } kgs, measures ${this.height} m and has as BMI of ${this.calcBMI()}`
    );
  }
}

const john = new Person("John", "Elliot", 1985, 90, 1.8);

debugger;
john.print();
