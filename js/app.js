
//score variables
const moveCounter = document.querySelector('.moves');
const restartButton = document.querySelector('.restart');
const stars = document.querySelector('.stars');
const star1 = document.querySelector('.star1');
const star2 = document.querySelector('.star2');
const star3 = document.querySelector('.star3');
let starScore = 3;
const starOne = document.querySelector('.starOne');
const starTwo = document.querySelector('.starTwo');
const starThree = document.querySelector('.starThree');
//cards and marching variables 
const cardDeck = document.getElementById('cardDeck');
const $deck = $('.deck');
const deckArray = ['flask', 'paper-plane-o', 'tree', 'paw', 'cube', 'tree', 'leaf', 'bicycle', 'flask', 'bomb', 'leaf', 'bomb', 'paw', 'bicycle', 'paper-plane-o', 'cube'];
let allCards = [];
let currentlyOpen = [];
let moves = 0;
let matches = 0;
//timer variables
let displayTime = document.querySelector('.displayTime');
let interval;
let seconds = 0;
let minutes = 0;
//modal variables
const modalWindow = document.querySelector('.bg-modal');
const playAgain = document.querySelector('.playAgain');


//shuffles and deals cards, ensures timer is set to 0
function setUpGame(){
    modalWindow.style.display = "none";
    allCards = shuffle(deckArray);
    for(let i=0; i < allCards.length; i++){
    $deck.append('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>');
    }
    moves = 0;
    moveCounter.textContent = moves;
    clearTimer();
}

setUpGame();

// resets game
function restartGame(){
    for(i = 0; i < 16; i++){
        cardDeck.firstElementChild.remove();
    }
    stopTimer();
    clearTimer();
    setUpGame();
    resetScore();
}

function resetScore(){
    starScore = 3;
    star1.style.color = "gold";
    star2.style.color = "gold";
    star3.style.color = "gold";
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

//on click card will flip and push to currentlyOpen array. 
//if currentlyOpen contains 2 cards evaluateCards runs.
//if this is the first move, the timer will stars running on the first click.
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

// if the cards match, 'match' class is activated using cardsMatch()
//if cards do not match, 'open' and 'show' are toggled off with cardsDontMatch()
//evaluate cards also steps the moves counter and changes star rating
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

//
function starRating(){
    if(moves > 10){
        star1.style.color = 'black';
        starScore = 2;
    }
    if (moves > 15){
        star2.style.color = 'black';
        starScore = 1;
    }
    if (moves > 20) {
        stars.style.color = 'black';
        starScore = 0;

    }
}

//functions to start timer using setInterval
//stop timer using clearInterval
//clear timer by reseting interface
function runTimer(){
    seconds = 0;
    minutes = 0;
    interval = setInterval(()=> {
        displayTime.innerHTML = minutes + " mins " + seconds + " secs  ";
        seconds++;
        if (seconds == 60){
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(interval);
}

function clearTimer(){
    minutes = 0;
    seconds = 0;
    displayTime.innerHTML = minutes + " mins " + seconds + " secs  " ;
}

//modal window is hidden on the begining of game. After matches == 8, endGame runs & modal becomes visible
//first modal is prepped using prepModal function
function prepModal(){
    const finalMoves = document.querySelector('.finalMoves');
    const endMins = document.querySelector('.endMins');
    const endSecs = document.querySelector('.endSecs');
    const endStars = document.querySelector('.endStars');
    endStars.textContent = starScore;
    finalMoves.textContent = moves;
    endMins.textContent = minutes;
    endSecs.textContent = seconds;
}


function endGame(){
    stopTimer();
    prepModal();
    modalWindow.style.display = "flex";
}



//event handlers

cardDeck.addEventListener('click', clickShow); 
restartButton.addEventListener('click', restartGame);
playAgain.addEventListener('click', restartGame);
