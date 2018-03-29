// Declare main variables
let firstCard;
let secondCard;

// Create game object
const game = {
    numClick: 0,
    match: 0,
    moves: 0
}

// Create a list that holds the cards 
const cards = ["images/ezra.jpg", "images/hera.jpg","images/thrawn.jpg","images/kanan.jpg", "images/zeb.jpg", "images/chopper2.jpg", "images/sabine.jpg", "images/ahsoka.jpg"];
const doppelCards = cards.concat(cards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Select the cards images
const cardImage = document.querySelectorAll('.card-img');

// Star Rating
const starOne = document.getElementById('star-one');
const starTwo = document.getElementById('star-two');
const starThree = document.getElementById('star-three');
const starsTotal = document.querySelector('#starsTotal');

// Update moves count and set star rating accordingly
const trackMoves = document.querySelector('.moves');
function setMoves() {
    for (let i = 0; i < cardImage.length; i++) {
        cardImage[i].addEventListener('click', function(){
            choose(i);
            trackMoves.innerHTML = game.moves;
            if (game.moves > 0 && game.moves <= 16) {
                starsTotal.textContent = 3;
            } else if (game.moves >= 16 && game.moves <= 24) {
              starOne.setAttribute('style', 'display: none');
              starsTotal.textContent = 2;
            } else if (game.moves > 24) {
              starTwo.setAttribute('style', 'display: none');
              starsTotal.textContent = 1;
            }
        });
    }
}

// Check when card is clicked
function choose(card) {
    if (game.numClick === 0) {
      firstCard = card;
      document.images[card].src = doppelCards[card];
      game.numClick = 1;
    } else if (game.numClick === 1) {
      game.numClick = 2;
      game.moves++;  // update number of moves only after two cards are clicked on
      secondCard = card;
      document.images[card].src = doppelCards[card];
      timer = setInterval(control, 1000);
    } else {
      return;
    }
  }

// Check if cards match
let divsCard = document.querySelectorAll('.card');
function control() {
    clearInterval(timer);  // add time before the cards flip if not matched
    game.numClick = 0;
    if (doppelCards[secondCard] === doppelCards[firstCard]) {     
      game.match++;
      divsCard[secondCard].classList.add('pulse');  // add "pulse" animation
      divsCard[firstCard].classList.add('pulse');  // add "pulse" animation
      divsCard[secondCard].setAttribute('style', 'pointer-events: none');  // disable click on open cards
      divsCard[firstCard].setAttribute('style', 'pointer-events: none');  // disable click on open cards
      if (game.match === 8) {
        stopTime = 1;
        modal.style.display = "block";  // display congratulations modal with score stats
        let matchRecap = document.querySelector('#match-recap');
        matchRecap.innerHTML = "Congratulations! You found all the pairs in " + mins + "m and " + secs + "s" + ", with a total of " + game.moves + " moves! \nYour rating is " + starsTotal.textContent + "!";
      }
    } else {
      document.images[firstCard].src = "images/holocron.jpg";
      document.images[secondCard].src = "images/holocron.jpg";
      return;
    }
  }
  setMoves();

// Shuffle cards
shuffle(doppelCards);

// Select restart button and start new game
const restart = document.querySelectorAll('.restart');
for (let i = 0; i < restart.length; i++) {
    restart[i].addEventListener('click', function(){
        location.reload();  // refresh the current page 
    });
}

const countUpTimer = document.querySelector(".timer");
let secs = 0;
let mins = 0;
let stopTime = 0;

document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
        if (stopTime !== 1) {
            secs++;
            if (secs === 60) {
                mins++;
                secs = 0;
            }
            countUpTimer.innerHTML = mins + "m" + " " + ":" + " " + secs + "s";
        }
    }, 1000);
});

/* Modal, source: https://www.w3schools.com/howto/howto_css_modals.asp */
// Get the modal
const modal = document.getElementById("congratsModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Display match recap 
const matchRecap = document.querySelector('#match-recap');
