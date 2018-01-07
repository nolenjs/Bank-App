"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionOrigin_1 = require("./TransactionOrigin");
let d = new Date();
function withdrawMoney(accountType, amount, description, date, transactionOrigin, transactionNumber) {
    let transaction = {
        success: false,
        amount: amount,
        resultBalance: this.balance - amount,
        transactionDate: date,
        description: description,
        errorMessage: "I'm sorry, we were not able to complete your transaction."
    };
    switch (accountType) {
        case 1: {
            if (transaction.resultBalance > 0) {
                transaction.success = true;
                return transaction;
            }
            else {
                console.log(transaction.errorMessage);
            }
            break;
        }
        case 2: {
            if (transaction.resultBalance > 0 && transactionNumber < 6) {
                transaction.success = true;
                if (TransactionOrigin_1.TransactionOrigin.web || TransactionOrigin_1.TransactionOrigin.phone) {
                    this.transactionNumber++;
                }
                return transaction;
            }
            else {
                console.log(transaction.errorMessage);
            }
            break;
        }
        case 3: {
            let holder = this.accountHolderBirthDate;
            let year = d.getFullYear() - holder.getFullYear();
            //If balance is more than $0 and older than 60
            if (transaction.resultBalance > 0 && year > 60 || (year === 60 && d.getMonth() >= holder.getMonth() && d.getDate() >= holder.getDate())) {
                transaction.success = true;
                this.accountHistory[this.accountHistory.length] = transaction;
                return transaction;
            }
            else if (transaction.resultBalance > amount / 10) {
                transaction.resultBalance -= (amount / 10);
                transaction.success = true;
                this.accountHistory[this.accountHistory.length] = transaction;
                return transaction;
            }
            else {
                console.log(transaction.errorMessage);
            }
            break;
        }
    }
}
exports.withdrawMoney = withdrawMoney;
function depositMoney(amount, description, date) {
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
function advanceDate(numberOfDays, accountType) {
    let month = this.dateOpened.getMonth();
    let type;
    switch (accountType) {
        case 1: {
            type = 1.01;
            break;
        }
        case 2: {
            type = 1.02;
            break;
        }
        case 3: {
            type = 1.03;
            break;
        }
    }
    //certain months have certain # of days, gotta add accordingly
    //All odd months Jan - July
    if (month % 2 === 0 && month < 7) {
        //If February 28
        if (month === 1 && numberOfDays > 28) {
            this.subtractDays(month, 28, numberOfDays);
        }
        else {
            this.subtractDays(month, 31, numberOfDays);
        }
    }
    else if (month % 2 === 1 && month < 7) {
        this.subtractDays(month, 30, numberOfDays);
    }
    else if (month % 2 === 0 && month > 7) {
        this.subtractDays(month, 30, numberOfDays);
    }
    else if (month % 2 === 1 && month >= 7) {
        this.subtractDays(month, 31, numberOfDays);
    }
    if (d.getDate() === 1) {
        this.balance *= (type / 12);
    }
}
function subtractDays(month, daysInMonth, numberOfDays) {
    if (numberOfDays > daysInMonth) {
        d.setMonth(month + 1);
        this.advanceDate(numberOfDays - 30);
    }
    else {
        d.setDate(d.getDate + numberOfDays);
    }
}
//# sourceMappingURL=functions.js.map