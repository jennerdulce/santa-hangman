// -------------- MODAL -----------------

// opening modal
var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-front-bg');
var modalClose = document.querySelector('.modal-close');

function openModal() {
  modalBg.classList.add('bg-active');
}
modalBtn.addEventListener('click', openModal);

function closeModal() {
  modalBg.classList.remove('bg-active');
}
modalClose.addEventListener('click', closeModal);


// highscore modal
var highscoreBtn = document.getElementById('highscore-btn');
var highscoreBg = document.querySelector('.modal-highscore-bg');
var highscoreClose = document.querySelector('.modal-highscore-close');

function openHighscores() {
  modalBg.classList.remove('bg-active');
  highscoreBg.classList.add('bg-active');
}
highscoreBtn.addEventListener('click', openHighscores);

function closeHighscore() {
  highscoreBg.classList.remove('bg-active');
  modalBg.classList.add('bg-active');
}
highscoreClose.addEventListener('click', closeHighscore);


// play modal
var playBtn = document.getElementById('play-btn');
var playBg = document.querySelector('.modal-play-bg');
var playClose = document.querySelector('.modal-play-close');

function openPlay() {
  playBg.classList.add('bg-active');
}
playBtn.addEventListener('click', openPlay);

function closePlay() {
  playBg.classList.remove('bg-active');
}
playClose.addEventListener('click', closePlay);


// how to play modal
var howToPlayBtn = document.getElementById('howToPlay-btn');
var howToPlayBg = document.querySelector('.modal-howToPlay-bg');
var howToPlayClose = document.querySelector('.modal-howToPlay-close');

function openHowToPlay() {
  howToPlayBg.classList.add('bg-active');
}
howToPlayBtn.addEventListener('click', openHowToPlay);

function closehowToPlay() {
  howToPlayBg.classList.remove('bg-active');
}
howToPlayClose.addEventListener('click', closehowToPlay);


//  finish modal
// dont need an open, finish will be opened at end of the game by
// var finishBtn = document.getElementById('finish-btn');
var finishBg = document.querySelector('.modal-finish-bg');
var yesChoice = document.getElementById('yes');
var noChoice = document.getElementById('no');
var finishHighscore = document.getElementById('finishHighscore');

function handleYes(){
  finishBg.classList.remove('bg-active');
  playBg.classList.add('bg-active');
}
yesChoice.addEventListener('click', handleYes);


function handleNo(){
  finishBg.classList.remove('bg-active');
  modalBg.classList.add('bg-active');
}
noChoice.addEventListener('click', handleNo);

function handleHighscore(){
  finishBg.classList.remove('bg-active');
  highscoreBg.classList.add('bg-active');
}
finishHighscore.addEventListener('click', handleHighscore);


//  ---------------- OBJECT CONSTRUCTOR ---------------
var scores = [100, 500, 600, 400, 300, 400, 600, 115, 630, 900];
var randomNames = ['rudolph', 'papa elf', 'Mrs. Clause', 'Jack Skellignton', 'Corpse Bride', 'Hercules', 'Mushu', 'Olaf', 'Else', 'Sven'];
var highscoreList = [];
var currentUserScore = 0;


