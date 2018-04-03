// Create game object
const game = {
    numClick: 0,
    match: 0,
    moves: 0
}

// Create a list that holds the cards 
const cards = ["images/ezra.jpg", "images/hera.jpg", "images/thrawn.jpg", "images/kanan.jpg", "images/zeb.jpg", "images/chopper2.jpg", "images/sabine.jpg", "images/ahsoka.jpg"];
const doppelCards = [...cards, ...cards]; // double the array with ES6

// Declare main variables
let firstCard = doppelCards[0];
let secondCard = doppelCards[1];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
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
const starsTotal = document.querySelector('#starsTotal');

// Create initGame() function
const initGame = () => {
    // Update moves count and set star rating accordingly
    const trackMoves = document.querySelector('.moves');

    function setMoves() {
        for (let i = 0; i < cardImage.length; i++) {
            cardImage[i].addEventListener('click', function () {
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

    // Check when cards are clicked
    function choose(card) {
        if (game.numClick === 0) {
            firstCard = card;
            cardImage[card].src = doppelCards[card];
            game.numClick = 1;
        } else if (game.numClick === 1) {
            game.numClick = 2;
            game.moves++; // update number of moves only after two cards are clicked on
            secondCard = card;
            cardImage[card].src = doppelCards[card];
            timer = setInterval(control, 1000);
        } else {
            return;
        }
    }

    // Check if cards match
    const divsCard = document.querySelectorAll('.card');

    function control() {
        clearInterval(timer); // add time before the cards flip if not matched
        game.numClick = 0;
        if (doppelCards[secondCard] === doppelCards[firstCard] && firstCard !== secondCard) {  // avoid matching same card by clicking twice on the same one
            game.match++;
            divsCard[secondCard].classList.add('pulse'); // add "pulse" animation
            divsCard[firstCard].classList.add('pulse'); // add "pulse" animation
            divsCard[secondCard].setAttribute('style', 'pointer-events: none'); // disable click on open cards
            divsCard[firstCard].setAttribute('style', 'pointer-events: none'); // disable click on open cards
            if (game.match === 8) {
                modal.style.display = "block"; // display congratulations modal with score stats
                const matchRecap = document.querySelector('#match-recap');
                matchRecap.innerHTML = "Congratulations! You found all the pairs in " + mins + "m and " + secs + "s" + ", with a total of " + game.moves + " moves! \nYour rating is " + starsTotal.textContent + "!";
                stopTime = 1;
            }
        } else {
            cardImage[firstCard].src = "images/holocron.jpg";
            cardImage[secondCard].src = "images/holocron.jpg";
            return;
        }
    }
    setMoves();
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
    // Shuffle cards
    shuffle(doppelCards);
}

// Select restart button and start new game
const restart = document.querySelectorAll('.restart');
for (let i = 0; i < restart.length; i++) {
    restart[i].addEventListener('click', function () {
        refresh(); // refresh the current page 
    });
}

// Create refresh function
function refresh() {
    secs = 0;
    mins = 0;
    stopTime = 0;
    game.moves = 0;
    game.match = 0;  // Reinitialize game logic
    const trackMoves = document.querySelector('.moves');
    trackMoves.innerHTML = 0;
    starsTotal.textContent = 3;
    starOne.setAttribute('style', 'display: inline-block');
    starTwo.setAttribute('style', 'display: inline-block');
    game.numClick = 0;
    for (let i = 0; i < cardImage.length; i++) {
        cardImage[i].setAttribute('src', 'images/holocron.jpg');
    }
    shuffle(doppelCards);
    modal.style.display = 'none';
    const divsCard = document.querySelectorAll('.card');
    for (let i = 0; i < divsCard.length; i++) {
        divsCard[i].setAttribute('style', 'pointer-events: auto');
        divsCard[i].classList.remove('pulse');
    }
}

// Select timer
const countUpTimer = document.querySelector(".timer");
let secs = 0;
let mins = 0;
let stopTime = 0;

// Initialize game on document ready
document.addEventListener('DOMContentLoaded', initGame);

/* Modal, source: https://www.w3schools.com/howto/howto_css_modals.asp */
// Get the modal
const modal = document.getElementById("congratsModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Display match recap 
const matchRecap = document.querySelector('#match-recap');