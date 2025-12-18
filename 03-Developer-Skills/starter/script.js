"use strict";

///////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!
*/

const data1 = [17, 21, 23];

const printForecast = function (arr) {
  let str = "...";
  for (let i = 0; i < arr.length; i++) {
    str += ` ${arr[i]}°C in ${i + 1} days ...`;
  }
  str = str.slice(0, -4); // Remove trailing " ... "
  console.log(str);
};

printForecast(data1);

function forecast(temps) {
  let index = 0; //starting index
  let message = "";
  temps.forEach((temp) => {
    const day = index + 1;
    const snippet = `${temp}degC in ${day} days`;
    if (index < temps.length - 1) {
      message += snippet + " ... ";
    } else {
      message += snippet;
    }
    index++;
  });

  return message;
}

console.log(forecast(data1));
