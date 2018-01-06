import {Account} from "./Account"
import {TransactionOrigin} from "./TransactionOrigin";
import {displayClassNameWithPurpose} from "./decorators";
let d = new Date();

@displayClassNameWithPurpose("To prove typescript is wrong and that it sometimes sucks")
export class SavingsAccount implements Account{
    transactionNumber: number = 0;
    dateOpened: Date = new Date (2018, 0, 5);
    accountHolderName: string = 'Nolen Shubin';
    accountHolderBirthDate: Date = new Date(1999, 9, 29);
    balance = 10000;
    accountHistory: Transaction[];
    withdrawMoney(amount, description, transactionOrigin, date){
        let transaction = {
            success: false,
            amount: amount,
            resultBalance: this.balance - amount,
            transactionDate: date,
            description: description,
            errorMessage: "I'm sorry, we were not able to complete your transaction."
        };
        if (transaction.resultBalance > 0 && this.transactionNumber < 6){
            transaction.success = true;
            this.accountHistory[this.accountHistory.length] = transaction;
            if (TransactionOrigin.web || TransactionOrigin.phone){
                this.transactionNumber++;
            }
            return transaction;
        }
        else{
            console.log(transaction.errorMessage);
        }
        let holder = this.accountHolderBirthDate;
        let year = d.getFullYear() - holder.getFullYear();
        if (transaction.resultBalance > 0){
            if (year < 60 && d.getMonth() === holder.getMonth() && d.getDate() === holder.getDate()){
                transaction.resultBalance -= (amount / 10);
            }
            transaction.success = true;
            this.accountHistory[this.accountHistory.length] = transaction;
            return transaction;
        }
    }
    depositMoney(amount, description, date) {
        let transaction = {
            success: true,
            amount: amount,
            resultBalance: this.balance + amount,
            transactionDate: date,
            description: description,
            errorMessage: "I'm sorry, we were not able to complete your transaction."
        };
        this.accountHistory[this.accountHistory.length] = transaction;
        this.balance = transaction.resultBalance;
        return transaction;
    }
    advanceDate(numberOfDays) {
        let month = this.dateOpened.getMonth();
        //certain months have certain # of days, gotta add accordingly

        //All odd months Jan - July
        if (month % 2 === 0 && month < 7){
            //If February 28
            if(month === 1 && numberOfDays > 28){
                this.subtractDays(month, 28, numberOfDays);
            }
            //Other than that... 31
            else{
                this.subtractDays(month, 31, numberOfDays);
            }
        }
        //All even months Jan - July 30
        else if (month % 2 === 1 && month < 7){
            this.subtractDays(month, 30, numberOfDays);
        }
        //All odd months August past 30
        else if (month % 2 === 0 && month > 7){
            this.subtractDays(month, 30, numberOfDays);
        }
        //All even months August past 31
        else if (month % 2 === 1 && month >= 7){
            this.subtractDays(month, 31, numberOfDays);
        }
        if (d.getDate() === 1){
            this.balance *= (1.02 / 12);
        }
    }
    subtractDays(month, daysInMonth, numberOfDays){
        if (numberOfDays > daysInMonth){
            d.setMonth(month + 1);
            this.transactionNumber = 0;
            this.advanceDate(numberOfDays - 30);
        }
        else{
            d.setDate(d.getDate + numberOfDays);
        }
    }
}