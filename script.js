'use strict';

//selecting the score element
const colorForActive0 = document.querySelector('.player--0');
const colorForActive1 = document.querySelector('.player--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.getElementById('score--1');
const current0Ele = document.getElementById('current--0');
const current1Ele = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEle = document.querySelector('.dice');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  colorForActive0.classList.toggle('player--active');
  colorForActive1.classList.toggle('player--active');
};
//starting conditions
let playing, currentScore, activePlayer, score;

const reset = function () {
  score = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  // when game ends we should not be able to click any button
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0Ele.textContent = 0;
  current1Ele.textContent = 0;
  diceEle.classList.add('hidden');
  colorForActive0.classList.remove('player--winner');
  colorForActive1.classList.remove('player--winner');
  colorForActive1.classList.remove('player--active');
  colorForActive0.classList.add('player--active');
};

reset(); // initialisation conditions

btnRoll.addEventListener('click', function () {
  //lets the player not perform any action while clicking on the button
  if (playing) {
    //generating random number
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    //display the dice
    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${diceRoll}.png`;
    //check if dice is 1
    if (diceRoll !== 1) {
      //add dicescore to current score
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; //displays dice score to player score
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to the active players board
    score[activePlayer] += currentScore;
    //score[0]=score[0]+currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2.check if score >100 - finish the game
    if (score[activePlayer] >= 100) {
      playing = false; // no action on clicking button
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEle.classList.add('hidden');
    } else {
      //3 switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  reset();
});
