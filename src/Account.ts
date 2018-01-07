import {TransactionOrigin} from "./TransactionOrigin";

export interface Account {
    dateOpened: Date;
    transactionNumber: number;
    accountHolderName: string;
    accountHolderBirthDate: Date;
    balance: number;
    withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin, date: Date) : Transaction;
    depositMoney(amount: number, description: string, date: Date) : Transaction;
    accountHistory : Transaction[];
    advanceDate(numberOfDays: number);
}