// Declare main variables
let numClick = 0;
let match = 0;
let firstCard;
let secondCard;

// Create a list that holds the cards
let cards = [];

// Link images to array index
cards[0] = "images/ezra.jpg";
cards[1] = "images/ezra.jpg";
cards[2] = "images/hera.jpg";
cards[3] = "images/hera.jpg";
cards[4] = "images/thrawn.jpg";
cards[5] = "images/thrawn.jpg";
cards[6] = "images/kanan.jpg";
cards[7] = "images/kanan.jpg";
cards[8] = "images/zeb.jpg";
cards[9] = "images/zeb.jpg";
cards[10] = "images/chopper2.jpg";
cards[11] = "images/chopper2.jpg";
cards[12] = "images/sabine.jpg";
cards[13] = "images/sabine.jpg";
cards[14] = "images/ahsoka.jpg";
cards[15] = "images/ahsoka.jpg";

// Keep track of open cards
let openCards = [];

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
let cardImage = document.querySelectorAll('.card_img');

// Listen to number of times clicked and update "moves"
let moves = 0;
function setMoves() {
    for (let i = 0; i < cardImage.length; i++) {
        cardImage[i].addEventListener('click', function(){
            moves++;
            choose(i);
              // alternative to onclick event on cards (divs)
            document.querySelector('.moves').innerHTML = moves;
            return true;
        });
    }
}

// Check when card is clicked
function choose(card) {
    if (numClick === 0) {
      firstCard = card;
      document.images[card].src = cards[card];
      numClick = 1;
    } else if (numClick === 1) {
      numClick = 2;
      secondCard = card;
      document.images[card].src = cards[card];
      timer = setInterval(control, 1000);
    } else {
      alert("Patience, young Padawan");
    }
  }

// Check if cards match (must fix animation problem)
function control() {
    clearInterval(timer);
    numClick = 0;
    if (cards[secondCard] === cards[firstCard]) {
      match++;
       // add animation
      if (match === 8) {
        modal.style.display = "block"; // display congratulations modal with score stats
        let matchRecap = document.querySelector('#match-recap');
        matchRecap.innerHTML = "Congratulations! You found all the pairs in " + mins + "m and " + secs + "s" + ", with a total of " + moves + " moves!" ;
      }
    } else {
      document.images[firstCard].src = "images/holocron.jpg";
      document.images[secondCard].src = "images/holocron.jpg";
      return;
    }
  }
  setMoves();

// Store shuffle cards function in a variable (taken from Youtube tutorial)
let s;
s = shuffle(cards);

// Select restart button and start new game
let restart = document.querySelectorAll('.restart');
for (let i = 0; i < restart.length; i++) {
    restart[i].addEventListener('click', function(){
        moves = 0;
        document.querySelector(".moves").innerHTML = 0;
        let cardImage = document.querySelectorAll('.card_img');
        for (let i = 0; i < cardImage.length; i++) {
            cardImage[i].removeAttribute("src");
            cardImage[i].setAttribute("src", "images/holocron.jpg");
        }
        shuffle(cards);
        mins = 0;
        secs = - 1;
        modal.style.display = "none";
    });
}

// Star Rating


// Count-up Timer
let countUpTimer = document.querySelector(".timer");
let secs = - 1;
let mins = 0;
let stopTime = 0;

document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
        if (stopTime !== 1) {
            secs ++;
            if (secs === 60) {
                mins++;
                secs = 0;
            }
            countUpTimer.innerHTML = mins + "m" + " " + ":" + " " + secs + "s";
        }
    }, 1000);
});

/* Modals, source: https://www.w3schools.com/howto/howto_css_modals.asp */
// Get the modal
let modal = document.getElementById("congratsModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Display match recap 
let matchRecap = document.querySelector('#match-recap');
