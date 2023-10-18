// Declare variables
let players = [];
let roundNumber = 1;
let attemptNumber = 0;
let roundPoints = 3;
let gamePoints = 0;
let answer = '';
let question = '';
let object = '';
let scoreP1 = 0;
let scoreP2 = 0;
let scoreP3 = 0;
let scoreP4 = 0;

// Get number of players, add them to the game arena and start the game
function getPlayers(numPlayers) {
    let playerNameInput = document.getElementById('player-names');
    buildArena(numPlayers);
    // activePlayer(numPlayers);
    startGame();
}

// Create the game arena with an active player and scores for the waiting players
function buildArena(numPlayers) {
    let playerArea = document.getElementById('players');

    // Display the stage for the active player, with question and answer input
    let stage = `<div class="player" id="active-player">
    <h2>Round ${roundNumber}</h2>
    <h3>Active Player</h3>
   <div id="question"></div>
    <div id="result"></div>
    <input type="text" id="guess" placeholder="Insert answer here">
    <button type="submit" onclick="checkAnswer(document.getElementById('guess').value)">Submit answer</button>
    </div>`;

    playerArea.insertAdjacentHTML('beforeend', stage);

    // Create holding places for non-active players, displaying their score
    for (let i = 0; i < numPlayers; i++) {
        let backstage = `<div class="player" id="player-${i + 1}">
        <h2>Player ${i + 1} score</h2>
       <div id="score-P${i + 1}" class="score"></div>
        </div>`;

        playerArea.insertAdjacentHTML('beforeend', backstage);
        getScores(i + 1)
    }

}

// Collect scores

function getScores(num) {
    let scoreP1div = document.getElementById('score-P1');
    let scoreP2div = document.getElementById('score-P2');
    let scoreP3div = document.getElementById('score-P3');
    let scoreP4div = document.getElementById('score-P4');

    if (num === 1) {
        scoreP1div.innerHTML = `${scoreP1}`
    } else if (num === 2) {
        scoreP2div.innerHTML = `${scoreP2}`
    } else if (num === 3) {
        scoreP3div.innerHTML = `${scoreP3}`
    } else if (num === 4) {
        scoreP4div.innerHTML = `${scoreP4}`
    }
}

// Select a question and answer from the array
function startGame() {
    let questionNumber = randomNumber(objectList.length);
    question = objectList[questionNumber];
    answer = objectList[questionNumber].name;
    getQuestion(questionNumber);
    console.log(`The answer is ${answer}`);
}

// Loop through players and make them active for their turn
function activePlayer(numPlayers) {
    for (let i = 0; i < numPlayers; i++) {
        console.log(`Active player ${i + 1}`);
        let currentPlayerStage = document.getElementById(`player-${i + 1}`);
        currentPlayerStage.classList = "player active-player";
        let questionDiv = document.createElement('div');
        questionDiv.id = "question";
        currentPlayerStage.getElementsByTagName('h2')[0].insertAdjacentHTML('afterend', questionDiv);
        let resultDiv = document.createElement('div');
        resultDiv.id = "result";
        questionDiv.insertAdjacentElement('afterend', resultDiv);
    }
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
function checkAnswer(guess) {
    let resultDiv = document.getElementById('result');
    console.log(guess, answer)
    guess = guess.toLowerCase();

    if (guess === answer && attemptNumber < 3) {
        resultDiv.style.backgroundColor = "green";
        resultDiv.innerHTML = `You win! ${roundPoints} points!`;
        console.log("winner")
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
        } else if (attemptNumber == 3) {
            resultDiv.innerHTML = `The answer is ${answer}. Better luck next time. ${roundPoints} points.`
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
    }
]