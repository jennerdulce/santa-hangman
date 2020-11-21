'use strict';

var words = [
  'prancer',
  'santa',
  'merry christmas',
  'sleigh bells ring',
  'rudolph the rednose raindeer',
  'presents',
  'ho ho ho',
  'ol saint nick',
  'north pole',
];
var blankWord = '';
var currentWord;
var chances = 7;
var correct = false;
var bodyPart = 0;
var topScores = [];

// High Score list entries
var scores = [100, 500, 600, 400, 300, 400, 600, 115, 630, 900];
var randomNames = ['Rudolph', 'papa elf', 'Mrs. Clause', 'Jack Skellignton', 'Corpse Bride', 'Hercules', 'Mushu', 'Olaf', 'Else', 'Sven'];
var highscoreList = [];
var currentUserScore = 0;



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
  renderHighscore();
  highscoreBg.classList.add('bg-active');
}
highscoreBtn.addEventListener('click', openHighscores);

function closeHighscore() {
  highscoreBg.classList.remove('bg-active');
  modalBg.classList.add('bg-active');
}
highscoreClose.addEventListener('click', closeHighscore);


// RENDER WORD ON SCREEN
var wordElement = document.getElementById('word');

// play modal
var playBtn = document.getElementById('play-btn');

function displayWord() {
  modalBg.classList.remove('bg-active');
  // this starts the game so we would render the game here and reset the word
  wordElement.textContent = blankWord;
}
playBtn.addEventListener('click', startGame);

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

// finish modal
// dont need an open, finish will be opened at end of the game by
var finishBtn = document.querySelector('.finish-btn');
var finishBg = document.querySelector('.modal-finish-bg');
var yesChoice = document.getElementById('yes');
var noChoice = document.getElementById('no');
var finishHighscore = document.getElementById('finishHighscore');

function handleYes() {
  resetGame();
  startGame();

  finishBg.classList.remove('bg-active');
}
yesChoice.addEventListener('click', handleYes);


function handleNo() {
  finishBg.classList.remove('bg-active');
  modalBg.classList.add('bg-active');
}
noChoice.addEventListener('click', handleNo);

function handleHighscore() {
  finishBg.classList.remove('bg-active');
  renderHighscore();
  highscoreBg.classList.add('bg-active');
}
finishHighscore.addEventListener('click', handleHighscore);

function openFinish() {
  finishBg.classList.add('bg-active');
}
finishBtn.addEventListener('click', openFinish);


// INSTANTIATE NEW PLAYER
function submitHandler(e) {
  e.preventDefault();

  var user = e.target.username.value;
  var score = 99999;
  var player = new Player(user, score);
  storeHighScore();
  renderHighscore();
  finishBg.classList.remove('bg-active');
  highscoreBg.classList.add('bg-active');


}

var container = document.getElementById('userHighscore');
container.addEventListener('submit', submitHandler);


// ------ STORE HIGH SCORE -------
function storeHighScore() {
  var stringifiedScores = JSON.stringify(highscoreList);
  localStorage.setItem('scoresData', stringifiedScores);
}

//  ---------------- OBJECT CONSTRUCTOR ---------------
function Player(name, score) {
  this.name = name;
  this.score = score;
  highscoreList.push(this);
}

// ------------------- SORTS HIGH SCORE FUNCTION --------------
function sortHighScore() {
  highscoreList.sort(function (a, b) {
    return b.score - a.score;
  });
}

