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

function updateUI(account) {
  // Display movs
  displayMovements(account.movements);

  // // Display balance
  calcDisplayBalance(account);

  // Display summary
  calcDisplaySummary(account.movements, account.interestRate);
}

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
