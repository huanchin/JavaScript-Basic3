"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

/*** object literals  ***/
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  /**** ES6 enhanced object literal: write object directly****/
  openingHours,

  /**** ES6 enhanced object literal: delete "function" key word****/
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

/****** optional chaining ******/

// check if urant.openingHours & restaurant.openingHours.mon exist(NOT null, NOT undefined)
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// check if property exist using optional chaining
// if not exist, return undefined
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  // 請注意以下語法！不可以寫為 restaurant.openingHours[day]?.open || "closed" (if open = 0 則會被視為nullish)
  const open = restaurant.openingHours[day]?.open ?? "closed";
  // 請注意以下語法！ 不可以寫為 restaurant.openingHours.day (restaurant.openingHours.day不存在，day為variable)
  console.log(`On ${day}, we open at ${open}`);
}

// check if method exist using optional chaining
console.log(restaurant.order?.(0, 1) ?? "Method does not exist"); // Array [ "Focaccia", "Pasta" ]
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist"); // Method does not exist

// check if array is empty using optional chaining
const users = [{ name: "Jonas", email: "hello@jonas.io" }];
console.log(users[0]?.name ?? "User array empty");

// check if array empty in traditional way
if (users.length > 0) console.log(users[0].name);
else console.log("User array empty");

/****** looping objects: object keys, values, and entries ******/

// loop over property names(keys)
const properties = Object.keys(openingHours);
console.log(properties); // Array(3) [ "thu", "fri", "sat" ]

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day},`;
}

console.log(openStr);

// loop over property values (values)
const values = Object.values(openingHours);
console.log(values);

for (const time of values) {
  console.log(time);
}

// loop over entries (keys + values)
const entries = Object.entries(openingHours);
console.log(entries);

// for (const x of entries) {
//   const key = x[0];
//   const open = x[1].open;
//   const close = x[1].close;
//   console.log(`On ${key}, we open at ${open} and closed at ${close}`);
// }

for (const [key, { open, close }] of entries) {
  console.log(`On ${key}, we open at ${open} and closed at ${close}`);
}

// On thu, we open at 12 and closed at 22
// On fri, we open at 11 and closed at 23
// On sat, we open at 0 and closed at 24

/****  Coding Challenge #2 ****/

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
console.log(game.scored);
for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${player}`);
}

// 2.
let average = 0;
const odds = Object.values(game.odds);
console.log(odds);
for (const odd of odds) {
  average += odd;
}
average /= odds.length;
console.log(average);

// 3.
const oddEntries = Object.entries(game.odds);
console.log(oddEntries);
for (const [team, odd] of oddEntries) {
  console.log(`Odd of ${game[team] || "draw"}: ${odd}`);
}

// BONUS
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
