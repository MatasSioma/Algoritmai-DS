function generateTicket() {
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
    let roll = [];
    let numbers = Array.from({length: 75}, (_, i) => i + 1);
    const rollContainer = document.querySelector(".balls");
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

let grid = initiateGrid();
let ticket = generateTicket();
let roll = generateRoll(48);