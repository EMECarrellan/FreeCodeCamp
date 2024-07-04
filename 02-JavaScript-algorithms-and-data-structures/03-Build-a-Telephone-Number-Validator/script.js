const $ = el => document.querySelector(el)

const $checkBtn = $("#check-btn")
const $clearBtn = $("#clear-btn")
const $userInput = $("#user-input")
const $resultsDiv = $("#results-div")

const regex = /^(?:1\s?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/

const numberChecker = num => {
    if (regex.test(num)) {
        $resultsDiv.innerText = `Valid US number: ${num}`
    }

    else if ($userInput.value === "") {
        alert("Please provide a phone number")
    } else {
        $resultsDiv.innerText = `Invalid US number: ${num}`
    }
}

$checkBtn.onclick = e => {
    e.preventDefault()

    numberChecker($userInput.value)
}

$clearBtn.onclick = e => {
    e.preventDefault()
    $userInput.value = ""
    $resultsDiv.innerText = ""
}

$userInput.onkeypress = e => {
    if (e.key === "Enter")
    {
        e.preventDefault()
        numberChecker($userInput.value)

        if ($userInput.value === "") {
            alert("Please provide a phone number")
        }
    }
}