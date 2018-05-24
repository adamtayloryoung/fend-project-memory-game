
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

 function clickShow(e){
    if(e.target && e.target.nodeName == 'LI'){
        if(e.target !== currentlyOpen[0]){
        e.target.classList.add('open');
        e.target.classList.add('show');
        currentlyOpen.push(e.target);
            if(currentlyOpen.length == 2){
                evaluateCards();
            }
        }
    }
};

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

function cardsMatch(){
    for(i=0; i < currentlyOpen.length; i++){
        currentlyOpen[i].classList.add('match');
    }
    currentlyOpen = [];
    matches = matches + 1;
    if(matches === 8 && moves < 10){
        console.log('3 star performance');
    } else if (matches === 8 && moves < 15){
        console.log('2 star performance');
    } else if (matches === 8 && moves < 20){
        console.log('1 star performance')
    } else if (matches === 8 && moves > 20) {
        console.log('no stars for you.')
    }
}


function cardsDontMatch(){
    for(i=0; i < currentlyOpen.length; i++){
        currentlyOpen[i].classList.toggle('open');
        currentlyOpen[i].classList.toggle('show');
    }
    currentlyOpen = [];
}

cardDeck.addEventListener('click', clickShow); 
restartButton.addEventListener('click', restartGame);

