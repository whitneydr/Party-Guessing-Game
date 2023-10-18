let players = [];
let roundNumber = 1;
let attemptNumber = 0;
let roundPoints = 3;
let gamePoints = 0;
let answer = 'fish';
let question = '';
let object = '';
let scoreP1 = 0;
let scoreP2 = 0;
let scoreP3 = 0;
let scoreP4 = 0;

function getPlayers(numPlayers) {
    let playerNameInput = document.getElementById('player-names');

    buildArena(numPlayers);
    // activePlayer(numPlayers);
    startGame();
}

function buildArena(numPlayers) {
    let playerArea = document.getElementById('players');
    
    for (let i = 0; i < numPlayers; i++) {
        let stage = `<div class="player" id="player-${i + 1}">
        <h2>Player ${i + 1}</h2>
       <div id="question"></div>
        <div id="result"></div>
        <input type="text" id="guess" placeholder="Insert answer here">
        <button type="submit" onclick="checkAnswer(document.getElementById('guess').value)">Submit answer</button>
        </div>`;


        playerArea.insertAdjacentHTML('beforeend', stage);
    }
}

function startGame() {
    let questionNumber = randomNumber(objectList.length);
    question = objectList[questionNumber];
    answer = objectList[questionNumber].name;
    getQuestion(questionNumber);
    console.log(`The answer is ${answer}`);
}

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



function randomNumber(num) {
    return Math.floor(Math.random() * num);
}

function getQuestion(num) {
    document.getElementById('question').innerHTML = objectList[num].prompt;
}

function checkAnswer(guess) {
    let resultDiv = document.getElementById('result');
    console.log(guess, answer)
    guess = guess.toLowerCase();
    if (guess === answer && attemptNumber < 3) {
        resultDiv.style.backgroundColor = "green";
        resultDiv.innerHTML = `You win! ${roundPoints} points!`
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

console.log(randomNumber(5));



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