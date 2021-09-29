/* 
    Coffeeshop Group Project
    Panos, Anna, Amanda
*/

// Here is our Array of menu items
let typesOfCoffee = [
    { name: 'Brygg Kaffe', price: 20 },
    { name: 'Cappucino', price: 30 },
    { name: 'Latte', price: 40 }
]

//This function updates our html select tag in index.html with values from the typesOfCoffee array
function updateSelectTag() {
    typesOfCoffee.forEach(element => {
        var parent = document.getElementById("menu")
        var opt = document.createElement("option")
        opt.text = `${element.name} - ${element.price}kr/cup`
        opt.name = element.name
        parent.appendChild(opt)
    })
}

//Changes transaction heading tag
function updateTransactionHeading(){
    document.getElementById("heading").innerHTML = "Your Transactions:"
}
/* 
    Here is our Coffee class with an input parameter that we will use to take in a menu item later.
    This also has a priceOfInput variable that we will use to update the price of the menu items.
    This class has one function that assigns priceOfinput to the input coffee value.
*/
class Coffee {
    constructor(input) {
        this.cup = input
        this.priceOfInput = 0
    }

    //Gets the price of the coffee and assigns it to priceOfInput
    getPrice() {
        typesOfCoffee.forEach(element => {
            if (element.name === this.cup) {
                this.priceOfInput = element.price
            }
        })
    }
}

//New class Customer with a transactions array and variables: membership, totalNumberOfCups, and sum.
class Customer {
    constructor() {
        this.transactions = []
        this.membership = "Bronze"
        this.totalNumberOfCups = 0
        this.sum = 0
    }

    //Creates a new Cup of coffee and gets the price of that cup.
    newCupOfCoffee(type) {
        const cup = new Coffee(type)
        cup.getPrice()
        return cup
    }

    /* 
        A function for checking if the customer is eligable for a discount. If true applies discount,
        othewise returns the same value.
    */
    getDiscount(input) {
        let newPrice = input
        if (this.sum >= 500 && this.sum < 1000) {
            newPrice = newPrice * (0.9)
        } else if (this.sum >= 1000) {
            newPrice = newPrice * (0.85)
        }
        return newPrice
    }
    /* 
        A function that creates a cup of coffee and gets the price through the getPrice method.
        It then creates an object of the transaction and checks if the customer is eligable
        for a discount and updates price through the getDiscount method. Returns the object. 
    */
    createTransaction(input, number) {
        let newCup = this.newCupOfCoffee(input)
        const transaction = { type: newCup.cup, numberOfCups: number, price: this.getDiscount(newCup.priceOfInput) }
        return transaction
    }

    /* 
        This creates a temptransaction from the createTransaction method and uses its values to update
        the sum and totalNumberOfCups of the customer. It then pushes the transaction into our main transactions
        array through the unshift method moving all transactions lower in the array.
        After the transaction is complete it then updates membership status and the transactions in our html.
    */
    addTransaction(typeOfCoffee, numOfCups) {
        let tempTransaction = this.createTransaction(typeOfCoffee, numOfCups)
        this.totalNumberOfCups = parseInt(this.totalNumberOfCups) + parseInt(tempTransaction.numberOfCups)
        this.sum += tempTransaction.numberOfCups * tempTransaction.price
        this.transactions.unshift(tempTransaction)
        this.updateMembershipStatusAndSum()
        updateTransactionList()
    }
    
    // This checks totalNumberOfCups and updates html of membership status and sum.
    updateMembershipStatusAndSum() {
        console.log(this.totalNumberOfCups)
        if (this.totalNumberOfCups >= 10 && this.totalNumberOfCups < 30) {
            this.membership = "Silver"
        } else if (this.totalNumberOfCups >= 30) {
            this.membership = "Gold"
        }
        document.getElementById("membershipStatus").innerHTML = `Membership Status: ${this.membership}`
        document.getElementById("sum").innerHTML = `You have spent: ${this.sum} kr.`
    }
}

//Updates the select tag.
updateSelectTag()

//Creates a customer.
let customer1 = new Customer()

//Updates the transactions HTML to display current transactions from the array.
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

//Checks number of cups is more than zero, returns true if input is valid.
function isMoreThanZero() {
    const inputValue = document.getElementById("numberOfCups").value
    console.log(inputValue > 0)
    return inputValue > 0
}

//Checks if number of cups is less than 11, returns true if input is valid.
function isLessThanTen() {
    const inputValue = document.getElementById("numberOfCups").value
    console.log(inputValue <= 10)
    return inputValue <= 10
}

//This sends the appropriate alert according to whats wrong with the input.
function sendAlert(input) {
    if (input > 10) {
        alert("Max 10 cups per transaction!")
    } else if (input < 1) {
        alert("Please enter a Valid number!")
    }
}

/* 
    This function serves only to reduce number of functions in onBuyButtonClick.
    It gets all the values from our html. 
 */
function getInput() {
    const inputCoffee = document.getElementById("menu")
    const value = inputCoffee.options[inputCoffee.selectedIndex].name
    const input = document.getElementById("numberOfCups").value
    customer1.addTransaction(value, input)
    updateTransactionList()
}
/* 
    This is what triggers on the button click. It either getsInfo if isMoreThanZero returns the 
    same as IsLessThanTen or sends the numberOfcups value from our html to the CheckInput function.
 */
function onBuyButtonClick() {
    if (isMoreThanZero() == isLessThanTen()) {
        updateTransactionHeading()
        getInput()
    } else {
        sendAlert(document.getElementById("numberOfCups").value)
    }
}
