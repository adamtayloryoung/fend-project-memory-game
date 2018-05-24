/*
 * Create a list that holds all of your cards
 */
const cardDeck = document.getElementById('cardDeck');
const $deck = $('.deck');
const deckArray = ['flask', 'paper-plane-o', 'tree', 'paw', 'cube', 'tree', 'leaf', 'bicycle', 'flask', 'bomb', 'leaf', 'bomb', 'paw', 'bicycle', 'paper-plane-o', 'cube'];
const movesCounter = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');
let allCards = [];
let currentlyOpen = [];
let moves = 0;
let matches = 0;


function setUpGame(){
    allCards = shuffle(deckArray);
    for(let i=0; i < allCards.length; i++){
    $deck.append('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>');
    }
}

setUpGame();

function restartGame(){
    for(i = 0; i < 16; i++){
        cardDeck.firstElementChild.remove();
    }
    moves = 0; 
    movesCounter.textContent = moves;
    setUpGame();
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function evaluateCards(){

    if(currentlyOpen[0].innerHTML == currentlyOpen[1].innerHTML){
        cardsMatch();
    } else {
        setTimeout(function(){
           cardsDontMatch(); 
        }, 700);
    }
    moves = moves + 1; 
    movesCounter.textContent = moves;
}
