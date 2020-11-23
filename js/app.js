'use strict';

var words = [
  'tis the season',
  'deck the halls',
  'merry christmas',
  'sleigh bells ring',
  'rudolph the rednose raindeer',
  'merry christmas you filthy animal',
  'baby its cold outside',
  'ol saint nick',
  'a christmas miracle',
  'jack frost',
  'christmas tree',
  'home for the holidays',
  'meet me under the mistletoe',
  'walking in a winter wonderland',
  'winter is coming'
];

var blankWord = '';
var currentWord;
var chances = 7;
var correct = false;
var returnValue;
var bodyPart = 0;
var topScores = [];
var timeLeft = 60;


// WRONG AUDIO
var wrongAudio = [new Audio(), new Audio(), new Audio()];
wrongAudio[0].src = '../soundfx/wrong1.mp3';
wrongAudio[1].src = '../soundfx/wrong2.mp3';
wrongAudio[2].src = '../soundfx/wrong3.mp3';

// CORRECT AUDIO
var correctAudio = [new Audio(), new Audio()];
correctAudio[0].src = '../soundfx/correct1.mp3';
correctAudio[1].src = '../soundfx/correct2.mp3';

// WIN AND LOSE AUDIO
var endingAudio = [new Audio(), new Audio()];
endingAudio[0].src = '../soundfx/win.mp3';
endingAudio[1].src = '../soundfx/lose.mp3';

// ------------------- DISPLAY SCORE RESULTS  ------------------------
var finalScoreEl = document.getElementById('finalScore');
var answerEl = document.getElementById('answer');

// --------------------- HARDCODED HIGH SCORE ENTRIES ------------------------
var scores = [100, 500, 600, 400, 300, 400, 600, 115, 630, 900];
var randomNames = ['Rudolph', 'Papa Elf', 'Mrs. Clause', 'Jack Skellignton', 'Corpse Bride', 'Hercules', 'Mushu', 'Olaf', 'Elsa', 'Sven'];
var highscoreList = [];
var currentUserScore = 0;

var wordElement = document.getElementById('word');
var playBtn = document.getElementById('play-btn');

// -------------- MODAL -----------------
// --------------------- opening modal ---------------------
// var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-front-bg');

// --------------------- MADE TO TOGGLE MODAL FOR TESTING PURPOSES ---------------------
// function openModal() {
//   wrongAudio[randomNumber(wrongAudio)].play();
// }
// modalBtn.addEventListener('click', openModal);

// --------------------- highscore modal ---------------------
var highscoreBtn = document.getElementById('highscore-btn');
var highscoreBg = document.querySelector('.modal-highscore-bg');
var highscoreClose = document.querySelector('.modal-highscore-close');

function openHighscores() {
  modalBg.classList.add('bg-none');
  renderHighscore();
  highscoreBg.classList.add('bg-active');
}
highscoreBtn.addEventListener('click', openHighscores);

function closeHighscore() {
  highscoreBg.classList.remove('bg-active');
  modalBg.classList.remove('bg-none');
}
highscoreClose.addEventListener('click', closeHighscore);

// --------------------- play modal ---------------------

function displayWord() {
  wordElement.textContent = blankWord;
}

// --------------------- how to play modal ---------------------
var howToPlayBtn = document.getElementById('howToPlay-btn');
var howToPlayBg = document.querySelector('.modal-howToPlay-bg');
var howToPlayClose = document.querySelector('.modal-howToPlay-close');

function openHowToPlay() {
  modalBg.classList.add('bg-none');
  howToPlayBg.classList.add('bg-active');
}
howToPlayBtn.addEventListener('click', openHowToPlay);

function closehowToPlay() {
  modalBg.classList.remove('bg-none');
  howToPlayBg.classList.remove('bg-active');
}
howToPlayClose.addEventListener('click', closehowToPlay);

//  --------------------- ending modal ---------------------
// var finishBtn = document.querySelector('.finish-btn');
var finishBg = document.querySelector('.modal-finish-bg');
// var yesChoice = document.getElementById('yes');
var noChoice = document.getElementById('no');

// function handleYes() {
//   resetGame();
//   startGame();
//   modalBg.classList.remove('bg-none');
//   finishBg.classList.remove('bg-active');
// }
// yesChoice.addEventListener('click', handleYes);

function handleNo() {
  finishBg.classList.remove('bg-active');
  modalBg.classList.remove('bg-none');
}
noChoice.addEventListener('click', handleNo);

// function openFinish() {
//   finishBg.classList.add('bg-active');
// }
// finishBtn.addEventListener('click', openFinish);

