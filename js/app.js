// -------------- MODAL -----------------

// opening modal
var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-front-bg');
var modalClose = document.querySelector('.modal-close');

function openModal(){
  modalBg.classList.add('bg-active');
}
modalBtn.addEventListener('click', openModal);

function closeModal(){
  modalBg.classList.remove('bg-active');
}
modalClose.addEventListener('click', closeModal);



// highscore modal
var highscoreBtn = document.getElementById('highscore-btn');
var highscoreBg = document.querySelector('.modal-highscore-bg');
var highscoreClose= document.querySelector('.modal-highscore-close');

function openHighscores(){
  highscoreBg.classList.add('bg-active');
}
highscoreBtn.addEventListener('click', openHighscores);

function closeHighscore(){
  highscoreBg.classList.remove('bg-active');
}
highscoreClose.addEventListener('click', closeHighscore);



// about us modal
var highscoreBtn = document.getElementById('highscore-btn');
var highscoreBg = document.querySelector('.modal-highscore-bg');
var highscoreClose= document.querySelector('.modal-highscore-close');

function openHighscores(){
  highscoreBg.classList.add('bg-active');
}
highscoreBtn.addEventListener('click', openHighscores);

function closeHighscore(){
  highscoreBg.classList.remove('bg-active');
}
highscoreClose.addEventListener('click', closeHighscore);


// play modal
var highscoreBtn = document.getElementById('highscore-btn');
var highscoreBg = document.querySelector('.modal-highscore-bg');
var highscoreClose= document.querySelector('.modal-highscore-close');

function openHighscores(){
  highscoreBg.classList.add('bg-active');
}
highscoreBtn.addEventListener('click', openHighscores);

function closeHighscore(){
  highscoreBg.classList.remove('bg-active');
}
highscoreClose.addEventListener('click', closeHighscore);

// how to play modal
var howToPlayBtn = document.getElementById('howToPlay-btn');
var howToPlayBg = document.querySelector('.modal-howToPlay-bg');
var howToPlayClose= document.querySelector('.modal-howToPlay-close');

function openHowToPlay(){
  howToPlayBg.classList.add('bg-active');
}
howToPlayBtn.addEventListener('click', openHowToPlay);

function closehowToPlay(){
  howToPlayBg.classList.remove('bg-active');
}
howToPlayClose.addEventListener('click', closehowToPlay);



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

// employees.sort(function(a, b){
//   return a.score-b.score;
// });


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
  displayWord();
}
letterExample.addEventListener('click', guessALetter);


// -------------- GENERATING RANDOM WORD --------------------
var words = ['rudoplh', 'santa', 'christmas'];
var phrase = ['sleigh bells ring'];
var blankWord = '';
var currentWord, currentPhrase;
var blankPhrase = '';
var chances = 6;
var correct = false;
// function randomWord() {
//   return Math.floor(Math.random() * words.length);
// }

// would use random word inside words[randomWord()]
currentWord = words[0];
for (var i = 0; i < currentWord.length; i++){
  blankWord += '_';
}

currentPhrase = phrase[0];
for (var i = 0; i < currentPhrase.length; i++){
  if (currentPhrase[i] === ' '){
    blankPhrase+= ' ';
  } else {
    blankPhrase += '_';
  }
}


function guessedLetter(guess){
  blankWord = blankWord.split(''); // tree = ['t','r','e','e']
  for (var i = 0; i < currentWord.length; i++){
    if (guess === currentWord.charAt(i)){ // rudolph => _ _ _ _ _ _ _
      blankWord[i] = guess;
      blankWord = blankWord.join(''); // 'tree'
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
var pressWord = document.querySelector('.word-btn');
pressWord.addEventListener('click', displayWord);

function displayWord(){
  wordElement.textContent = blankWord;
}


// RENDER PHRASE ON SCREEN
var wordElement = document.getElementById('word');
var pressPhrase = document.querySelector('.phrase-btn');
pressPhrase.addEventListener('click', displayPhrase);

function displayPhrase(){
  wordElement.textContent = blankPhrase;
}

