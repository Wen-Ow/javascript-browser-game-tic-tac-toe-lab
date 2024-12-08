/*-------------------------------- Constants --------------------------------*/

winningCombos = [
  [0, 1, 2], // first row
  [3, 4, 5], // second row
  [6, 7, 8], // third row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // Diagonal wins
  [2, 4, 6], // Diagonal wins
];

/*---------------------------- Variables (state) ----------------------------*/

let board; // Represents the state of the squares on the board
let turn; // Tracks whose turn it is
let winner; // Represent if anyone has won yet
let tie; // Represents if the game has ended in a tie

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr"); // Cache the nine elements that represent the squares on the board
const messageEl = document.getElementById("message"); // Cache the element that displays the game's status on the page
const boardEl = document.querySelector(".board"); // Cache the element that represents the board on the page
const resetBtnEl = document.getElementById("reset"); // Cache the reset button element

// Log cached elements to verify correctness
// console.log('Cached square elements:', squareEls);
// console.log('Cached message element:', messageEl);
// console.log('Cached board element:', boardEl);

/*----------------------------- Initialization ------------------------------*/

function init() {
  // Initialize the game state and render the initial view of the board
  // console.log('Initializing game...');

  // Set the game state variables to their initial values
  board = ["", "", "", "", "", "", "", "", ""]; // Set the board to an array of nine empty strings to represent the nine squares
  turn = "X"; // Set the first turn to 'X'. X starts the game
  winner = false; // Set the winner to false to represent that no one has won yet at the start of the game
  tie = false; // Set the tie to false to represent no tie at the start of the game

  render(); // Call the render function to display the initial view of the board
}

/*-------------------------------- Functions --------------------------------*/

function render() {
  // Render the game based on the current game state
  // console.log('Rendering game...');
  updateBoard(); //
  updateMessage(); //
}

function updateBoard() {
  board.forEach((value, idx) => {
    // Loop through the board array and get the value and index of each element using forEach
    const square = squareEls[idx]; // Get the square element at the current index
    square.textContent = value; // Set the text content of the square element to the value at the current index of the board array. Display 'X' or 'O', or an empty string
    square.style.color =
      value === "X" ? "Blue" : value === "0" ? "Red" : "Black"; // Set the color of the square element to blue if the value is 'X', red if the value is 'O', or black if the value is an empty string ''
  });
}

function updateMessage() {
  // Update the message displayed on the page based on the current game state to the user
  if (!winner && !tie) {
    // If there is no winner and no tie
    messageEl.textContent = `It's ${turn}'s turn!`; // Display the message that it is the current player's turn
  } else if (!winner && tie) {
    messageEl.textContent = `It's a tie!`; // Display the message that it is a tie and the game is over
  } else {
    messageEl.textContent = `Congratulations, ${turn} wins!`; // Display the message that the current player has won!
  }
}

// Places the current player's piece on the board
// @param {number} index - The index of the square clicked
function placePiece(index) {
  board[index] = turn; // Set the value of the square element in the board array to the current player's turn

  // console.log('Board state:', board); // Log the current state of the board array to the console for testing purposes
}

// Checks if there is a winner
function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true; // Set the winner to true if there is a winner
      return; // Return early from the function if there is a winner
    }
  }
}

// Checks if there is a tie
function checkForTie() {
  if (winner) return; // Return early from the function if there is a winner

  if (board.includes("")) {
    // Checks if the board array contatins any empty strings ('') using the includes method
    tie = false; // Game is not a tie if there are empty strings
  } else {
    tie = true; // Sets tie to true if there are no empty strings and no winner
  }
  // console.log('Tie state:', tie); // Log the current state of the tie variable to the console for testing purposes
}

// Switches the player's turn
function switchPlayerTurn() {
  if (winner) return; // Checks if a winner exists: if yes, it returns early since no turn switching is needed

  turn = turn === "X" ? "O" : "X"; // Switch the turn between 'X' and 'O'

  // console.log('Turn:', turn); // Logs the current turn to the console for testing purposes
}

// Handles players click on a square
// @param {object} evt - The event object
// @param {Event} evt.target - The element that triggered the event
function handleClick(evt) {
  const square = evt.target; // Get the square element that was clicked
  if (!square.classList.contains("sqr")) return; // If the square element does not have the class 'sqr', return early from the function

  const squareIndex = parseInt(square.id); // Get the index of the square element that was clicked by parsing the id of the square element to an integer

  if (board[squareIndex] || winner) return; // If the square element is already filled or there is a winner, return early from the function

  placePiece(squareIndex); // Call the placePiece function and pass in the index of the square element that was clicked

  checkForWinner(); // Call the checkForWinner function to check if there is a winner

  checkForTie(); // Call the checkForTie function to check if there is a tie

  switchPlayerTurn(); // Changes the turn if the game is still in progress

  render(); // Updates the board and message to reflect the current game state
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener("click", handleClick); // Add an event listener to the board element that listens for the click event and calls the handleClick function when the event is triggered

resetBtnEl.addEventListener("click", init); // Add an event listener to the reset button element that listens for the click event and calls the init function when the event is triggered

document.addEventListener("DOMContentLoaded", init);
// The DOMContentLoaded event ensures the script wait until all HTML elements are parsed and ready to be used.
// Adding an explicit event listener for the DOMContentLoaded is an additional safeguard.
// The init function is called when the DOM is fully loaded, initializing the game state and rendering the initial view of the board.
// Add an event listener to the document that listens for the DOMContentLoaded event and calls the init function when the event is triggered.
