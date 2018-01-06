"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
let d = new Date();
let CheckingAccount = class CheckingAccount {
    constructor() {
        this.dateOpened = new Date(2018, 1, 0);
        this.transactionNumber = 0;
        this.accountHolderName = "Nolen Shubin";
        this.accountHolderBirthDate = new Date(1999, 9, 29);
        this.balance = 1000;
    }
    withdrawMoney(amount, description, transactionOrigin, date) {
        let transaction = {
            success: false,
            amount: amount,
            resultBalance: this.balance - amount,
            transactionDate: date,
            description: description,
            errorMessage: "I'm sorry, we were not able to complete your transaction."
        };
        if (transaction.resultBalance > 0) {
            transaction.success = true;
            this.accountHistory[this.accountHistory.length] = transaction;
            return transaction;
        }
        else {
            console.log(transaction.errorMessage);
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
            this.balance *= (1.01 / 12);
        }
    }
    subtractDays(month, daysInMonth, numberOfDays) {
        if (numberOfDays > daysInMonth) {
            d.setMonth(month + 1);
            this.advanceDate(numberOfDays - 30);
        }
        else {
            d.setDate(d.getDate + numberOfDays);
        }
    }
};
CheckingAccount = __decorate([
    decorators_1.displayClassNameWithPurpose("To prove typescript is wrong and that it sometimes sucks")
], CheckingAccount);
exports.CheckingAccount = CheckingAccount;
//# sourceMappingURL=CheckingAccount.js.map