// -------------- MODAL -----------------

var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');

modalBtn.addEventListener('click', openModal);

function openModal(){
  modalBg.classList.add('bg-active');
}

modalClose.addEventListener('click', closeModal);

function closeModal(){
  modalBg.classList.remove('bg-active');
}


//  ---------------- OBJECT CONSTRUCTOR ---------------
var scores = [100, 500 ,600 ,400, 300, 400, 600, 115, 630, 900];
var randomNames = ['rudolph', 'papa elf', 'Mrs. Clause', 'Jack Skellignton', 'Corpse Bride', 'Hercules', 'Mushu', 'Olaf', 'Else', 'Sven'];
var highscoreList = [];


function Player(name, score){
  this.name = name;
  this.score = score;
  highscoreList.push(this);
}


// ------------------- RETRIEVE HIGHSCORES -----------------------
// var retrievedData = localStorage.getItem('scoresData');
// if (retrievedData){
//   highscoreList = retrievedData;
// } else {
//   for (var i = 0; i < randomNames.length; i++){
//     new Player(randomNames[i], scores[i]);
//   }
// }

// var stringifiedScores = JSON.stringify(highscoreList);
// localStorage.setItem('scoresData', stringifiedScores);


// -------------- CREATE LETTERS AND DISPLAY ON HTML --------------------

// I NEED TO ASSIGN A VALUE TO EACH  BUTTON SO WHEN CLICKED TRIGGERS EVENT LISTENER AND PERFORMS guessedLetter(WITH CLICKED VALUE)
var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
var letterContainer = document.getElementById('letters');
for (var i = 0; i < letters.length; i++){
  var span = document.createElement('span');
  span.textContent = letters[i];
  letterContainer.appendChild(span);
}

// THIS WORKS AND RENDERS ON SCREEN; HARD CODED VALUE
var letterExample = document.querySelector('.R');
function guessALetter(){
  guessedLetter('r');
  console.log('you guessed r');
  displayWord();
}
letterExample.addEventListener('click', guessALetter);


// -------------- GENERATING RANDOM WORD --------------------
var words = ['rudoplh', 'santa', 'christmas'];
var blankWord = '';
var currentAnswer;
var chances = 6;
var correct = false;
// function randomWord() {
//   return Math.floor(Math.random() * words.length);
// }

// would use random word inside words[randomWord()]
currentAnswer = words[0];

for (var i = 0; i < currentAnswer.length; i++){
  blankWord += '_';
}

function guessedLetter(guess){
  blankWord = blankWord.split('');
  for (var i = 0; i < currentAnswer.length; i++){
    if (guess === currentAnswer.charAt(i)){
      blankWord[i] = guess;
      blankWord = blankWord.join('');
      correct = true;
      // turn letter green
    }
  }
  if (!correct){
    // turn letter red
    // chances--
  }
  // resets to false for the next guess
  correct = false;
}

// RENDER WORD ON SCREEN
var wordElement = document.getElementById('word');
var pressPlay = document.querySelector('.play-btn');
pressPlay.addEventListener('click', displayWord);

function displayWord(){
  wordElement.textContent = blankWord;
}

