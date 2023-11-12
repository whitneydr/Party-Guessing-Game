

const objectList = [
    {
        "name": "book",
        "prompt": "Although this thing has a spine\nIt doesn’t have a face\nAlthough it is not clothing\nIt gets stored in a case",
        "hintOne": "It's made of paper",
        "hintTwo": "Could be full of facts, could be full of fiction",
        "category": ["household", "school", "hobbies"]
    },
    {
        "name": "key",
        "prompt": "Sometimes to get inside a door\nAll you need to do is knock\nOther times you will need this thing\nSo the door you can unlock",
        "hintOne": "Often made of metal",
        "hintTwo": "Opens other things besides doors",
        "category": ["household","car"]
    },
    {
        "name": "toilet",
        "prompt": "If you’re sitting on me\nThen paper you will need\nI’m always getting flushed\nWhen you have pooped or peed",
        "hintOne": "My nickname is John",
        "hintTwo": "If you don't clean me, I stink",
        "category": ["household"]
    }
]

console.log(objectList[0].category[1]);

function findCategory(cat) {
    objectList.forEach(object => object.category.filter(object.category == cat))
}

console.log(findCategory("car"));


// getPlayers with names
function getPlayers(numPlayers) {
    let playerNameInput = document.getElementById('player-names');
    let inputIds = [];
    /* for (let i=0; i < numPlayers; i++) {
        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.placeholder = `Player ${i+1} name`;
        newInput.id = `player-name-${i+1}`;
        playerNameInput.insertAdjacentElement('beforeend', newInput);
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.innerText = "Submit";
        submitBtn.id = "submit-players";
        newInput.insertAdjacentElement('afterend', submitBtn);
    } */
    buildArena(numPlayers);
    startGame();
}

export { objectList };