// --------------------- INSTANTIATE NEW PLAYER ---------------------
function submitHandler(e) {
  e.preventDefault();

  var user = e.target.username.value;
  var score = generateScore(timeLeft, currentUserScore);
  var player = new Player(user, score);
  updateHighScoresList();
  storeHighScore();
  modalBg.classList.remove('bg-none');
  finishBg.classList.remove('bg-active');
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

  // DELETES EVERYTHING IN CURRENT TOP SCORES ARRAY
  while (topScores.length !== 0) {
    topScores.shift();
  }

  // ADDS NEWLY SORTED HIGH SCORE LIST
  for (var i = 0; i < 10; i++) {
    topScores.push(highscoreList[i]);
  }

  // CLEARS OUT UL
  // CREATES LI FOR EACH HIGH SCORE
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
  }
}

// -------------- GENERATING RANDOM WORD --------------------

function randomNumber(array) {
  return Math.floor(Math.random() * array.length);
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

// ---------------- GENERATE SCORE -------------------
function generateScore(time){
  var totalScore;
  if (chances === 0 || timeLeft === 0){
    totalScore = currentUserScore;
  } else {
    totalScore = (time * 100) + currentUserScore;
  }
  return totalScore;
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
      displayWord();
      returnValue = true;
    }

    // --------------------- WIN LOGIC --------------------- 
    if (blankWord === currentWord && chances > 0) {
      finishStatementEl.textContent = 'You Win!';
      myStopFunction();
      answerEl.textContent = `The Answer was: "${currentWord}"`;
      finalScoreEl.textContent = `Total Score: (${timeLeft} * 100) + ${currentUserScore} = ${generateScore(timeLeft, currentUserScore)}`;
      openEndModal();
      endingAudio[0].play();
    }
  }

  if (!correct) {
    chances--;
    bodyPart++;
    renderBodyParts();
    chanceEl.textContent = `${chances} / 7`;
    displayWord();
    returnValue = false;
  }

  // --------------------- LOSE LOGIC ---------------------
  if (blankWord !== currentWord && chances === 0) {
    finishStatementEl.textContent = 'You Lose!';
    myStopFunction();
    answerEl.textContent = `The Answer was: "${currentWord}"`;
    finalScoreEl.textContent = `Total Score: ${currentUserScore}`;
    openEndModal();
    endingAudio[1].play();
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

// FOR GITHUB
// function renderBodyParts() {
//   if (bodyPart === 1) {
//     gameBackground.style.backgroundImage = 'url("https://jennerdulce.github.io/santa-hangman/santa/1.jpg")';
//   } else if (bodyPart === 2) {
//     gameBackground.style.backgroundImage = 'url("https://jennerdulce.github.io/santa-hangman/santa/2.jpg")';
//   } else if (bodyPart === 3) {
//     gameBackground.style.backgroundImage = 'url("https://jennerdulce.github.io/santa-hangman/santa/3.jpg")';
//   } else if (bodyPart === 4) {
//     gameBackground.style.backgroundImage = 'url("https://jennerdulce.github.io/santa-hangman/santa/4.jpg")';
//   } else if (bodyPart === 5) {
//     gameBackground.style.backgroundImage = 'url("https://jennerdulce.github.io/santa-hangman/santa/5.jpg")';
//   } else if (bodyPart === 6) {
//     gameBackground.style.backgroundImage = 'url("https://jennerdulce.github.io/santa-hangman/santa/6.jpg")';
//   } else if (bodyPart === 7) {
//     gameBackground.style.backgroundImage = 'url("https://jennerdulce.github.io/santa-hangman/santa/7.jpg")';
//   }
// }


// -------------- CREATE LETTERS AND DISPLAY ON HTML --------------------
var letterExampleA = document.querySelector('.A');
letterExampleA.addEventListener('click', guessA);
function guessA() {
  guessedLetter('a');
  if (returnValue) {
    letterExampleA.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleA.style.backgroundColor = 'red';
  }
  letterExampleA.removeEventListener('click', guessA);
}

var letterExampleB = document.querySelector('.B');
letterExampleB.addEventListener('click', guessB);
function guessB() {
  guessedLetter('b');
  if (returnValue) {
    letterExampleB.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleB.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleB.removeEventListener('click', guessB);
}

var letterExampleC = document.querySelector('.C');
letterExampleC.addEventListener('click', guessC);
function guessC() {
  guessedLetter('c');
  if (returnValue) {
    letterExampleC.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleC.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleC.removeEventListener('click',guessC);
}

var letterExampleD = document.querySelector('.D');
letterExampleD.addEventListener('click', guessD);
function guessD() {
  guessedLetter('d');
  if (returnValue) {
    letterExampleD.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleD.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleD.removeEventListener('click',guessD);
}

var letterExampleE = document.querySelector('.E');
letterExampleE.addEventListener('click', guessE);
function guessE() {
  guessedLetter('e');
  if (returnValue) {
    letterExampleE.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleE.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleE.removeEventListener('click',guessE);
}

var letterExampleF = document.querySelector('.F');
letterExampleF.addEventListener('click', guessF);
function guessF() {
  guessedLetter('f');
  if (returnValue) {
    letterExampleF.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleF.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleF.removeEventListener('click',guessF);
}

var letterExampleG = document.querySelector('.G');
letterExampleG.addEventListener('click', guessG);
function guessG() {
  guessedLetter('g');
  if (returnValue) {
    letterExampleG.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleG.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleG.removeEventListener('click', guessG);
}

var letterExampleH = document.querySelector('.H');
letterExampleH.addEventListener('click', guessH);
function guessH() {
  guessedLetter('h');
  if (returnValue) {
    letterExampleH.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleH.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleH.removeEventListener('click', guessH);
}

var letterExampleI = document.querySelector('.I');
letterExampleI.addEventListener('click', guessI);
function guessI() {
  guessedLetter('i');
  if (returnValue) {
    letterExampleI.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleI.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleI.removeEventListener('click', guessI);
}

var letterExampleJ = document.querySelector('.J');
letterExampleJ.addEventListener('click', guessJ);
function guessJ() {
  guessedLetter('j');
  if (returnValue) {
    letterExampleJ.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleJ.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleJ.removeEventListener('click', guessJ);
}

var letterExampleK = document.querySelector('.K');
letterExampleK.addEventListener('click', guessK);
function guessK() {
  guessedLetter('k');
  if (returnValue) {
    letterExampleK.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleK.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleK.removeEventListener('click', guessK);
}

var letterExampleL = document.querySelector('.L');
letterExampleL.addEventListener('click', guessL);
function guessL() {
  guessedLetter('l');
  if (returnValue) {
    letterExampleL.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleL.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleL.removeEventListener('click', guessL);
}

var letterExampleM = document.querySelector('.M');
letterExampleM.addEventListener('click', guessM);
function guessM() {
  guessedLetter('m');
  if(returnValue){
    letterExampleM.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  }else{
    letterExampleM.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleM.removeEventListener('click', guessM);
}

var letterExampleN = document.querySelector('.N');
letterExampleN.addEventListener('click', guessN);
function guessN() {
  guessedLetter('n');
  if(returnValue){
    letterExampleN.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  }else{
    letterExampleN.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleN.removeEventListener('click', guessN);
}

var letterExampleO = document.querySelector('.O');
letterExampleO.addEventListener('click', guessO);
function guessO() {
  guessedLetter('o');
  if(returnValue){
    letterExampleO.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  }else{
    letterExampleO.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleO.removeEventListener('click', guessO);
}

var letterExampleP = document.querySelector('.P');
letterExampleP.addEventListener('click', guessP);
function guessP() {
  guessedLetter('p');
  if(returnValue){
    letterExampleP.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  }else{
    letterExampleP.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleP.removeEventListener('click', guessP);
}

var letterExampleQ = document.querySelector('.Q');
letterExampleQ.addEventListener('click', guessQ);
function guessQ() {
  guessedLetter('q');
  if (returnValue) {
    letterExampleQ.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleQ.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  // letterExampleQ.removeEventListener('click');
  letterExampleQ.removeEventListener('click',guessQ);
}

var letterExampleR = document.querySelector('.R');
letterExampleR.addEventListener('click', guessR);
function guessR() {
  guessedLetter('r');
  if (returnValue) {
    letterExampleR.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleR.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleR.removeEventListener('click',guessR);
}

var letterExampleS = document.querySelector('.S');
letterExampleS.addEventListener('click', guessS);
function guessS() {
  guessedLetter('s');
  if (returnValue) {
    letterExampleS.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleS.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleS.removeEventListener('click',guessS);
}

var letterExampleT = document.querySelector('.T');
letterExampleT.addEventListener('click', guessT);
function guessT() {
  guessedLetter('t');
  if (returnValue) {
    letterExampleT.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleT.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleT.removeEventListener('click',guessT);

}

var letterExampleU = document.querySelector('.U');
letterExampleU.addEventListener('click', guessU);
function guessU() {
  guessedLetter('u');
  if (returnValue) {
    letterExampleU.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleU.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleU.removeEventListener('click',guessU);
}

var letterExampleV = document.querySelector('.V');
letterExampleV.addEventListener('click', guessV);
function guessV() {
  guessedLetter('v');
  if (returnValue) {
    letterExampleV.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleV.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleV.removeEventListener('click',guessV);
}

var letterExampleW = document.querySelector('.W');
letterExampleW.addEventListener('click', guessW);
function guessW() {
  guessedLetter('w');
  if (returnValue) {
    letterExampleW.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleW.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleW.removeEventListener('click',guessW);
}

var letterExampleX = document.querySelector('.X');
letterExampleX.addEventListener('click', guessX);
function guessX() {
  guessedLetter('x');
  if (returnValue) {
    letterExampleX.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleX.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleX.removeEventListener('click',guessX);
}

var letterExampleY = document.querySelector('.Y');
letterExampleY.addEventListener('click', guessY);
function guessY() {
  guessedLetter('y');
  if (returnValue) {
    letterExampleY.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleY.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleY.removeEventListener('click',guessY);
}

var letterExampleZ = document.querySelector('.Z');
letterExampleZ.addEventListener('click', guessZ);
function guessZ() {
  guessedLetter('z');
  if (returnValue) {
    letterExampleZ.style.backgroundColor = 'green';
    correctAudio[randomNumber(correctAudio)].play();
  } else {
    letterExampleZ.style.backgroundColor = 'red';
    wrongAudio[randomNumber(wrongAudio)].play();
  }
  letterExampleZ.removeEventListener('click',guessZ);
}

//  ---------------- RESET BUTTONS --------------------
function resetButtons(){
  for(var i = 0; i < arrayLetters.length; i++){
    arrayLetters[i].style.backgroundColor = '';
    arrayLetters[i].addEventListener('click', arrayGuess[i]);
  }
}

var arrayLetters = [
  letterExampleA, letterExampleB, letterExampleC, letterExampleD,letterExampleE, letterExampleF, letterExampleG, letterExampleH, letterExampleI, letterExampleJ, letterExampleK, letterExampleL, letterExampleM, letterExampleN, letterExampleO, letterExampleP, letterExampleQ, letterExampleR, letterExampleS, letterExampleT, letterExampleU, letterExampleV, letterExampleW, letterExampleX, letterExampleY, letterExampleZ
];

var arrayGuess = [guessA, guessB, guessC, guessD, guessE, guessF,guessG, guessH, guessI, guessJ,guessK, guessL, guessM, guessN, guessO, guessP, guessQ, guessR, guessS,guessT, guessU, guessV, guessW, guessX, guessY, guessZ];

//  ---------------- RESET GAME --------------------
function resetGame() {
  resetButtons();
  chances = 7;
  currentUserScore = 0;
  blankWord = '';
  currentWord = words[randomNumber(words)];
  bodyPart = 0;
  gameBackground.style.backgroundImage = 'url("../santa/0.jpg")';
  answerEl.textContent = '';
  finalScoreEl.textContent = '';
  scoreEl.textContent = `Score: ${currentUserScore}`;
  chanceEl.textContent = `${chances} / 7`;
  timeLeft = 60;
}

// ---------------- GAME START -----------------
renderHighscore();
updateHighScoresList();
storeHighScore();
retrievedData = localStorage.getItem('scoresData');
function startGame() {
  resetGame();
  setBlankWord(currentWord);
  displayWord();
  modalBg.classList.add('bg-none');
  startTimer();
}
playBtn.addEventListener('click', startGame);


// --------------------- DIFFERENT WAY OF RENDERING LETTERS --------------------------
// OR USE OF OBJECT CONSTRUCTOR?
// var letters = 'abcdefghijklmnopqrstuvwxyz'.split(''); // 'a', 'b', 'c', 'd'...]
// var letterContainer = document.getElementById('letters');
// for (var i = 0; i < letters.length; i++){
//   var span = document.createElement('span');
//   span.textContent = letters[i];
//   letterContainer.appendChild(span);
// }



// --------------------- TIMER ---------------------

var myVar;
function startTimer() {
  myVar = setInterval(function () {
    timeLeft--;

    if (timeLeft >= 0) {
      var timeEl = document.getElementById('timer');
      timeEl.textContent = timeLeft;
    }

    if (timeLeft === 0) {
      finishStatementEl.textContent = 'You Lose!';
      myStopFunction();
      openEndModal();
    }
  }, 1000);
}

function myStopFunction() {
  clearTimeout(myVar);
}
