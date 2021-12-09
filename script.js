"use strinct";
const billAmount = document.getElementById("billAmount")
const tipAmount = document.getElementById("tipAmount")
const calculatBtn = document.getElementById("calculate")
const resetBtn = document.getElementById("reset")
const tipContainer = document.querySelector(".tipContainer")
let myStorage = window.localStorage
let add1Btn = document.getElementById('moreTipBtn')
let counter = 0

//localStorage.clear()

calculatBtn.addEventListener('click', () => {
    let bill = billAmount.value
    let tip = tipAmount.value
    if (bill && tip) {
        tipReturn = calculateTip(+bill, +tip)
        const newDiv = document.createElement('div')
        newDiv.classList.add("tipInfo")
        newDiv.innerHTML = `${tipReturn}`
        tipContainer.appendChild(newDiv)
        localStorage.setItem(counter, tipReturn)
        counter++
        localStorage.setItem('counter', counter)

    } else {
        alert("Both bill amount and tip amount must be selected")
    }
        
    
})

resetBtn.addEventListener('click', () => {
    localStorage.clear()
    removeElements()
    localStorage.setItem('counter', 0)
    counter = 0
})

add1Btn.addEventListener('click', () => {
    if(localStorage.getItem('counter')) {
        counter = localStorage.getItem("counter")
        for (let i = 0; i < counter; i++) {
            console.log(localStorage.getItem(i))
            const current = +localStorage.getItem(i) + 1
            localStorage.setItem(i, current.toFixed(2))
        }
        removeElements()
        addElements()

    }
})

window.addEventListener('load', () => {
    if(localStorage.getItem('counter')) {
        addElements()
    }
    
})


function calculateTip(bill, tip) {
    let total = 0
    tip = tip / 100
    total = (bill + (bill * tip)).toFixed(2)
    return total 
}

function removeElements() {
    tipContainer.querySelectorAll('.tipInfo').forEach((e) => {
        e.remove()
        
    })
}

function addElements() {
    counter = localStorage.getItem("counter")
    for (let i = 0; i < counter; i++) {
        const newDiv = document.createElement('div')
        newDiv.classList.add("tipInfo")
        newDiv.innerHTML = `${localStorage.getItem(i)}`
        tipContainer.appendChild(newDiv)
    }
}




