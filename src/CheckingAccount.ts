import {Account} from "./Account"
import {AccountType} from "./AccountType";
import {displayClassNameWithPurpose, displayClassName} from "./decorators";

@displayClassNameWithPurpose("To prove typescript is wrong and that it sometimes sucks")
export class CheckingAccount implements Account{
    accountHolderName: string;
    accountHolderBirthDate: Date;
    balance = 1000;
    accountType: AccountType.checking;
    accountHistory: Transaction[];
    withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {

    }
    depositMoney(amount: number, description: string): Transaction {
        throw new Error("Method not implemented.");
    }
    advanceDate(numberOfDays: number) {
        throw new Error("Method not implemented.");
    }
}