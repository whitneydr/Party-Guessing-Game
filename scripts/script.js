// Declare variables
let players = [
    {
        "name": "Player 1",
        "roundScore": 0,
        "gameScore": 0
    },
    {
        "name": "Player 2",
        "roundScore": 0,
        "gameScore": 0
    },
    {
        "name": "Player 3",
        "roundScore": 0,
        "gameScore": 0
    },
    {
        "name": "Player 4",
        "roundScore": 0,
        "gameScore": 0
    }
];
let roundNumber = 1;
let attemptNumber = 0;
let roundPoints = 3;
let gamePoints = 0;
let answer = '';
let question = '';
let object = '';
let scoreP1 = players[0].gameScore;
let scoreP2 = players[1].gameScore;
let scoreP3 = players[2].gameScore;
let scoreP4 = players[3].gameScore;
let currentPlayer = 0;
let numOfPlayers = 0;


// Get number of players, add them to the game arena and start the game
function getPlayers(numPlayers) {
    let playerNameInput = document.getElementById('player-names');
    numOfPlayers = parseInt(numPlayers);
    launchGame();

    //  do {
    //     setStage();
    //      startGame();
    //      buildArena(numOfPlayers);
    //      console.log(currentPlayer, numOfPlayers);
    //         break;
    //  } while (currentPlayer < numOfPlayers-2)

    // for (let i=1; i < numPlayers-1; i++) {
    //     setStage();
    //     // activePlayer(numPlayers);
    //     startGame(); 
    //     buildArena(numOfPlayers);
    // } 

}

function launchGame() {
    setStage();
    startGame();
    buildArena(numOfPlayers);
}

// Display the stage for the active player, with question and answer input
function setStage() {
    let playerArea = document.getElementById('players');

    let stage = `<div class="player" id="active-player">
                        <h2>Round ${roundNumber}</h2>
                        <h3>${players[currentPlayer].name}</h3>
                        <div id="question"></div>
                        <div id="result"></div>
                        <input type="text" id="guess" placeholder="Insert answer here">
                        <button type="submit" onclick="checkAnswer(document.getElementById('guess').value, ${currentPlayer})">Submit answer</button>
                     </div>`;
    let activePlayer = document.getElementById('active-player');
    if (activePlayer) {
        activePlayer.remove();
        playerArea.insertAdjacentHTML('afterbegin', stage);
    } else {
        playerArea.insertAdjacentHTML('afterbegin', stage);
    }

}

// Create the game arena with an active player and scores for the waiting players
function buildArena(numPlayers) {
    let backstageDiv = document.getElementById('backstage');
    let playerArea = document.getElementById('players');
    

    // Create holding places for non-active players, displaying their score
    for (let i = 0; i < numPlayers; i++) {
        let backstage = `<div class="player" id="player-${i + 1}">
                            <h2>Player ${i + 1} score</h2>
                            <div id="score-P${i + 1}" class="score">${players[i].gameScore}</div>
                         </div>`;

         if (backstageDiv) {
            backstageDiv.remove();
             playerArea.insertAdjacentHTML('beforeend', backstage);
         } else {
             playerArea.insertAdjacentHTML('beforeend', backstage);
        }

        //playerArea.insertAdjacentHTML('beforeend', backstage);
    }

}

// Collect scores

function getScore(num) {
    return players[num].gameScore;
}

// function getScores(num) {
//     let scoreP1div = document.getElementById('score-P1');
//     let scoreP2div = document.getElementById('score-P2');
//     let scoreP3div = document.getElementById('score-P3');
//     let scoreP4div = document.getElementById('score-P4');

//     if (num === 1) {
//         scoreP1div.innerHTML = `${scoreP1}`
//     } else if (num === 2) {
//         scoreP2div.innerHTML = `${scoreP2}`
//     } else if (num === 3) {
//         scoreP3div.innerHTML = `${scoreP3}`
//     } else if (num === 4) {
//         scoreP4div.innerHTML = `${scoreP4}`
//     }
// }

