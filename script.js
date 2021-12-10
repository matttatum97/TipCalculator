"use strinct";
const billAmount = document.getElementById("billAmount")
const tipAmount = document.getElementById("tipAmount")
const calculatBtn = document.getElementById("calculate")
const resetBtn = document.getElementById("reset")
const tipContainer = document.querySelector(".tipContainer")
let myStorage = window.localStorage
let counter = 0



//Creates a new tip
calculatBtn.addEventListener('click', () => {
    let bill = billAmount.value
    let tip = tipAmount.value
    console.log()
    //Checks if there is a bill and tip and if the bill is a number
    if (bill && tip && !isNaN(Number(bill))) {
        tipReturn = calculateTip(+bill, +tip)
        const newDiv = document.createElement('div')
        newDiv.classList.add("tipInfo")
        newDiv.innerHTML = `
        <form id="newBill">
            <input class="bill bill2" type="text" id="${counter}" value="${tipReturn}"/>
        </form>
        
        <button class="btn btn-outline-secondary update" value="${counter}">Update</button>
        <button class="btn btn-outline-secondary delete" value="${counter}">X</button>`
        tipContainer.appendChild(newDiv)
        localStorage.setItem(counter, tipReturn)
        counter++
        localStorage.setItem('counter', counter)
        activateBtns()
        clearCalc()

    } else {
        alert("Both bill amount and tip amount must be selected and bill must be a number")
    }
        
    
})

//Resets the local storage
resetBtn.addEventListener('click', () => {
    localStorage.clear()
    removeElements()
    localStorage.setItem('counter', 0)
    counter = 0
})


//Resets the page when the page is reloaded. 
window.addEventListener('load', () => {
    if(localStorage.getItem('counter')) {
        addElements()
        activateBtns()
    }
    
})


//Calcuates the tip value to two decimal places
function calculateTip(bill, tip) {
    let total = 0
    tip = tip / 100
    total = (bill + (bill * tip)).toFixed(2)
    return total 
}

//Removes all the tip elements
function removeElements() {
    tipContainer.querySelectorAll('.tipInfo').forEach((e) => {
        e.remove()
    })
}

//Adds all the tip elements
function addElements() {
    counter = localStorage.getItem("counter")
    for (let i = 0; i < counter; i++) {
        if (localStorage.getItem(i)) {
            const newDiv = document.createElement('div')
            newDiv.classList.add("tipInfo")
            newDiv.innerHTML = `
            <form id="newBill">
                <input class="bill bill2" type="text" id="${i}" value="${localStorage.getItem(i)}"/>
            </form>
            
            <button class="btn btn-outline-secondary update" value="${i}">Update</button>
            <button class="btn btn-outline-secondary delete" value="${i}">X</button>`
            tipContainer.appendChild(newDiv)
        } 
    }
}

//Activates the buttons on each tip by adding event listners.
function activateBtns() {
    let updateBtns = document.querySelectorAll('.update')
    let deleteBtns = document.querySelectorAll('.delete')
    //adds event listern for each update btn
    updateBtns.forEach((btn) => {

        btn.addEventListener('click', () => {
            localStorage.setItem(btn.value, document.getElementById(`${btn.value}`).value)
        })
    })
    //adds event listener for each delet btn
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            localStorage.removeItem(btn.value)
            removeElements()
            addElements()
            activateBtns()
        })
    }) 
}

//Clears the bill amount and resets the tip amount after calculate
function clearCalc() {
    billAmount.value = ""
    tipAmount.value = ""
}




