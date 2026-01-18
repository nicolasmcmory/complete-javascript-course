'use strict';

const weekdays = ['mon', 'tu', 'we', 'thur', 'fri', 'sat', 'sun'];

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

const openingHours = {
  [weekdays[0]]: {
    open: 12,
    close: 22,
  },
  [weekdays[1]]: {
    open: 11,
    close: 23,
  },
  [weekdays[2]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,
  order(indexStart, indexMain) {
    return [this.starterMenu[indexStart], this.mainMenu[indexMain]];
  },
  orderDelivery({
    indexStart = 1,
    indexMain = 0,
    time = '22:00',
    address = 'none',
  }) {
    console.log(
      this.starterMenu[indexStart],
      this.mainMenu[indexMain],
      time,
      address,
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Ingredients: ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza(mainIngredient, ...otherIng) {
    console.log(`${mainIngredient}`);
    console.log(`${otherIng}`);
  },
};

// const properties = Object.keys(openingHours);
// console.log(properties);

// for (const day of Object.keys(openingHours)) {
//   console.log(day);
// }

// const restaurant1 = {
//   name: 'Capri',
//   // numGuests: 20,
//   numGuests: 0,
// };

// const restaurant2 = {
//   name: 'Kola',
//   owner: 'Giovani Rossi',
// };

// Optional chaining
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// Nullish coalescing and optional chaining together, used to check if objects, methods and arrays exist
// for (const day of weekdays) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day} we are ${open}`);
// }

// // Optional chaining on methods and nullish coalescing operator
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'method does not exist');

// // On arrays
// const users = [{ name: 'jonas', email: 'email@email.com' }];
// console.log(users[0]?.name ?? 'user does not exist');

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const [i, el] of menu.entries()) {
//   console.log(`${i} : ${el}`);
// }

// // OR assignment operator, assigns concrete value to falsy values
// restaurant1.numGuests = restaurant1.numGuests || 10;
// restaurant2.numGuests = restaurant2.numGuests || 10;
// restaurant1.numGuests ||= 10
// restaurant2.numGuests ||= 10

// Nullish assignment operator
// restaurant1.numGuests ??= 10;
// restaurant2.numGuests ??= 10;

// console.log(restaurant1.numGuests);
// console.log(restaurant2.numGuests);

// AND assignment operator
// restaurant1.owner = restaurant1.owner && 'Anonymous'
// restaurant2.owner = restaurant2.owner && 'Anonymous'

// restaurant1.owner &&= 'Anonymous';
// restaurant2.owner &&= 'Anonymous';

// console.log(restaurant1);
// console.log(restaurant2);

// // Nullish coalescing operator, only null or undefined
// restaurant.numGuests = 0;
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// // Short circuiting, truthy and falsy comparisons
// console.log('------------OR----------');
// console.log(3 || 'nico');
// console.log('' || 'nico');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || 'hello' || 23 || null);
// restaurant.numGuests = 0;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('----------AND--------');
// console.log(0 && 'jonas');
// console.log(7 && 'jonas');

// console.log('hello' && 23 && null && 'jonas');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'sipnach');
// }

// restaurant.orderNoodles && restaurant.orderPizza('mushrooms','eggplants')

// restaurant.orderPizza('dough', 'peppers', 'mushrooms');

// // SPREAD because on right
// const arr = [1, 2, ...[3, 4]];

// REST because on left
// const [a, b, ...others] = [1, 2, 3, 4, 5];

// console.log(a, b, others);

// Destructuring using REST operator
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(pizza, risotto,otherFood);

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// Functions
// const add = function (...args) {
//   let sum = 0;

//   for (const number of args) {
//     sum += Number(number);
//   }

//   return sum;
// };

// const arr = [1, 2, 3, 4, 5];

// // Passing individual arguments
// console.log(add(1, 2, 3, 4, 5));

// // Using spread operator to list out elements in array
// console.log(add(...arr));

// const ingredients = [
//   prompt('Ingredient 1:'),
//   prompt('Ingredient 2:'),
//   prompt('Ingredient 3:'),
// ];

// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

// // Objects
// const newRestaurant = {foundedYear: 1980, ...restaurant, founder: 'mario'};
// console.log(newRestaurant);

// const restaurantCopy = {...restaurant};
// restaurantCopy.name = "ristorante roma";

// console.log(restaurant.name);
// console.log(restaurantCopy.name);

// restaurant.orderDelivery({
//   // time: '22:30',
//   // address: 'address',
//   // indexMain: 2,
//   indexStart: 2,
// });

// Spread operator
// const arr = [7, 8, 9];
// const arr2 = [1, 2, ...arr];
// console.log(arr2);
// // Or using concat (faster for large arrays)
// const arr3 = arr.concat(arr2);
// console.log(arr3);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// console.log(menu);

// // Destructing objects
// const { name, openingHours, categories } = restaurant;

// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;

// console.log(restaurantName, hours, tags);

// const { menu = [], starterMenu: starters = [] } = restaurant;

// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// ({ a, b } = obj);

// console.log(a, b);

// // Nested objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// let [main, , secondary] = restaurant.categories;

// console.log(main, secondary);

// [main, secondary] = [secondary, main];

// console.log(main, secondary);

// const [starter, mainCourse] = restaurant.order(2, 0);

// console.log(starter, mainCourse);

// // Deconstructing nested arrays
// const tdArr = [1, 2, [3, 4]];
// const [i, , [j, k]] = tdArr;
// console.log(i, j, k);

// // Setting defaults in array deconstructing
// const [p = null, q = null, r = null] = [8, 9];
// console.log(p, q, r);

// const books = [
//   {
//     title: 'Algorithms',
//     author: ['Robert Sedgewick', 'Kevin Wayne'],
//     publisher: 'Addison-Wesley Professional',
//     publicationDate: '2011-03-24',
//     edition: 4,
//     keywords: [
//       'computer science',
//       'programming',
//       'algorithms',
//       'data structures',
//       'java',
//       'math',
//       'software',
//       'engineering',
//     ],
//     pages: 976,
//     format: 'hardcover',
//     ISBN: '9780321573513',
//     language: 'English',
//     programmingLanguage: 'Java',
//     onlineContent: true,
//     thirdParty: {
//       goodreads: {
//         rating: 4.41,
//         ratingsCount: 1733,
//         reviewsCount: 63,
//         fiveStarRatingCount: 976,
//         oneStarRatingCount: 13,
//       },
//     },
//     highlighted: true,
//   },
//   {
//     title: 'Structure and Interpretation of Computer Programs',
//     author: [
//       'Harold Abelson',
//       'Gerald Jay Sussman',
//       'Julie Sussman (Contributor)',
//     ],
//     publisher: 'The MIT Press',
//     publicationDate: '2022-04-12',
//     edition: 2,
//     keywords: [
//       'computer science',
//       'programming',
//       'javascript',
//       'software',
//       'engineering',
//     ],
//     pages: 640,
//     format: 'paperback',
//     ISBN: '9780262543231',
//     language: 'English',
//     programmingLanguage: 'JavaScript',
//     onlineContent: false,
//     thirdParty: {
//       goodreads: {
//         rating: 4.36,
//         ratingsCount: 14,
//         reviewsCount: 3,
//         fiveStarRatingCount: 8,
//         oneStarRatingCount: 0,
//       },
//     },
//     highlighted: true,
//   },
//   {
//     title: "Computer Systems: A Programmer's Perspective",
//     author: ['Randal E. Bryant', "David Richard O'Hallaron"],
//     publisher: 'Prentice Hall',
//     publicationDate: '2002-01-01',
//     edition: 1,
//     keywords: [
//       'computer science',
//       'computer systems',
//       'programming',
//       'software',
//       'C',
//       'engineering',
//     ],
//     pages: 978,
//     format: 'hardcover',
//     ISBN: '9780130340740',
//     language: 'English',
//     programmingLanguage: 'C',
//     onlineContent: false,
//     thirdParty: {
//       goodreads: {
//         rating: 4.44,
//         ratingsCount: 1010,
//         reviewsCount: 57,
//         fiveStarRatingCount: 638,
//         oneStarRatingCount: 16,
//       },
//     },
//     highlighted: true,
//   },
//   {
//     title: 'Operating System Concepts',
//     author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
//     publisher: 'John Wiley & Sons',
//     publicationDate: '2004-12-14',
//     edition: 10,
//     keywords: [
//       'computer science',
//       'operating systems',
//       'programming',
//       'software',
//       'C',
//       'Java',
//       'engineering',
//     ],
//     pages: 921,
//     format: 'hardcover',
//     ISBN: '9780471694663',
//     language: 'English',
//     programmingLanguage: 'C, Java',
//     onlineContent: false,
//     thirdParty: {
//       goodreads: {
//         rating: 3.9,
//         ratingsCount: 2131,
//         reviewsCount: 114,
//         fiveStarRatingCount: 728,
//         oneStarRatingCount: 65,
//       },
//     },
//   },
//   {
//     title: 'Engineering Mathematics',
//     author: ['K.A. Stroud', 'Dexter J. Booth'],
//     publisher: 'Palgrave',
//     publicationDate: '2007-01-01',
//     edition: 14,
//     keywords: ['mathematics', 'engineering'],
//     pages: 1288,
//     format: 'paperback',
//     ISBN: '9781403942463',
//     language: 'English',
//     programmingLanguage: null,
//     onlineContent: true,
//     thirdParty: {
//       goodreads: {
//         rating: 4.35,
//         ratingsCount: 370,
//         reviewsCount: 18,
//         fiveStarRatingCount: 211,
//         oneStarRatingCount: 6,
//       },
//     },
//     highlighted: true,
//   },
//   {
//     title: 'The Personal MBA: Master the Art of Business',
//     author: 'Josh Kaufman',
//     publisher: 'Portfolio',
//     publicationDate: '2010-12-30',
//     keywords: ['business'],
//     pages: 416,
//     format: 'hardcover',
//     ISBN: '9781591843528',
//     language: 'English',
//     thirdParty: {
//       goodreads: {
//         rating: 4.11,
//         ratingsCount: 40119,
//         reviewsCount: 1351,
//         fiveStarRatingCount: 18033,
//         oneStarRatingCount: 1090,
//       },
//     },
//   },
//   {
//     title: 'Crafting Interpreters',
//     author: 'Robert Nystrom',
//     publisher: 'Genever Benning',
//     publicationDate: '2021-07-28',
//     keywords: [
//       'computer science',
//       'compilers',
//       'engineering',
//       'interpreters',
//       'software',
//       'engineering',
//     ],
//     pages: 865,
//     format: 'paperback',
//     ISBN: '9780990582939',
//     language: 'English',
//     thirdParty: {
//       goodreads: {
//         rating: 4.7,
//         ratingsCount: 253,
//         reviewsCount: 23,
//         fiveStarRatingCount: 193,
//         oneStarRatingCount: 0,
//       },
//     },
//   },
//   {
//     title: 'Deep Work: Rules for Focused Success in a Distracted World',
//     author: 'Cal Newport',
//     publisher: 'Grand Central Publishing',
//     publicationDate: '2016-01-05',
//     edition: 1,
//     keywords: ['work', 'focus', 'personal development', 'business'],
//     pages: 296,
//     format: 'hardcover',
//     ISBN: '9781455586691',
//     language: 'English',
//     thirdParty: {
//       goodreads: {
//         rating: 4.19,
//         ratingsCount: 144584,
//         reviewsCount: 11598,
//         fiveStarRatingCount: 63405,
//         oneStarRatingCount: 1808,
//       },
//     },
//     highlighted: true,
//   },
// ];

// const [firstBook, secondBook] = books;

// console.log(firstBook.title, secondBook.title);

// const [, , thirdBook] = books;

// console.log(thirdBook.title);

// const ratings = [
//   ['rating', 4.19],
//   ['ratingsCount', 144584],
// ];

// const [[, rating], [, ratingsCount]] = ratings;

// console.log(`rating: ${rating}\nratingsCount: ${ratingsCount}`);

// const ratingStars = [63405, 1808];

// const [fiveStarRating, oneStartRating, threeStarRating = 0] = ratingStars;

// console.log(fiveStarRating, oneStartRating, threeStarRating);

/* Falsy values:
false
0
-0
'' (empty string)
null
undefined
NaN */

// /*
// We're building a football betting app (soccer for my American friends 😅)!

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// GOOD LUCK 😀
// */

// const team1 = {
//   name: 'team1',
//   players: ['timiy', 'judas', 'larry', 'paul'],
// };
// const team2 = {
//   name: 'team1',
//   players: ['lema', 'orion', 'pauline', 'gertha'],
// };

// const [gk, ...fieldPlayers] = team1.players;
// const allPlayers = [...team1.players, ...team2.players];

// const playersOneFinal = [...team1.players, 'Thiago', 'Coutinho', 'Perisic'];

// console.log(gk, allPlayers, playersOneFinal);

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// const { team1: t1, x: draw, team2: t2 } = game.odds;
// console.log(t1, draw, t2);

// function printGoals(...players) {
//   let sum = 0;
//   for (const player in players) {
//     sum++;
//   }
//   console.log(...players, `Total: ${sum}`);
// }

// printGoals(...team1.players);

// // Using OR logical operator
// console.log(game.odds.team2 < game.odds.team1 || game.team1);

// // Using AND logical operator
// console.log(game.odds.team1 < game.odds.team2 && game.team1);
// // Or
// game.odds.team1 < game.odds.team2 && console.log(`${game.team1} wins.`);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// for(const [i, player] of game.scored.entries()){
//   console.log(i, player)
// }

// // 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")

// const printName = (...players) => {
//   let counter = 1;
//   players.forEach(player => {
//     console.log(`Goal ${counter}: ${player}`);
//     counter++;
//   });
// };

// // Extracting scored arr from game obj
// const players = game.scored;

// printName(...players);

// // 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)

// // Iteration over a k,v (js object) so for in
// const averageOdds = function (odds) {
//   const oddsVals = Object.values(odds);

//   let average = 0;

//   for (const odd of oddsVals) average += odd;

//   average /= oddsVals.length;

//   return average;
// };

// console.log(averageOdds(game.odds));

// /* 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉*/

// function printOdds(game) {
//   const [t1, t2] = Object.keys(game);

//   const odds = game.odds;

//   for (const [team, odd] of Object.entries(odds)) {

//     // Short circuiting
//     const winner = game[team] || "draw";

//     let result = winner === 'draw' ? `\tOdd of ${winner}: ${odd}\n`: `\tOdd of victory ${winner}: ${odd}\n`;

//     console.log(result)
//   }
// }

// printOdds(game);

/* 
Here are the main methods available on JavaScript Set objects:

Set Methods
add(value)
Adds a new element to the set.

delete(value)
Removes an element from the set.

has(value)
Checks if a value exists in the set.

clear()
Removes all elements from the set.

forEach(callbackFn)
Executes a function for each element in the set.

entries()
Returns an iterator of [value, value] pairs.

values()
Returns an iterator of values (same as keys()).

keys()
Returns an iterator of values (for compatibility with Map).

size (property, not a method)
Returns the number of elements in the set.

New Set Methods (ES2025):
intersection(otherSet)
Returns a new set with elements common to both sets.

union(otherSet)
Returns a new set with all elements from both sets.

difference(otherSet)
Returns a new set with elements in the first set but not in the second.

symmetricDifference(otherSet)
Returns a new set with elements in either set, but not in both.

isSubsetOf(otherSet)
Checks if all elements of the set are in another set.

isSupersetOf(otherSet)
Checks if the set contains all elements of another set.

isDisjointFrom(otherSet)
Checks if two sets have no elements in common.

Note: These methods are very new and may not be supported in all browsers/environments yet. Check compatibility before using them in production.

Note:
Set does not support direct access by index or key.


 */
