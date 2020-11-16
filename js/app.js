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

var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
var words = ['rudoplh', 'santa', 'christmas'];
var blankWord = '';
var currentAnswer;
var chances = 6;
var correct = false;

var letterContainer = document.getElementById('letters');

for (var i = 0; i < letters.length; i++){
  var span = document.createElement('span');
  span.textContent = letters[i];
  letterContainer.appendChild(span);
}

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

guessedLetter('r');
// console.log(blankWord);
