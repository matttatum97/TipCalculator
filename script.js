"use strinct";
const billAmount = document.getElementById("billAmount")
const tipAmount = document.getElementById("tipAmount")
const calculatBtn = document.getElementById("calculate")
const resetBtn = document.getElementById("reset")
const tipContainer = document.querySelector(".tipContainer")
let myStorage = window.localStorage
let counter = 0

//localStorage.clear()

calculatBtn.addEventListener('click', () => {
    let bill = billAmount.value
    let tip = tipAmount.value
    if (bill && tip) {
        tipReturn = calculateTip(+bill, +tip)
        const newDiv = document.createElement('div')
        newDiv.classList.add("tipInfo")
        newDiv.innerHTML = `
        <form id="newBill">
            <input class="bill" type="text" id="${counter}" value="${tipReturn}"/>
        </form>
        
        <button class="btn btn-outline-secondary update" value="${counter}">Update</button>
        <button class="btn btn-outline-secondary delete" value="${counter}">X</button>`
        tipContainer.appendChild(newDiv)
        localStorage.setItem(counter, tipReturn)
        counter++
        localStorage.setItem('counter', counter)
        activateBtns()

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



window.addEventListener('load', () => {
    if(localStorage.getItem('counter')) {
        addElements()
        activateBtns()
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
        if (localStorage.getItem(i)) {
            const newDiv = document.createElement('div')
            newDiv.classList.add("tipInfo")
            newDiv.innerHTML = `
            <form id="newBill">
                <input class="bill" type="text" id="${i}" value="${localStorage.getItem(i)}"/>
            </form>
            
            <button class="btn btn-outline-secondary update" value="${i}">Update</button>
            <button class="btn btn-outline-secondary delete" value="${i}">X</button>`
            tipContainer.appendChild(newDiv)
        }
    }
}

function activateBtns() {
    let updateBtns = document.querySelectorAll('.update')
    let deleteBtns = document.querySelectorAll('.delete')
    updateBtns.forEach((btn) => {

        btn.addEventListener('click', () => {
            localStorage.setItem(btn.value, document.getElementById(`${btn.value}`).value)
        })
    })
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            console.log('hi')
            localStorage.removeItem(btn.value)
            removeElements()
            addElements()
            activateBtns()
        })
    }) 
}




