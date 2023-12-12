const { input } = require("../../input");

let results = [];

const games = input.map((cards) => {
  return cards
    .replace(/Card.*: /, "")
    .split("|")
    .map((e) => e.split(" ").filter((v) => v));
});

const checkMatchingNumbers = (arr1, arr2) => {
  return arr1.filter((val) => arr2.includes(val));
};

const makeNewCopies = (gamesIndex, matchingNumbersLength) => {
  for (var i = 0; i < matchingNumbersLength; i++) {
    results.push(games[gamesIndex + (i + 1)]);
    const matchingNumbers = checkMatchingNumbers(
      games[gamesIndex + (i + 1)][0],
      games[gamesIndex + (i + 1)][1]
    );
    if (matchingNumbers.length > 0) {
      makeNewCopies(gamesIndex + (i + 1), matchingNumbers.length);
    }
  }
};

for (var i = 0; i < games.length; i++) {
  results.push(games[i]);
  const matchingNumbers = checkMatchingNumbers(games[i][0], games[i][1]);
  if (matchingNumbers.length > 0) {
    makeNewCopies(i, matchingNumbers.length);
  }
}

console.log(results.length);
