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

// User fns
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
accounts.forEach(account => console.log(account.userName));
console.log(account1.userName);

// Account display fns
// Display movements
const displayMovements = function (movements) {
  containerMovements.textContent = '';

  movements.forEach((mov, i) => {
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

displayMovements(account1.movements);

// Display balance from movements
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);

function calcDisplaySummary(movements, type = true) {
  const sub = movements.filter(mov => {
    if (type) return mov > 0;
    else return mov <= 0;
  });

  const sum =
    Math.abs(
      sub.reduce((sum, mov, i, movs) => {
        console.log(`Account movements: ${[...movs]}`);
        return sum + mov;
      }, 0),
    ) + ' EUR';

  const inter =
    Math.abs(
      type
        ? sub.reduce((inter, mov) => {
            const localInter = 0.012 * mov;
            return localInter >= 1 ? inter + localInter : inter;
          }, 0)
        : 0,
    ) + ' EUR';

  console.log(`Sum of movements: ${sum}`);
  console.log(`Interest of movements: ${inter}`);

  return [sum, inter];
}

// Setting ins and interest
const insAndInterest = calcDisplaySummary(account1.movements);
labelSumIn.textContent = insAndInterest[0];
labelSumInterest.textContent = insAndInterest[1];

// Outs
labelSumOut.textContent = calcDisplaySummary(account1.movements, false)[0];

const dogs = [2, 1, 3, 5, 8];

function calcAverageHumanAge(dogs) {
  return dogs
    .map(dog => {
      if (dog <= 2) {
        return dog * 2;
      } else {
        return dog * 4 + 16;
      }
    })
    .filter(dogAge => dogAge >= 18)
    .reduce((acc, cur, i, humanAge) => acc + cur / humanAge.length, 0);
}

const result = calcAverageHumanAge(dogs);
console.log(result)
