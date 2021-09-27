/* 
    Coffee Shop Group Project
    Panos, Anna, Amanda
*/

class Coffee{
    constructor(input){
        this.cup = input
        this.priceOfInput = 0
    }
    myfunction(){
        const typesOfCoffee =[
                { name: 'Brygg Kaffe', price: 20 },
                { name: 'Cappucino', price: 30 },
                { name: 'Latte', price: 40 }
            ]

        typesOfCoffee.forEach(element =>{
            if(element.name === this.cup){
                this.priceOfInput = element.price
            }
        })
    }
}
class Customer {
    constructor() {
        this.transactions = []
        this.membership = "Brons"
        this.totalNumberOfCups = 0
        this.transactionSum = 0

    }
    newCupOfCoffee(type){
        const cup = new Coffee(type)
        cup.myfunction()
        return cup
    }
    createTransaction(input, number){
        let newCup = this.newCupOfCoffee(input)
        const transaction = {type: newCup.cup, numberOfCups: number, price: newCup.priceOfInput} 
        return transaction
    }

    addTransaction(typeOfCoffee, numOfCups) {
        let emptyArray = this.createTransaction(typeOfCoffee, numOfCups)
        this.totalNumberOfCups += numOfCups
        this.transactionSum += emptyArray.numberOfCups * emptyArray.price
        this.transactions.push(emptyArray)
        
    }

    getAllTransactions(){
        this.transactions.forEach(element=>{
            console.log(`You Have Bought: ${element.numberOfCups}st of ${element.type} for ${element.price}kr. For a total of: ${element.numberOfCups * element.price}kr`)
        })
        console.log(`You have spent a total of: ${this.transactionSum}kr`)
    }
}

let customer1 = new Customer()

customer1.addTransaction("Brygg Kaffe", 1)
customer1.addTransaction("Cappucino", 2)
customer1.addTransaction("Latte", 3)


console.log(customer1.transactions)
console.log(customer1.totalNumberOfCups, customer1.transactionSum)
customer1.getAllTransactions()