function Player(name, score) {
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


// var letters = 'abcdefghijklmnopqrstuvwxyz'.split(''); // 'a', 'b', 'c', 'd'...]
// var letterContainer = document.getElementById('letters');
// for (var i = 0; i < letters.length; i++){
//   var span = document.createElement('span');
//   span.textContent = letters[i];
//   letterContainer.appendChild(span);
// }



// THIS WORKS AND RENDERS ON SCREEN; HARD CODED VALUE
var letterExampleR = document.querySelector('.R');
letterExampleR.addEventListener('click', guessR);
function guessR() {
  guessedLetter('r');
  displayWord();
}

var letterExampleU = document.querySelector('.U');
letterExampleU.addEventListener('click', guessU);
function guessU() {
  guessedLetter('u');
  displayWord();
}

var letterExampleD = document.querySelector('.D');
letterExampleD.addEventListener('click', guessD);
function guessD() {
  guessedLetter('d');
  displayWord();
}

var letterExampleO = document.querySelector('.O');
letterExampleO.addEventListener('click', guessO);
function guessO() {
  guessedLetter('o');
  displayWord();
}

var letterExampleL = document.querySelector('.L');
letterExampleL.addEventListener('click', guessL);
function guessL() {
  guessedLetter('l');
  displayWord();
}

var letterExampleP = document.querySelector('.P');
letterExampleP.addEventListener('click', guessP);
function guessP() {
  guessedLetter('p');
  displayWord();
}

var letterExampleH = document.querySelector('.H');
letterExampleH.addEventListener('click', guessH);
function guessH() {
  guessedLetter('h');
  displayWord();
}




// -------------- GENERATING RANDOM WORD --------------------
var words = ['rudolph', 'santa', 'christmas'];
var phrase = ['sleigh bells ring'];
var blankWord = '';
var currentWord, currentPhrase;
var blankPhrase = '';
var chances = 6;
var correct = false;
// function randomWord() {
//   return Math.floor(Math.random() * words.length);
// }
var gameCount;
var wordScore = 0;

var scoretracker
function timer () {
  gameCount --;
  var gameCountDisplay = document.getElementById('gameTimer');
  gameCountDisplay.innerHTML = gameCount;
  if(gameCount <= 0){
    clearInterval(gameCount);
    endGame();
  }

}
function startscoreTracker() {
  scoreTracker = setInterval(timer, 20);

  function timer() {
    var meterDisplay = document.getElementById('fillMeter');
    
    meterDisplay.setAttribute('style', meterWidth);
  }
}




// would use random word inside words[randomWord()]


currentWord = words[0]; // rudolph 7 letter
for (var i = 0; i < currentWord.length; i++) {
  blankWord += '_'; // ' _ _ _ _ _ _ _ '


}

currentPhrase = phrase[0];
for (var i = 0; i < currentPhrase.length; i++) {
  if (currentPhrase[i] === ' ') {
    blankPhrase += ' ';
  } else {
    blankPhrase += '_';
  }
}

function openEndModal() {
  finishBg.classList.add('bg-active');
}



// ---------------- THIS IS HOW YOU ACTUALLY GUESS A LETTER -----------------------
var finishStatementEl = document.getElementById('finishStatement');




function guessedLetter(guess) {
  blankWord = blankWord.split(''); // rudolph = ['r','u','d']

  for (var i = 0; i < currentWord.length; i++) {

    if (guess === currentWord.charAt(i)) { // rudolph => _ _ _ _ _ _ _ // guess = r

      blankWord[i] = guess;
      blankWord = blankWord.join(''); // 'tree'
      correct = true;
      currentUserScore += 100;
      // turn letter green
    }

    if (blankWord === currentWord && chances > 0) {
      // open you win modal
      finishStatementEl.textContent = 'You Win!';
      openEndModal();
    }

  }
  if (!correct) {
    // turn letter red
    // chances--
  }

  if (blankWord !== currentWord && chances === 0) {
    finishStatementEl.textContent = 'You Lose!';
    openEndModal();
  }

  // resets to false for the next guess
  correct = false;
}

// RENDER WORD ON SCREEN
var wordElement = document.getElementById('word');
var pressWord = document.querySelector('.word-btn');
pressWord.addEventListener('click', displayWord);

function displayWord() {
  modalBg.classList.remove('bg-active');
  playBg.classList.remove('bg-active');
  wordElement.textContent = blankWord;
}


// RENDER PHRASE ON SCREEN
var pressPhrase = document.querySelector('.phrase-btn');
pressPhrase.addEventListener('click', displayPhrase);

function displayPhrase() {
  modalBg.classList.remove('bg-active');
  playBg.classList.remove('bg-active');
  wordElement.textContent = blankPhrase;
}


// function renderGame() {
//   currentUserScore = 0;
//   blankWord = '';
//   blankPhrase = '';
//   if (playWord){
//     pass
//   }
//   if (playPhrase){
//     pass
//   }
// }

