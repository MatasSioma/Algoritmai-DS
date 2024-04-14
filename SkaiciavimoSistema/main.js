const base36Digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                      'U', 'V', 'W', 'X', 'Y', 'Z'];

function cleanAlphaNumeric(inputString) {
    // Remove all whitespace characters
    inputString = inputString.replace(/\s/g, '');
    // Regular expression to match only alphanumeric characters
    const regex = /^[^a-zA-Z0-9]?([^a-zA-Z0-9])*/g;
    // Replace unwanted characters with an empty string
    let cleanedString = inputString.replace(regex, '').toUpperCase();;

    if (inputString.startsWith("-")) cleanedString = "-" + cleanedString;
    return cleanedString;
}

function baseToBase(inBase, inNum, outBase) {
    inNum = cleanAlphaNumeric(inNum);

    let negative = false;
    if(inNum.startsWith("-")) {
        negative = true;
        inNum = inNum.slice(1);
    }

    if(inNum == "") return "";
    if(inNum == "0") return 0;

    const baseNDigits = base36Digits.slice(0, inBase);

    let inArray = [];
    inNum = inNum.split("").reverse().join("");
    for (let char of inNum) {
        let index = baseNDigits.indexOf(char);
        if(index == -1) {
            alert("Skaičius ir jo skaičiavimo sistema nesutampa. Arba bandote įvesti ne sveikąjį sk.");
            throw "Skaičius ir jo skaičiavimo sistema nesutampa. Arba bandote įvesti ne sveikąjį sk.";
        }
        inArray.push(index);
    }

    let decimalNum = 0;
    inArray.forEach((char, i) => decimalNum += char * Math.pow(inBase, i));

    let outIndexArray = [];
    while(true) {
        outIndexArray.push(decimalNum % outBase);
        decimalNum = Math.floor(decimalNum / outBase);
        // console.log(outIndexArray, decimalNum);

        if(decimalNum == 0) break;
    }

    let outNum = "";
    outIndexArray.reverse().forEach(char => outNum += base36Digits[char])

    if (negative) outNum = '-' + outNum;
    return outNum;
}
const baseFields = document.querySelectorAll('select');
const numFields = document.querySelectorAll('input[type="text"]');

baseFields.forEach((field, i) => {
    let opp = 1;
    if(i == 1) {opp = 0;}

    field.addEventListener("change", (event) => {
        numFields[opp].value = baseToBase(event.target.value, numFields[i].value, baseFields[opp].value);
    })
})

numFields.forEach((field, i) => {
    let opp = 1;
    if(i == 1) {opp = 0;}
    field.addEventListener("change", (event) => {
        numFields[opp].value = baseToBase(baseFields[i].value, event.target.value, baseFields[opp].value);
    })
})