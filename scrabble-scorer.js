
const input = require("readline-sync");


//object to score using old point Structure 
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 //initial loop
	for (let i = 0; i < word.length; i++) {
      // inner loop 
    for (let i = 0; i < word.length; i++) {
      for (const pointValue in oldPointStructure) {
        if (oldPointStructure[pointValue].includes(word[i])) {
          letterPoints += Number(pointValue);
        }
      }
    }
    // will return letter points with point value
    return letterPoints;
	}
 }
// function for initial promt at the Start!
 function initialPrompt() {
  console.log("Let's play some scrabble! Enter a word:");
}
//simple Scorer function returns word length 
function simpleScorer(word) {
  return word.length;
}
//Vowel Bonus Scorer function 
function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    //if any of the below letters
    if (['A', 'E', 'I', 'O', 'U'].includes(word[i])) {
      //Adds 3 points to it 
      score += 3;
      //if not adds 1 point 
    } else {
      score += 1;
    }
  }
//returns the score 
  return score;
}
//function for Scrabble Scorer
function scrabbleScorer(word) {
  word = word.toUpperCase();
  let score = 0;
//if index is less than word length it will increment 
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (newPointStructure[letter]) {
      score += newPointStructure[letter];
    }
  }
// returns the score
  return score;
}

 
// Scoring algorithm Array objects with key and value 
  const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are worth 3 points, consonants are worth 1 point.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "Uses the Scrabble scoring system.",
    scorerFunction: scrabbleScorer,
  },
 ];
 // Scoring promt at the beggining of the program
 function scorerPrompt() {
  // asks user to choose the scoring algorithm type 
  console.log("Which scoring algorithm would you like to use?");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }
  const selectedAlgorithm = input.question("Enter the number of the scoring algorithm: ");
  return scoringAlgorithms[selectedAlgorithm];
}

function transform() {
  newPointStructure = {};

  for (const [score, letters] of Object.entries(oldPointStructure)) {
    for (const letter of letters) {
      newPointStructure[letter.toLowerCase()] = Number(score);
    }
  }
}
// calls the functions to run the program 
function runProgram() {
  initialPrompt();
  transform();
  const word = input.question("Enter a word to score: ");
  const selectedAlgorithm = scorerPrompt();
  const score = selectedAlgorithm.scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
   
}
runProgram();
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
