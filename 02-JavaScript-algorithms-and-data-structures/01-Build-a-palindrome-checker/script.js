const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

const reverseString = (str) => {
    const cleanString = regexString(str);
    return cleanString.split("").reverse().join("");
}

const regexString = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, "")
}

checkBtn.addEventListener("click", () => {
    const inputValue = textInput.value;
    const reversedValue = reverseString(inputValue);

    if (inputValue.length <= 0) {
        alert("Please input a value");
    } else if
        (inputValue.length > 0 && regexString(inputValue.toLowerCase()) === reversedValue.toLowerCase()) {
        result.innerText = `${inputValue} is a palindrome`;
        } else {
            result.innerText = `${inputValue} is not a palindrome`;
        }
})