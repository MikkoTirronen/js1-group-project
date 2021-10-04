/* 
    Coffee Shop Group Project
    Panos, Anna, Amanda
*/
let typesOfCoffee = [
    { name: 'Brygg Kaffe', price: 100 },
    { name: 'Cappucino', price: 30 },
    { name: 'Latte', price: 40 }
]
function updateSelectTag() {
    typesOfCoffee.forEach(element => {
        var parent = document.getElementById("testCoffee")
        var opt = document.createElement("option")
        opt.text = `${element.name} - ${element.price}kr`
        opt.name = element.name
        opt.value = element.price
        parent.appendChild(opt)
    })
}

updateSelectTag()

class Coffee {
    constructor(input) {
        this.cup = input
        this.priceOfInput = 0
    }
    getPrice() {
        typesOfCoffee.forEach(element => {
            if (element.name === this.cup) {
                this.priceOfInput = element.price
            }
        })
    }
}

class Customer {
    constructor() {
        this.transactions = []
        this.membership = "Bronze"
        this.totalNumberOfCups = 0
        this.transactionSum = 0
    }

    newCupOfCoffee(type) {
        const cup = new Coffee(type)
        cup.getPrice()
        return cup
    }

    createTransaction(input, number) {
        let newCup = this.newCupOfCoffee(input)
        const transaction = { type: newCup.cup, numberOfCups: number, price: this.checkDiscount(newCup.priceOfInput) }
        return transaction
    }

    checkDiscount(input) {
        let temp = input
        if (this.transactionSum >= 500 && this.transactionSum < 1000) {
            temp = temp * (0.9)
        } else if (this.transactionSum >= 1000) {
            temp = temp * (0.85)
        }
        return temp
    }

    addTransaction(typeOfCoffee, numOfCups) {
        let tempTransaction = this.createTransaction(typeOfCoffee, numOfCups)
        this.totalNumberOfCups = parseInt(this.totalNumberOfCups) + parseInt(tempTransaction.numberOfCups)
        this.transactionSum += tempTransaction.numberOfCups * tempTransaction.price
        this.transactions.unshift(tempTransaction)
        this.updateMembershipStatus()
        updateTransactionList()
    }

    updateMembershipStatus() {
        console.log(this.totalNumberOfCups)
        if (this.totalNumberOfCups >= 10 && this.totalNumberOfCups < 30) {
            this.membership = "Silver"
        } else if (this.totalNumberOfCups >= 30) {
            this.membership = "Gold"
        }
        document.getElementById("membershipStatus").innerHTML = `Membership Status: ${this.membership}`
        document.getElementById("sum").innerHTML = `You have spent: ${this.transactionSum} kr.`
    }
}

let customer1 = new Customer()

function updateTransactionList() {
    document.getElementById("root").innerHTML = "";
    const parent = document.getElementById("root")
    var transaction = document.createElement("p")

    customer1.transactions.forEach(element => {
        let msg = document.createElement("p")
        msg.innerHTML = `You have bought: ${element.numberOfCups} ${element.type} for ${element.price}kr/cup. For a total of: ${element.numberOfCups * element.price} kr\n`
        transaction.appendChild(msg)
    })
    parent.appendChild(transaction)
}

function isMoreThanZero() {
    const inputValue = document.getElementById("numberOfCups").value
    console.log(inputValue > 0)
    return inputValue > 0
}

function isLessThanTen() {
    const inputValue = document.getElementById("numberOfCups").value
    console.log(inputValue <= 10)
    return inputValue <= 10
}

function checkInput(input) {
    if (input > 10) {
        alert("Max 10 cups per transaction!")
    } else if (input < 1) {
        alert("Please enter a Valid number!")
    }
}
function sendInput() {
    const inputCoffee = document.getElementById("testCoffee")
    var value = inputCoffee.options[inputCoffee.selectedIndex].name
    const input = document.getElementById("numberOfCups").value
    customer1.addTransaction(value, input)
    updateTransactionList()
}
function onBuyButtonClick() {
    if ((isMoreThanZero() == true) && (isLessThanTen() == true)) {
        sendInput()
    } else {
        checkInput(document.getElementById("numberOfCups").value)
    }
}


/* 
Extra fun Coding
*/
function repairTag(input, price) {
    var parent = document.getElementById("menu")
    var opt = document.createElement("option")
    opt.text = `${input} - ${price}kr/cup`
    opt.id = input
    opt.name = input
    parent.appendChild(opt)
}

function displayErrorMsg(msg) {
    const parent = document.getElementById("root")
    parent.innerHtml = ""
    const mymsg = document.createElement("div")
    mymsg.id = "helloError"
    mymsg.innerHTML = msg
    mymsg.className = "display"
    parent.appendChild(mymsg)
}

function hideErrorMsg() {
    const myMessage = document.getElementById("errorMsg")
    myMessage.style.className = "hide"
}
function populatefooter() {

    typesOfCoffee.forEach(element => {
        var prnt = document.getElementById("footerButtons")
        const myButton = document.createElement("button")
        myButton.innerHTML = `${element.name} - ${customer1.getDiscount(element.price)}kr`
        myButton.className = "button"
        myButton.type = "submit"
        myButton.id = element.name
        myButton.style.backgroundColor = "rgb(14, 116, 14)"
        myButton.addEventListener("click", () => {
            var comp = myButton.style.backgroundColor;
            if (comp == "rgb(173, 36, 36)") {
                repairTag(element.name, element.price)
                myButton.style.backgroundColor = "rgb(14, 116, 14)"
            } else if (comp == "rgb(14, 116, 14)") {
                rem = document.getElementById(element.name)
                rem.remove()
                myButton.style.backgroundColor = "rgb(173, 36, 36)"
            };
        })
        prnt.appendChild(myButton)
    })
}
populatefooter()


