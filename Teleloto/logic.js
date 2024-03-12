function generateTicket() {
    clearGridStyle();
    let ticket = [];
    for (let i = 0; i < 5; i++) {
        let numbers = Array.from({length: 15}, (_, j) => j + 1 + 15 * i);
        for (let j = 0; j < 5; j++) {
            let index = Math.floor(Math.random() * numbers.length);
            ticket.push(numbers[index]);
            grid[i * 5 + j].innerHTML = numbers[index];
            numbers.splice(index, 1);
        }
    }
    // ticket = ticket[0].map((_, i) => ticket.map(row => row[i])); // Transponuotas 2D masyvas
    return ticket;
}

function generateRoll(n) {
    clearGridStyle();
    let roll = [];
    let numbers = Array.from({length: 75}, (_, i) => i + 1);
    const rollContainer = document.querySelector(".balls");
    rollContainer.innerHTML = "";
    for (let i = 0; i < n; i++) {
        let ball = document.createElement("span");
        let index = Math.floor(Math.random() * numbers.length); // math.random() -> nuo 0 iki 0.(9) 
        let num = numbers[index];
        numbers.splice(index, 1);

        roll.push(num);
        ball.innerHTML = num;
        let colorIndex = Math.floor(num / 15);
        switch(colorIndex) {
            case 0:
                ball.classList.add("M");
                break;
            case 1:
                ball.classList.add("J");
                break;
            case 2:
                ball.classList.add("R");
                break;
            case 3:
                ball.classList.add("G");
                break;
            case 4:
                ball.classList.add("Ž");
                break;
            case 5:
                ball.classList.add("Ž");
                break;
        }
        rollContainer.appendChild(ball);
    }
    return roll;
}

function printTicket(ticket) {
    console.log("Bilietas:");
    console.log("   M     J     R     G     Ž   ");
    for (let i = 0; i < 5; i++) {
        let row = "|";
        for (let j = 0; j < 5; j++) {
            row += " " + String(ticket[j * 5 + i]).padStart(3) + " |";
        }
        console.log(row);
    }
}

function initiateGrid() {
    let grid = [];
    for (let i = 0; i < 5; i++) {
        line = document.createElement("span");
        for (let j = 0; j < 5; j++) {
            let id = j * 5 + i;
            let element = document.createElement("span");
            element.dataset.id = id;
            line.appendChild(element);
            grid[id] = element;
        }
        document.querySelector("#board").appendChild(line);
    }
    return grid;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
    const inputField = document.querySelector('#control [type="number"]');
    let num = parseInt(inputField.value);
    if (isNaN(num)) {
        alert("įveskite bandymų kiekį.")
        return;
    }
    const resultTab = document.querySelector("#results"); 
    for(let i = 0; i < num; i++) {
        roll = generateRoll(48);
        if (checkWin()) { // jackpot
            for(let item of grid) item.classList.add("jackpot");
            inputField.value = num - i+1;
            break;
        }
        bandymuSk += 1;
        resultTab.querySelector(".try-amount").innerHTML = bandymuSk;
        inputField.value -= 1;
        if (timeToSleep !== 0) {
            await sleep(timeToSleep);
        }
    }
    inputField.value = "";
}

function clearGridStyle() {
    for (let item of grid) {
        item.classList.remove("matches");
    }
}

function checkWin() {
    let matching = new Array(25).fill(false);
    const rollTrysAstuoni = roll.slice(0,38);

    let answer = {
        "corner": false,
        "line": false,
        "cross": true
    }

    for (let i = 0; i < 25; i++){
        if(rollTrysAstuoni.includes(ticket[i])) {
            matching[i] = true;
            grid[i].classList.add("matches");
        }  
    } 

    if(matching[0] && matching[4] && matching[20] && matching[24]) {
        corner += 1;
    }

    let lineCount = 0;
    for(let i = 0; i < 5; i++) {
        let matches = matching[i] && matching[i+5] && matching[i+10] && matching[i+15] && matching[i+20];
        if(matches) lineCount += 1;
    }

    if (lineCount > 0) {
        lines += 1;
        if(lineCount === 5) {
            corner += 1;
            lines += 1;
            cross += 1;
            return true; // jackpot
        }
    }

    cross += 1;
    for(let i = 0; i < 5; i++) {
        if(!matching[i + i * 5] || !matching[25 - ((i+1) * 5 - i)]) {
            cross -= 1;
            break;
        }
    }
}

let roll;
const grid = initiateGrid();
let ticket = generateTicket();
let timeToSleep = 0;
let bandymuSk = 0, corner = 0, lines = 0, cross = 0, jack = 0;
start();