const base36Digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                      'U', 'V', 'W', 'X', 'Y', 'Z'];

function baseToBase(inBase, inNum, outBase) {
    let negative = false;
    if(inNum[0] == '-') {
        negative = true;
        inNum = inNum.slice(1);
    }

    const baseNDigits = base36Digits.slice(0, inBase);

    let inArray = [];
    inNum = inNum.split("").reverse().join("");
    for (let char of inNum) {
        let index = baseNDigits.indexOf(char);
        if(index == -1) {
            alert("Pasirinkta ne ta skaičiavimo sistema");
            throw "Pasirinkta ne ta skaičiavimo sistema";
        }
        inArray.push(base36Digits.indexOf(char));
    }

    let decimalNum = 0;
    inArray.forEach((char, i) => decimalNum += char * Math.pow(inBase, i));
    console.log(decimalNum);

    let outIndexArray = [];
    while(true) {
        outIndexArray.push(decimalNum % outBase);
        decimalNum = Math.floor(decimalNum / outBase);
        console.log(outIndexArray, decimalNum);

        if(decimalNum == 0) break;
    }

    let outNum = "";
    outIndexArray.reverse().forEach(char => outNum += base36Digits[char])

    if (negative) outNum = '-' + outNum;
    return outNum;
}