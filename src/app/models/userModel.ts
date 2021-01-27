
export class User {
    
    oid:string;
    verified:boolean;
    firstLogin:Date;
    lastestLogin:Date;
    userAgreement:any;
    accountLocked:boolean;
    failedVerificationAttempts:number;
}