// Select a question and answer from the array

function startGame() {
    let questionNumber = randomNumber(objectList.length);
    question = objectList[questionNumber];
    answer = objectList[questionNumber].name;
    getQuestion(questionNumber);
    console.log(`The answer is ${answer}`);
}

// Start the turn for the next player

function nextPlayer() {
    currentPlayer++;
    setStage();
    startGame();
}



// Generate a random number
function randomNumber(num) {
    return Math.floor(Math.random() * num);
}

// Collect question from array
function getQuestion(num) {
    document.getElementById('question').innerHTML = objectList[num].prompt;
}

// Check whether the given answer is correct
function checkAnswer(guess, player) {
    let resultDiv = document.getElementById('result');
    console.log(guess, answer)
    guess = guess.toLowerCase();
    if (attemptNumber < 3) {
        if (guess === answer) {
            resultDiv.style.backgroundColor = "green";
            resultDiv.innerHTML = `You win! ${roundPoints} points!`;
            players[currentPlayer].gameScore += roundPoints;
            players[player].roundScore += roundPoints;
            console.log(`${players[player].name} answered correctly. ${players[player].roundScore} this round. ${players[player].gameScore} this game.`)
            // currentPlayer++;
            roundPoints = 3;
            nextPlayer();
        } else if (guess != answer) {
            console.log("Attempt number " + attemptNumber);
            roundPoints--;
            attemptNumber++;
            resultDiv.style.backgroundColor = "red";

            if (attemptNumber == 1) {
                resultDiv.innerHTML = `Try again. Here's a hint 1: ${question.hintOne}`;
                console.log(`Attempt number ${attemptNumber}`)
            } else if (attemptNumber == 2) {
                resultDiv.innerHTML = `Try again. Here's a hint 2: ${question.hintTwo}`;
                console.log(`Attempt number ${attemptNumber}`)
            }
        } else if (attemptNumber == 3) {
            resultDiv.innerHTML = `The answer is ${answer}. Better luck next time. ${roundPoints} points.`
            // currentPlayer++;
            roundPoints = 3;
            nextPlayer();
        }
    }
}



// List of objects to be used for game questions
const objectList = [
    {
        "name": "book",
        "prompt": "Although this thing has a spine<br>It doesn’t have a face<br>Although it is not clothing<br>It gets stored in a case",
        "hintOne": "It's made of paper",
        "hintTwo": "Could be full of facts, could be full of fiction",
        "category": ["household", "school", "hobbies"]
    },
    {
        "name": "key",
        "prompt": "Sometimes to get inside a door<br>All you need to do is knock<br>Other times you will need this thing<br>So the door you can unlock",
        "hintOne": "Often made of metal",
        "hintTwo": "Opens other things besides doors",
        "category": ["household", "car"]
    },
    {
        "name": "toilet",
        "prompt": "If you’re sitting on me<br>Then paper you will need<br>I’m always getting flushed<br>When you have pooped or peed",
        "hintOne": "My nickname is John",
        "hintTwo": "If you don't clean me, I stink",
        "category": ["household"]
    },
    {
        "name": "paint",
        "prompt": "It might be worth wearing an apron<br>To keep your clothes nice and smart<br>So your brush doesn’t splash this on you<br>When making a piece of art",
        "hintOne": "Comes in many colours",
        "hintTwo": "It's not fun watching it dry",
        "category": ["household"]
    },
    {
        "name": "clock",
        "prompt": "I’m something that is often round<br>But I’m not a pizza base<br>I have hands but don’t have fingers<br>And have numbers on my face",
        "hintOne": "Right twice a day even when it's broken",
        "hintTwo": "Sometimes it chimes",
        "category": ["household"]
    },
    {
        "name": "map",
        "prompt": "I have cities, but no houses.<br>I have forests, but no trees.<br>I have water, but no fish.",
        "hintOne": "It helps you find your way",
        "hintTwo": "X marks the spot",
        "category": ["travel"]
    }
]