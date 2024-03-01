

// Declare variables

let players = [];
let roundNumber = 1;
let currentPlayer = 0;
let roundScore = 3;
let answer = '';
let attemptNumber = 0;
let roundPoints = 3;

// Display form to collect player names

function getPlayers(num) {
    let numOfPlayers = parseInt(num);
    const playerNameForm = document.getElementById('player-names');

    const inputLabel = document.createElement("p");
    inputLabel.innerHTML = "<strong>Please enter the players' names below</strong>";
    playerNameForm.insertAdjacentElement('beforeend', inputLabel);

    // Generate input fields for collecting player names
    for (let i = 0; i < numOfPlayers; i++) {
        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.placeholder = `Player ${i + 1} name`;
        newInput.id = `player-name-${i + 1}`;
        newInput.className = "player-name";
        playerNameForm.insertAdjacentElement('beforeend', newInput);
    }

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.innerText = "Submit";
    submitBtn.id = "submit-players";
    submitBtn.setAttribute('onclick', 'collectNames()');
    playerNameForm.insertAdjacentElement('beforeend', submitBtn);
}

// Save player names to the players array
function collectNames() {
    let playerNameInputs = document.getElementsByClassName('player-name');
    for (let j = 0; j < playerNameInputs.length; j++) {
        console.log(playerNameInputs[j].value)
        players.push({ "playerName": playerNameInputs[j].value, "roundScore": 0, "gameScore": 0 })
    }
    console.log(players);
    hideElement(document.getElementById('game-setup'));
    startGame();
}


// Display the stage for the active player, with question and answer input
function setStage() {
    let playerArea = document.getElementById('players');

    let stage = `<div class="player" id="active-player">
                        <h2>Round ${roundNumber}</h2>
                        <h3>${players[currentPlayer].playerName}</h3>
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
function buildArena() {
    let playerArea = document.getElementById('players');

    let backstageDiv = document.createElement('div');
    backstageDiv.id = 'backstage';

    const scoreboard = document.getElementById('backstage');

    // Update player scores
    if (scoreboard) {
        scoreboard.remove();
        playerArea.insertAdjacentElement('afterend', backstageDiv);
     } else {
         playerArea.insertAdjacentElement('afterend', backstageDiv);
    }

    // Create holding places for non-active players, displaying their score
    for (let i = 0; i < players.length; i++) {
        let backstage = `<div class="player" id="player-${i + 1}">
                            <h2>${players[i].playerName}'s score</h2>
                            <div id="score-P${i + 1}" class="score">${players[i].gameScore}</div>
                         </div>`;
                         backstageDiv.insertAdjacentHTML('beforeend', backstage);
    }
}

// Start game
function startGame() {
    setStage();
    buildArena();
    let questionNumber = randomNumber(objectList.length);
    question = objectList[questionNumber];
    answer = objectList[questionNumber].name;
    getQuestion(questionNumber);
    console.log(`The answer is ${answer}`);
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
    if (attemptNumber <= 3) {
        if (guess === answer) {
            resultDiv.style.backgroundColor = "green";
            resultDiv.innerHTML = `You win! ${roundPoints} points!`;
            players[currentPlayer].gameScore += roundPoints;
            players[player].roundScore += roundPoints;
            console.log(`${players[player].playerName} answered correctly. ${players[player].roundScore} this round. ${players[player].gameScore} this game.`)
            currentPlayer++;
            roundPoints = 3;
            attemptNumber = 0;
            if (currentPlayer < players.length) {
                startGame();
            } else {
                // roundNumber++;
                // currentPlayer = 0;
                // startGame();
                nextRound();
            }

        } else if (guess != answer) {
            console.log("Attempt number " + attemptNumber);
            roundPoints--;
            attemptNumber++;
            resultDiv.style.backgroundColor = "red";

            if (attemptNumber == 1) {
                resultDiv.innerHTML = `Try again. Here's a hint 1: ${question.hintOne}`;
                console.log(`Wrong. Attempt number ${attemptNumber}`);
            } else if (attemptNumber == 2) {
                resultDiv.innerHTML = `Try again. Here's a hint 2: ${question.hintTwo}`;
                console.log(`Wrong again. Attempt number ${attemptNumber}`);
            } else if (attemptNumber == 3) {
                resultDiv.innerHTML = `The answer is ${answer}. Better luck next time. ${roundPoints} points.`;

                // nextRound();
                // roundNumber++;
                currentPlayer++;
                attemptNumber = 0;
                roundPoints = 3;
                // startGame();

                if (currentPlayer < players.length) {
                    startGame();
                } else {
                    nextRound();
                }
            }
    }
    }
}


function nextRound() {
    if (roundNumber < 3) {
        roundNumber++;
        currentPlayer = 0;
        attemptNumber = 0;
        roundPoints = 3;
        startGame();
    } else {
        gameOver();
    }
    
}

function nextPlayer() {
    if (currentPlayer < players.length-1) {
        currentPlayer++;
        attemptNumber = 0;
        roundPoints = 3;
        startGame();
    } else {
        nextRound();
    }

}

function gameOver() {
    let playerStage = document.getElementById('players');
    playerStage.className = "hide";
    let round = document.getElementById('round');
    round.style.display = 'flex';
    round.innerHTML = `<h2>Game Over</h2>
    <button onclick="location.reload()">Restart game</button>`;
    buildArena();
}

function hideElement(div) {
    div.className = "hide";
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
    },
    {
        "name": "river",
        "prompt": "What runs, but never walks.<br>Murmurs, but never talks.<br>Has a bed, but never sleeps.<br>And has a mouth, but never eats?",
        "hintOne": "Be careful crossing, you could get swept away",
        "hintTwo": "It empties into the sea",
        "category": ["nature"]
    },
    {
        "name": "coffin",
        "prompt": "The person who makes it has no need of it;<br>the person who buys it has no use for it.<br>The person who uses it can neither see nor feel it.",
        "hintOne": "People are dying to get in",
        "hintTwo": "It's very underground",
        "category": ["objects"]
    },
    {
        "name": "mirror",
        "prompt": "If you drop me, I’m sure to crack,<br>but smile at me and I’ll smile back.",
        "hintOne": "Break me and you'll have seven years bad luck",
        "hintTwo": "I help you see what's behind you",
        "category": ["household"]
    }
];