// ------------------- UPDATE HIGH SCORE LIST -------------------
function updateHighScoresList() {
  sortHighScore();
  while (topScores.length !== 0) {
    topScores.shift();
  }

  for (var i = 0; i < 10; i++) {
    topScores.push(highscoreList[i]);
  }

  highscoreEl.innerHTML = '';
  for (var i = 0; i < topScores.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${topScores[i].name}: ${topScores[i].score}`;
    highscoreEl.appendChild(li);
  }
}

// ------------------- RETRIEVE HIGHSCORES -----------------------
var highscoreEl = document.getElementById('highscores');
var retrievedData = localStorage.getItem('scoresData');

function renderHighscore() {
  if (retrievedData) {
    var parsedRetrievedData = JSON.parse(retrievedData);
    highscoreList = parsedRetrievedData;
  } else {
    for (var i = 0; i < randomNames.length; i++) {
      new Player(randomNames[i], scores[i]);
    }

    updateHighScoresList();
  }
  storeHighScore();
}

// -------------- GENERATING RANDOM WORD --------------------

function randomWord() {
  return Math.floor(Math.random() * words.length);
}

function setBlankWord(word) {
  for (var i = 0; i < word.length; i++) {
    if (word[i] === ' ') {
      blankWord += ' ';
    } else {
      blankWord += '_';
    }
  }
}

function openEndModal() {
  finishBg.classList.add('bg-active');
}

// ---------------- THIS IS HOW YOU GUESS A LETTER -----------------------

var finishStatementEl = document.getElementById('finishStatement');
function guessedLetter(guess) {

  for (var i = 0; i < currentWord.length; i++) {
    if (guess === currentWord.charAt(i)) { // rudolph => _ _ _ _ _ _ _ // guess = r
      blankWord = blankWord.split(''); // rudolph = ['r','u','d']
      blankWord[i] = guess;
      blankWord = blankWord.join('');
      correct = true;
      currentUserScore += 100;
      scoreEl.textContent = `Score: ${currentUserScore}`;
      // turn letter green
    }

    // WIN LOGIC -------------
    if (blankWord === currentWord && chances > 0) {
      finishStatementEl.textContent = 'You Win!';
      openEndModal();
    }
  }

  if (!correct) {
    // turn letter red
    chances--;
    bodyPart++;
    renderBodyParts();
    chanceEl.textContent = `${chances} / 7`;
  }

  // LOSE LOGIC ---------------
  if (blankWord !== currentWord && chances === 0) {
    finishStatementEl.textContent = 'You Lose!';
    openEndModal();
  }
  // resets to false for the next guess
  correct = false;
}

// ------------------- DISPLAY CHANCES --------------------
var chanceEl = document.getElementById('chance');
chanceEl.textContent = `${chances} / 7`;

// ------------------- DISPLAY SCORE ------------------------
var scoreEl = document.getElementById('score');
scoreEl.textContent = `Score: ${currentUserScore}`;

// ------------------- DISPLAY BODY PARTS -----------------
var gameBackground = document.getElementById('game-container');
function renderBodyParts() {
  if (bodyPart === 1) {
    gameBackground.style.backgroundImage = 'url("../santa/1.jpg")';
  } else if (bodyPart === 2) {
    gameBackground.style.backgroundImage = 'url("../santa/2.jpg")';
  } else if (bodyPart === 3) {
    gameBackground.style.backgroundImage = 'url("../santa/3.jpg")';
  } else if (bodyPart === 4) {
    gameBackground.style.backgroundImage = 'url("../santa/4.jpg")';
  } else if (bodyPart === 5) {
    gameBackground.style.backgroundImage = 'url("../santa/5.jpg")';
  } else if (bodyPart === 6) {
    gameBackground.style.backgroundImage = 'url("../santa/6.jpg")';
  } else if (bodyPart === 7) {
    gameBackground.style.backgroundImage = 'url("../santa/7.jpg")';
  }
}

// -------------- CREATE LETTERS AND DISPLAY ON HTML --------------------
// THIS WORKS AND RENDERS ON SCREEN; HARD CODED VALUE

var letterExampleA = document.querySelector('.A');
letterExampleA.addEventListener('click', guessA);
function guessA() {
  var correctGuess = guessedLetter('a');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessA);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}


var letterExampleB = document.querySelector('.B');
letterExampleB.addEventListener('click', guessB);
function guessB() {
  var correctGuess = guessedLetter('b');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessB);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleC = document.querySelector('.C');
letterExampleC.addEventListener('click', guessC);
function guessC() {
  var correctGuess = guessedLetter('c');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click',guessC);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleD = document.querySelector('.D');
letterExampleC.addEventListener('click', guessD);
function guessD() {
  var correctGuess = guessedLetter('d');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click',guessD);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleE = document.querySelector('.E');
letterExampleC.addEventListener('click', guessE);
function guessE() {
  var correctGuess = guessedLetter('e');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click',guessE);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}


var letterExampleF = document.querySelector('.F');
letterExampleF.addEventListener('click', guessF);
function guessF() {
  var correctGuess = guessedLetter('f');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click',guessF);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleG = document.querySelector('.G');
letterExampleG.addEventListener('click', guessG);
function guessG() {
  var correctGuess = guessedLetter('g');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessG);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}


var letterExampleH = document.querySelector('.H');
letterExampleH.addEventListener('click', guessH);
function guessH() {
  var correctGuess = guessedLetter('h');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessH);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleI = document.querySelector('.I');
letterExampleI.addEventListener('click', guessI);
function guessI() {
  var correctGuess = guessedLetter('i');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessI);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleJ = document.querySelector('.J');
letterExampleJ.addEventListener('click', guessJ);
function guessJ() {
  var correctGuess = guessedLetter('j');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessJ);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleK = document.querySelector('.K');
letterExampleK.addEventListener('click', guessK);
function guessK() {
  var correctGuess = guessedLetter('k');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessK);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleL = document.querySelector('.L');
letterExampleL.addEventListener('click', guessL);
function guessL() {
  var correctGuess = guessedLetter('l');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessL);
  displayWord();
}

function handleClicks(e) {
  console.log(e);
  console.log(this);
}

var letterExampleM = document.querySelector('.M');
letterExampleM.addEventListener('click', guessM);
function guessM() {
  var correctGuess = guessedLetter('m');
  if(correctGuess){
    letterExampleM.style.backgroundColor = 'green';
  }else{
    letterExampleM.style.backgroundColor = 'red';
  }
  letterExampleM.removeEventListener('click', guessM);
  displayWord();
}
function handleClicks(e){
  console.log(e);
  console.log(this);
}
var letterExampleN = document.querySelector('.N');
letterExampleN.addEventListener('click', guessN);
function guessN() {
  var correctGuess = guessedLetter('n');
  if(correctGuess){
    letterExampleN.style.backgroundColor = 'green';
  }else{
    letterExampleN.style.backgroundColor = 'red';
  }
  letterExampleN.removeEventListener('click', guessN);
  displayWord();
}
function handleClicks(e){
  console.log(e);
  console.log(this);
}
var letterExampleO = document.querySelector('.O');
letterExampleO.addEventListener('click', guessO);
function guessO() {
  var correctGuess = guessedLetter('o');
  if(correctGuess){
    letterExampleO.style.backgroundColor = 'green';
  }else{
    letterExampleO.style.backgroundColor = 'red';
  }
  letterExampleO.removeEventListener('click', guessO);
  displayWord();
}
function handleClicks(e){
  console.log(e);
  console.log(this);
}
var letterExampleP = document.querySelector('.P');
letterExampleP.addEventListener('click', guessP);
function guessP() {
  var correctGuess = guessedLetter('p');
  if(correctGuess){
    letterExampleP.style.backgroundColor = 'green';
  }else{
    letterExampleP.style.backgroundColor = 'red';
  }
  letterExampleP.removeEventListener('click', guessP);
  displayWord();
}
function handleClicks(e){
  console.log(e);
  console.log(this);
}

var letterExampleQ = document.querySelector('.Q');
letterExampleQ.addEventListener('click', guessQ);
function guessQ() {
  guessedLetter('q');
  displayWord();
}
var letterExampleR = document.querySelector('.R');
letterExampleR.addEventListener('click', guessR);
function guessR() {
  guessedLetter('r');
  displayWord();
}
var letterExampleS = document.querySelector('.S');
letterExampleS.addEventListener('click', guessS);
function guessS() {
  guessedLetter('s');
  displayWord();
}
var letterExampleT = document.querySelector('.T');
letterExampleT.addEventListener('click', guessT);
function guessT() {
  guessedLetter('t');
  displayWord();
}
var letterExampleU = document.querySelector('.U');
letterExampleU.addEventListener('click', guessU);
function guessU() {
  guessedLetter('u');
  displayWord();
}
var letterExampleV = document.querySelector('.V');
letterExampleV.addEventListener('click', guessV);
function guessV() {
  guessedLetter('v');
  displayWord();
}
var letterExampleW = document.querySelector('.W');
letterExampleW.addEventListener('click', guessW);
function guessW() {
  guessedLetter('w');
  displayWord();
}
var letterExampleX = document.querySelector('.X');
letterExampleX.addEventListener('click', guessX);
function guessX() {
  guessedLetter('x');
  displayWord();
}
var letterExampleY = document.querySelector('.Y');
letterExampleY.addEventListener('click', guessY);
function guessY() {
  guessedLetter('y');
  displayWord();
}

var letterExampleZ = document.querySelector('.Z');
letterExampleZ.addEventListener('click', guessZ);
function guessZ() {

  guessedLetter('z');

  var correctGuess = guessedLetter('z');
  if (correctGuess) {
    letterExampleZ.style.backgroundColor = 'green';
  } else {
    letterExampleZ.style.backgroundColor = 'red';
  }
  letterExampleZ.removeEventListener('click', guessZ);

  displayWord();
}

//  ---------------- RESET GAME --------------------
function resetGame() {
  chances = 7;
  currentUserScore = 0;
  blankWord = '';
  // timeLeft = 90;
  currentWord = words[randomWord()];
  bodyPart = 0;
  gameBackground.style.backgroundImage = 'url("../santa/0.jpg")';
  scoreEl.textContent = `Score: ${currentUserScore}`;
  chanceEl.textContent = `${chances} / 7`;
}

// ---------------- GAME START -----------------
function startGame() {
  renderHighscore();
  resetGame();
  setBlankWord(currentWord);
  displayWord();
  // startTimer() STRETCH GOAL;
}




// STRETCH GOALS ------------------------------------

// PHRASE CHOICE -------------------------------
// RENDER PHRASE ON SCREEN
// var pressPhrase = document.querySelector('.phrase-btn');
// pressPhrase.addEventListener('click', displayPhrase);

// function displayPhrase() {
//   modalBg.classList.remove('bg-active');
//   playBg.classList.remove('bg-active');
//   wordElement.textContent = blankPhrase;
// }




// DIFFERENT WAY OF RENDERING LETTERS --------------------------
// var letters = 'abcdefghijklmnopqrstuvwxyz'.split(''); // 'a', 'b', 'c', 'd'...]
// var letterContainer = document.getElementById('letters');
// for (var i = 0; i < letters.length; i++){
//   var span = document.createElement('span');
//   span.textContent = letters[i];
//   letterContainer.appendChild(span);
// }



// TIMER ----------------
// var timeLeft = 92;

// function startTimer() {
//   setInterval(function () {
//     timeLeft--;

//     if (timeLeft >= 0) {
//       var timeEl = document.getElementById('timer');
//       timeEl.textContent = timeLeft;
//     }

//     if (timeLeft === 0) {
//       finishStatementEl.textContent = 'You Lose!';
//       openEndModal();
//     }
//   }, 1000);
// }