//create selection of words
var wordList = ["ALIEN", "ASTEROID", "SUPERNOVA", "GALAXY", "PLANET", "MOON"];

//create a selection of images
var imageArray = ["assets/images/alien.jpg", "assets/images/asteroid.jpg", "assets/images/supernova.jpg", "assets/images/galaxy.jpg", "assets/images/planet.jpg", "assets/images/moon.jpg"]

//create array of letters to determine if the key pressed is a letter
var isLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var wins = 0;

function hangmanGame() {

	//define maximum of random whole number generator
	var arrayMax = wordList.length;

	//generate random whole number between 0 and maximum (maximum is highest index of array)
	var wordIndex = Math.floor(Math.random() * arrayMax);

	//select a word from the array based on random number chosen
	var randomWord = wordList[wordIndex];

	//use wordIndex to find corresponding image in imageArray
	var imageSource = imageArray[wordIndex];

	//determine lenght of chosen random word in order to determine how many blank spaces are needed
	var wordLength = randomWord.length;

	//create blank space string
	var blank = "__ ";

	//create empty string to be filled with correct number of blank spaces
	var blankArray = [];

	//set starting number of guesses
	var guessesLeft = 15;

	//letters guessed starts empty, letters are pushed into the string and printed into appropriate div when guesses are incorrect
	var lettersGuessed = "";

	var didUserWin;

	function reset() {
		guessesLeft = 15;
		document.getElementById("guesses-left").innerHTML = guessesLeft;
		lettersGuessed = "";
		document.getElementById("letters-guessed").innerHTML = lettersGuessed;
	}

	function updateWins() {
		wins = wins + 1;
		document.getElementById("wincount").innerHTML = wins;
	}

	//define functions
	function createBlank() {
	    //create a loop that fills blank spaces into empty string until the length of the random word is reached
	    for (var i = 0; i < wordLength; i++) {
			blankArray.push(blank);
		}
		document.getElementById("selected-word").innerHTML = blankArray.join("");

		//printing random word to check that the correct number of blank spaces are included
		console.log(randomWord);

	}

	function whenKeyPressed() {

		var letter = event.key
		var userGuess = letter.toUpperCase();
		// console.log(userGuess);

		//if the key pressed isn't in the random word and if it hasn't already been guessed (if it isn't in the letters guessed array), 1 needs to be deducted from guesses remaining and the letter needs to be added to the already guessed array
		//this code asks for the idex of the guessed letter in the string and array; if the index is -1 the letter is not present in the string or array
		if (randomWord.indexOf(userGuess) === -1 && lettersGuessed.indexOf(userGuess) === -1 && isLetter.indexOf(userGuess) !== -1) {
		      
	    	//adds guessed letter to lettersGuessed array, prints in letters-guessed <p>
	    	lettersGuessed = lettersGuessed + userGuess + ", ";
	    	document.getElementById("letters-guessed").innerHTML = lettersGuessed;
	    	// $("#letters-guessed").html(lettersGuessed);

	    	//subtracts 1 from guesses remaining, replaces html with new number
	    	guessesLeft = guessesLeft - 1;
	    	document.getElementById("guesses-left").innerHTML = guessesLeft;
	    	// $("#guesses-left").html(guessesLeft);

	    	if (guessesLeft === 0) {
		    	didUserWin = false;
	    	}

	    }

	    else {

	    	//need to create an array that stores the indexes where userGuess is found in the randomWord; must be defined in loop because it must refresh every time a new letter is guessed
			var indexes = [];

			for (var i = 0; i < randomWord.length; i++) {
					
				if (randomWord[i] === userGuess) {
					indexes.push(i);
				}

			}

			for (var i = 0; i < indexes.length; i++) {
					var replaceIndex = indexes[i];
					blankArray[replaceIndex] = userGuess;
					document.getElementById("selected-word").innerHTML = blankArray.join("");
					// $("#selected-word").html(blankArray);
			}

			if (blankArray.indexOf(blank) === -1) {
			document.getElementById("image").src = imageSource;
			// wins++;
			// document.getElementById("wincount").innerHTML = wins;
			didUserWin = true;
		}
		   
	}
	

	if (didUserWin === true) {
		document.getElementById("songtitle").innerHTML = ("The word was " + randomWord);
		updateWins();
		reset();
		hangmanGame();
	}

	else if (didUserWin === false) {
		alert("Try again!")
		reset();
		hangmanGame();
	}

	}

createBlank();

//function should occur when the user presses a key to guess a letter
document.onkeyup = function(event) {
	whenKeyPressed();
}

}

document.addEventListener("DOMContentLoaded", function(event) {
	hangmanGame();
});

