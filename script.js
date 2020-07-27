let equal = false
let action = true

//All Number action
let number = document.getElementsByClassName("number")
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function() {
        if (equal == true) {
            resetCalculator()
            equal = false
        }
        let plainText = reverseNumberFormate(document.getElementById("output-value").innerText + number[i].id)
        let numberValue = Number(plainText)
        let currentValue = document.getElementById("output-value")
        currentValue.innerText = getString(numberValue) //numberValue always should be a number
        action = true
    })
}

//All operator action
let operator = document.getElementsByClassName('operator')
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function() {
        if (operator[i].id == "backspace") {
            let value = getNumber()
            let update;
            if (value[value.length - 2] == ",") {
                update = value.substring(0, value.length - 2)
            } else {
                update = value.substring(0, value.length - 1)
            }
            document.getElementById("output-value").innerText = update
        } else if (operator[i].id == "clear") {
            resetCalculator()
        } else if (operator[i].id == "=") {
            printHistory(operator[i].id)
            let history = getHistory()
            let lastExpSign = history[history.length - 1]
            if (lastExpSign == "+" || lastExpSign == "-" || lastExpSign == "*" || lastExpSign == "/" || lastExpSign == "%") {
                document.getElementById("history-value").innerText = history.substring(0, history.length - 1)
            }
            let expression = reverseNumberFormate(getHistory())
            let result = eval(expression)
            document.getElementById("output-value").innerText = getString(result)
            equal = true

        } else if (operator[i].id == "%") {
            percentValue = reverseNumberFormate(getNumber()) / 100
            document.getElementById("history-value").innerText = getHistory() + percentValue
            document.getElementById("output-value").innerText = ""

        } else {
            if (action == false) {
                let history = getHistory()
                let updateHistory = history.substring(0, history.length - 1)
                document.getElementById("history-value").innerText = updateHistory
            }
            printHistory(operator[i].id)
            action = false;
        }
    })
}

function getString(num) {
    let aa = num.toLocaleString("en")
    return aa;
}

function getHistory() {
    return document.getElementById("history-value").innerText
}

function printHistory(sign) {
    if (sign == "=" || sign == "clear" || sign == "backspace") {
        sign = ""
    }
    document.getElementById("history-value").innerText = getHistory() + getNumber() + sign
    document.getElementById("output-value").innerText = ""
}

function getNumber() {
    return document.getElementById("output-value").innerText
}

function resetCalculator() {
    document.getElementById("history-value").innerText = ""
    document.getElementById("output-value").innerText = ""
}

function reverseNumberFormate(num) {
    return num.replace(/,/g, "");
}