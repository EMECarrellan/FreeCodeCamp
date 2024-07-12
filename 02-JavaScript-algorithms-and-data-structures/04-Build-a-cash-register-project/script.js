let price = 1.86;
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

purchaseBtn.onclick = e => {
    e.preventDefault()

    const change = (cash.value * 100 - price * 100) / 100
    
    if (price > cash.value) {
        alert("Customer does not have enough money to purchase the item")
    } else if (price == cash.value) {
        alert("No change due - customer paid with exact cash")
        changeDue.textContent = "Status: CLOSED"
    } else {
        console.log(change)
        changeCalc(cid, change)
    }
}



const changeCalc = (currentCid, change) => {
    const cidValues = currentCid.map(money => {
        return money.filter(element => typeof element === "number")[0];
    }).reduce((acc, curr) => (acc * 100 + curr * 100) / 100, 0);
    // Bien, pero hay que hacer otra función que calcule realmente lo que hay en el cid (aquí calculamos la cantidad de esa unidad de dinero, no estamos teniendo en cuenta lo que vale esa cantidad)
    // Entonces hay que mapear pero para el valor que tiene realmente el primer elemento multiplicarlo por el segundo. Si es ONE, nada, si es nickel * 5... y así hasta los 100$
    // Creo que será mejor idea multiplicar todo * 100 y luego encargarse de dividirlo, si no el manejo hasta el dolar puede ser un dolor de cabeza
    // Ej si tenemos 1.01 pennies -> 1.01 * 100 = 101, 2.05 nickels * 5 * 100 = 1025 + 101 = 1126 / 100 = 11.26$
    // Se podría dar el valor por === 'PENNY' o noséqué[0] y ya multiplicar por lo que sea necesario
      // Sumamos todos los valores numéricos
    if (change > cidValues) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS"
    }
}

// Cuando el cliente da dinero, la función calcula el cambio desde las unidades mayores, modifica los valores numéricos del array, retorna el cambio y lo pasa por pantalla