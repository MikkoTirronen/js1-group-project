/* 
    Coffeeshop Group Project
    Panos, Anna, Amanda
*/

// Here is our Array of menu items
let typesOfCoffee = [
    { name: 'Brygg Kaffe', price: 20 },
    { name: 'Cappucino', price: 30 },
    { name: 'Latte', price: 40 },
    //{ name: 'Shoes', price: 200}
]

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
        this.membership = `BRONZE`
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
        A function that creates a cup of coffee and gets the price through the getPrice() method.
        It then creates an object of the transaction and checks if the customer is eligable
        for a discount and updates price through the getDiscount method. Returns the object. 
    */
    createTransaction(input, number) {
        let newCup = this.newCupOfCoffee(input)
        const transaction = { type: newCup.cup, numberOfCups: number, price: this.getDiscount(newCup.priceOfInput) }
        return transaction
    }

    /* 
        This creates a temptransaction from the createTransaction() method and uses its values to update
        the sum and totalNumberOfCups of customer1. It then pushes the transaction into our main transactions
        array through the unshift method moving all transactions lower in the array. After the transaction is 
        complete it then updates membership status and the transactions <div id = "root"> in our html.
    */
    addTransaction(typeOfCoffee, numOfCups) {
        let emptyArray = this.createTransaction(typeOfCoffee, numOfCups)
        this.totalNumberOfCups += parseInt(emptyArray.numberOfCups)
        this.sum += emptyArray.numberOfCups * emptyArray.price
        this.transactions.unshift(emptyArray)
        this.getMembershipStatusAndSum()
        updateTransactionList()
    }
    
    // This checks totalNumberOfCups and updates html of membership status and sum.
    getMembershipStatusAndSum() {
        const status = document.getElementById("membershipStatus")
            
        if (this.totalNumberOfCups >= 10 && this.totalNumberOfCups < 30) {
            this.membership = "SILVER"
            status.className= "silverText"//changes css class to .silverText in index.css 
        } else if (this.totalNumberOfCups >= 30) {
            this.membership = "GOLD"
            status.className = "goldText"//changes css class to .goldText in index.css
        }
        status.innerHTML = `${this.membership}`
        document.getElementById("sum").innerHTML = `${this.sum}`
    }
}

//This function updates our html select tag in index.html with values from the typesOfCoffee Array.
function getSelectTag() {
    typesOfCoffee.forEach(element => {
        var parent = document.getElementById("menu")
        var opt = document.createElement("option")
        opt.text = `${element.name} - ${element.price}kr/cup`
        opt.id = element.name
        opt.name = element.name
        parent.appendChild(opt)
        console.log(opt)
    })
}
//Updates the select tag.
getSelectTag()

//Creates a customer.
let customer1 = new Customer()

//Changes transaction heading tag.
function updateTransactionHeading(){
    document.getElementById("heading").innerHTML = "Your Transactions:"
}

//Updates the transactions HTML to display current transactions from the array.
function updateTransactionList() {
    const parent = document.getElementById("root")
    parent.innerHTML = ""
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
    This function serves only to reduce number of functions in onBuyButtonClick().
    It gets the input values from menu and numberOfCups. 
 */
function getInput() {
    const inputCoffee = document.getElementById("menu")
    const value = inputCoffee.options[inputCoffee.selectedIndex].name
    const input = document.getElementById("numberOfCups").value
    customer1.addTransaction(value, input)
    updateTransactionList()
}

/* 
    This is what triggers on the button click. It either getsInfo() if isMoreThanZero() returns the 
    same as IsLessThanTen() or sends the numberOfcups value from our html to the getInput() function.
 */
function onBuyButtonClick() {
    if (isMoreThanZero() == isLessThanTen()) {
        updateTransactionHeading()
        getInput()
    } else {
        sendAlert(document.getElementById("numberOfCups").value)
    }

}

/* 
Extra fun Code
*/

//This function repairs the select tag after being altered by my eventlistener in populateFooter().
function repairTag(input, price){
        var parent = document.getElementById("menu")
        var opt = document.createElement("option")
        opt.text = `${input} - ${price}kr/cup`
        opt.id = input
        opt.name = input
        parent.appendChild(opt)
}

//This function creates a button of each typesOfCoffee array elements and adds an eventlistener which uses repairtag() and remove() functions to edit the select tag "menu"
function populateFooter(){
    typesOfCoffee.forEach(element => {
        var prnt = document.getElementById("footerButtons")
        const myButton = document.createElement("button")
        myButton.innerHTML =`${element.name} - ${customer1.getDiscount(element.price)}kr`
        myButton.className = "button"
        myButton.type = "submit"
        myButton.id = element.name
        myButton.style.backgroundColor = "rgb(14, 116, 14)"
        
        myButton.addEventListener("click", () => {
            var comp = myButton.style.backgroundColor;
            if(comp == "rgb(173, 36, 36)"){
                repairTag(element.name,element.price)
                myButton.style.backgroundColor = "rgb(14, 116, 14)"
            }else if(comp == "rgb(14, 116, 14)"){
                rem = document.getElementById(element.name)
                rem.remove()
                myButton.style.backgroundColor = "rgb(173, 36, 36)"       
            }; 
        }) 
        prnt.appendChild(myButton)
    })
}
populateFooter()


