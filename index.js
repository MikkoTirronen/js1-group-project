/* 
    Coffee Shop Group Project
    Panos, Anna, Amanda
*/
class Coffee{
    constructor(input){
        this.cup = input
        this.priceOfInput = 0
    }
        setPrices(){
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
        this.membership = "Bronze"
        this.totalNumberOfCups = 0
        this.transactionSum = 0
        }

        newCupOfCoffee(type){
            const cup = new Coffee(type)
            cup.setPrices()
            return cup
        }

        createTransaction(input, number){
            let newCup = this.newCupOfCoffee(input)
            const transaction = {type: newCup.cup, numberOfCups: number, price: this.checkDiscount(newCup.priceOfInput)} 
            return transaction
        }

        checkDiscount(input){
            let temp = input
            if(this.transactionSum >= 500 && this.transactionSum < 1000){
                temp = temp*(0.9)
            }else if(this.transactionSum >= 1000){
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

        updateMembershipStatus(){
            console.log(this.totalNumberOfCups)
            if(this.totalNumberOfCups >= 10 && this.totalNumberOfCups<30){
                this.membership = "Silver"
            }else if(this.totalNumberOfCups >= 30){
                this.membership = "Gold"
            }
            document.getElementById("membershipStatus").innerHTML = `Membership Status: ${this.membership}`
            document.getElementById("sum").innerHTML = `You have spent: ${this.transactionSum} kr.`
        }
    }

    let customer1 = new Customer()

    function updateTransactionList(){
            document.getElementById("root").innerHTML = "";
            const parent = document.getElementById("root")
            var transaction = document.createElement("p")

            customer1.transactions.forEach( element =>{
                    let msg = document.createElement("p")
                    msg.innerHTML =`You Have Bought: ${element.numberOfCups}st of ${element.type} for ${element.price} kr. For a total of: ${element.numberOfCups * element.price} kr\n`
                    transaction.appendChild(msg)
                })
            parent.appendChild(transaction)
        }

    function isMoreThanZero(){
            const inputValue = document.getElementById("numberOfCups").value
            console.log(inputValue > 0)
            return inputValue > 0
    }

    function isLessThanTen(){
            const inputValue = document.getElementById("numberOfCups").value
            console.log(inputValue <= 10)
            return inputValue <= 10
    }
        
    function checkInput(input){
        if(input > 10){
            alert("Max 10 cups per transaction")
            console.log("Input is greater than 10")
        }else if(input < 1){
            alert("Please enter a Valid number!")
        }       
    }
    function sendInput(){
            const inputCoffee = document.getElementById("coffees")
            var value = inputCoffee.options[inputCoffee.selectedIndex].text
            const input = document.getElementById("numberOfCups").value
            customer1.addTransaction( value, input)
            updateTransactionList()
    }
    function onBuyButtonClick(){
        if((isMoreThanZero() == true) && (isLessThanTen() == true)){
            sendInput()
        }else{
            checkInput(document.getElementById("numberOfCups").value)
        }  
    }
