'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Global vars
let currentAccount;
// Update sort from DOM
let sortAscending = false;
const sortVals = { up: '↑ SORT', down: '↓ SORT' };

// Take accounts list and create userName in account from full name (owner), if userName exists already is overridden
const createUserNames = acc => {
  acc.forEach(a => {
    a.userName = a.owner
      .toLowerCase()
      .split(' ')
      .map(user => user[0])
      .join('');
  });
};

createUserNames(accounts);

// Account display fns
// Display movements
const displayMovements = function (movements, sort = false) {
  containerMovements.textContent = '';

  // Sort movs before displaying
  const movs = sort
    ? movements.slice().sort((a, b) => (sortAscending ? a - b : b - a))
    : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
          <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Display balance from movements, VOID
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} EUR`;
};

function calcDisplaySummary(movements, intRate) {
  let amount = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = amount + ' EUR';

  const inter = movements
    .filter(mov => mov >= 1)
    .map(amount => (amount * intRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = inter + ' EUR';

  amount = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = amount + ' EUR';
}

// Event handlers
function updateUI(account) {
  // Display movs
  displayMovements(account.movements);

  // // Display balance
  calcDisplayBalance(account);

  // Display summary
  calcDisplaySummary(account.movements, account.interestRate);
}

btnClose.addEventListener('click', e => {
  e.preventDefault();
  // Test if name and code match current account (that would be the way to do it for a real world situation, cannot close other account outside of that account), but here is all accounts
  let userNameIndex = accounts.findIndex(
    acc => acc.userName === inputCloseUsername.value,
  );
  userNameIndex =
    userNameIndex >= 0 ? userNameIndex : alert('Username inexistent.');

  let userPinIndex = accounts.findIndex(
    acc => acc.pin === Number(inputClosePin.value),
  );
  userPinIndex = userPinIndex >= 0 ? userPinIndex : alert('Pin inexistent.');

  // Equality match testing for correct user
  if (userNameIndex === userPinIndex) {
    console.log(userNameIndex);

    const delAcc = accounts.splice(userNameIndex, 1)[0];

    alert(`${delAcc.owner} was deleted.`);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  const loanTest = currentAccount.movements.some(mov => mov >= loan * 0.1);

  if (loanTest) {
    currentAccount.movements.push(loan);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  } else {
    alert('Inelligible for loan.');
  }
});

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value,
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display welcome message & formating
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value,
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance > amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
    // Clearing fields
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
  }
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  sortAscending = !sortAscending; // Bool toggle
  btnSort.textContent = sortAscending ? sortVals.up : sortVals.down;
  displayMovements(currentAccount.movements, true);
});

///////////////////////////////////////
// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
const addRecFood = dogs => {
  dogs.forEach(dog => {
    dog.recFood = Math.floor(dog.weight ** 0.75 * 28);
    console.log(dog);
  });
};

addRecFood(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓. Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// FILTER sarah dog -> TEST currFood > recFood?
function checkFood(owner, dogs) {
  const targetDog = dogs.find(dog => dog.owners.includes(owner));
  const result = `${owner}'s dog eats to ${targetDog.curFood > targetDog.recFood ? 'much' : 'little'}.`;
  console.log(result);
}

checkFood('Sarah', dogs);

// 3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
const getOwners = (dogs, type) => {
  const owners = dogs
    .filter(dog => {
      if (type == 'overeat') return dog.curFood > dog.recFood;
      else if (type == 'undereat') return dog.curFood < dog.recFood;
    })
    .flatMap(dog => dog.owners);
  return owners;
};

const ownersTooMuch = getOwners(dogs, 'overeat');
const ownersTooLittle = getOwners(dogs, 'undereat');
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
function printNames(names, type) {
  let str = '';
  if (type == 'overeat') {
    str = names.join(' and ') + "'s dogs eat too much!";
  } else if (type == 'undereat') {
    str = names.join(' and ') + "'s dogs eat too little!";
  }
  console.log(str);
}
printNames(ownersTooMuch, 'overeat');
printNames(ownersTooLittle, 'undereat');

// 5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
const justEnough = dogs.some(dog => dog.curFood === dog.recFood);
console.log(justEnough);

// 6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
function dogOk(dog) {
  return dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
}

const justOk = dogs.every(dogOk);
console.log(justOk);

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const dogsOk = dogs.filter(dogOk);
console.log(...dogsOk);

// 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
let groupedDogs = Object.groupBy(dogs, dog => dog.curFood === dog.recFood);
console.log(groupedDogs);

// 9. Group the dogs by the number of owners they have
groupedDogs = Object.groupBy(dogs, dog => dog.owners.length);
console.log(groupedDogs);

// 10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
const sortedDogs = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);
