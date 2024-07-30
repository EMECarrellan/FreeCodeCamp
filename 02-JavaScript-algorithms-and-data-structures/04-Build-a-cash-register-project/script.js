let price = 1.00;
let cid = [ //change in drawer, borrar comentario al terminar
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn")
const changeDue = document.getElementById("change-due")
const total = document.getElementById("total")

total.textContent = `Total: $${price}`

purchaseBtn.onclick = e => {
    e.preventDefault()

    const change = (cash.value * 100 - price * 100)
    
    if (price > cash.value) {
        alert("Customer does not have enough money to purchase the item")
    } else if (price == cash.value) {
        changeDue.innerHTML = "No change due - customer paid with exact cash"
    } else {
        calculateChange(cid, change)
    }
}



const calculateChange = (cid, change) => {
    const denominations = [
        ['ONE HUNDRED', 10000],
        ['TWENTY', 2000],
        ['TEN', 1000],
        ['FIVE', 500],
        ['ONE', 100],
        ['QUARTER', 25],
        ['DIME', 10],
        ['NICKEL', 5],
        ['PENNY', 1]
    ];

    let totalCid = 0

    let cidInPennies = cid.map(([name, amount]) => [name, Math.round(amount * 100)]);
    cidInPennies.forEach(value => totalCid += value[1]);

    if (change > totalCid) {
        return changeDue.textContent = "Status: INSUFFICIENT_FUNDS"
    }
    
    let changeArray = []

    for (let [name, value] of denominations) {
        let amountInDrawer = cidInPennies.find(item => item[0] === name)[1]
        let amountToGive = 0;
        while (change >= value && amountInDrawer > 0) {
            change -= value
            amountInDrawer -= value
            amountToGive += value
        }
        if (amountToGive > 0) {
            changeArray.push([name, amountToGive / 100]);
            let originalIndex = cid.findIndex(item => item[0] === name);
            cid[originalIndex][1] -= amountToGive / 100;
        }
    }


    if (change > 0) {
        changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    } else if (changeArray.reduce((acc, curr) => acc + curr[1] * 100, 0) === totalCid) {
        changeDue.innerHTML = `<p>Status: CLOSED</p> ${changeArray.map(item => `<p>${item[0]}: $${item[1].toFixed(2)}</p>`).reverse().join(' ')}`;
    } else {
        changeDue.innerHTML = `<p>Status: OPEN</p> ${changeArray.map(item => `<p>${item[0]}: $${item[1].toFixed(2)}</p>`).reverse().join(' ')}`;
    }
}

// Cuando el cliente da dinero, la función calcula el cambio desde las unidades mayores, modifica los valores numéricos del array, retorna el cambio y lo pasa por pantalla