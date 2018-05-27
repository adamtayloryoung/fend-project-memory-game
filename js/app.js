
const cardDeck = document.getElementById('cardDeck');
const $deck = $('.deck');
const deckArray = ['flask', 'paper-plane-o', 'tree', 'paw', 'cube', 'tree', 'leaf', 'bicycle', 'flask', 'bomb', 'leaf', 'bomb', 'paw', 'bicycle', 'paper-plane-o', 'cube'];
const moveCounter = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');
const modalWindow = document.querySelector('.bg-modal');
const playAgain = document.querySelector('.playAgain');
const stars = document.querySelector('.stars');
const star1 = document.querySelector('.star1');
const star2 = document.querySelector('.star2');
const star3 = document.querySelector('.star3');
let allCards = [];
let currentlyOpen = [];
let moves = 0;
let matches = 0;
let displayTime = document.querySelector('.displayTime');
let interval;
let seconds = 0;
let minutes = 0;

function setUpGame(){
    modalWindow.style.display = "none";
    allCards = shuffle(deckArray);
    for(let i=0; i < allCards.length; i++){
    $deck.append('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>');
    }
    moves = 0;
    moveCounter.textContent = moves;
}

setUpGame();

function restartGame(){
    for(i = 0; i < 16; i++){
        cardDeck.firstElementChild.remove();
    }
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
    if(moves < 1){
        runTimer();
    }
};

function evaluateCards(){

    if(currentlyOpen[0].innerHTML == currentlyOpen[1].innerHTML){
        setTimeout(function(){
            cardsMatch();
        }, 200);
    } else {
        setTimeout(function(){
           cardsDontMatch(); 
        }, 700);
    }

    moves = moves + 1;
    moveCounter.textContent = moves;
    starRating();
}

function cardsMatch(){
    for(i=0; i < currentlyOpen.length; i++){
        currentlyOpen[i].classList.add('match');
    }
    currentlyOpen = [];
    matches = matches + 1;
    if(matches === 8){
    endGame();
    }
}


function cardsDontMatch(){
    for(i=0; i < currentlyOpen.length; i++){
        currentlyOpen[i].classList.toggle('open');
        currentlyOpen[i].classList.toggle('show');
    }
    currentlyOpen = [];
}

function endGame(){
    modalWindow.style.display = "flex";
}

function starRating(){
    if(moves > 10){
        star1.style.color = 'black';
    }
    if (moves > 15){
        star2.style.color = 'black';
    }
    if (moves > 20) {
        stars.style.color = 'black';
    }
}

// function prepModal(){
//     document.querySelector('.finalMoves').textContent = moves;
//     document.querySelector('endStars').appendChild(stars);
// }

function runTimer(){
    interval = setInterval(()=> {
        displayTime.innerHTML = minutes + " mins " + seconds + " secs  ";
        seconds++;
        if (seconds == 60){
            minutes++;
            seconds = 0;
        }
    }, 1000);

    if(matches == 8){
        clearInterval(interval);
    }
}



cardDeck.addEventListener('click', clickShow); 
restartButton.addEventListener('click', restartGame);
playAgain.addEventListener('click', restartGame);
