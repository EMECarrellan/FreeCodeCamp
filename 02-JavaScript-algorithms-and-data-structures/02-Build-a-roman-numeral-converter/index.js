const $ = (el) => document.querySelector(el)

const $number = $("#number")
const $convertBtn = $("#convert-btn")
const $output = $("#output")

let One = ""
let Four = ""
let Five = ""
let Nine = ""
let result = ""
let inputNumber = ""

const regex = /^[-1-9]\d*$/

$convertBtn.onclick = function()
{
    event.preventDefault()
    result = ""
    if ($number.value === '' || !regex.test($number.value))
        $output.innerText = "Please enter a valid number"
    else if ($number.value <= 0)
        $output.innerText = "Please enter a number greater than or equal to 1"
    else if ($number.value >= 4000)
        $output.innerText = "Please enter a number less than or equal to 3999"
    else {
            inputNumber = $number.value
            while (inputNumber.length > 0)
            {
                result = conversion(inputNumber)
                inputNumber = inputNumber.slice(1)
            }
    }
}

const numChecker = (num) => {
    if (num.length == 4) {
        One = "M"
    } else if (num.length == 3) {
        One = "C"
        Four = "CD"
        Five = "D"
        Nine = "CM"

    } else if (num.length == 2) {
        One = "X"
        Four = "XL"
        Five = "L"
        Nine = "XC"
    }
    else {
        One = "I"
        Four = "IV"
        Five = "V"
        Nine = "IX"
    }
}

const conversion = (num) => {
    numChecker(num)
    if (num.charAt(0) <= 3)
    {
        for (let i = 0; i < num.charAt(0); i++)
            result += One
    }
    else if (num.charAt(0) == 4)
        result += Four
    else if (num.charAt(0) < 9)
    {
        result += Five
        for (let i = 5; i < parseInt(num.charAt(0), 10); i++)
            result += One
    }
    else if (num.charAt(0) == 9)
        result += Nine
    return $output.innerText = result
}
