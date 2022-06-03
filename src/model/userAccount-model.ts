export interface UserAccountAttributes {
    username: string;
    password: string;
    email: string;
    country?: string;
    accountingRecordId?: string;
}

export class UserAccount implements UserAccountAttributes {
    username: string;
    password: string;
    email: string;
    country?: string;
    accountingRecordId?: string

    constructor ( username: string, password: string, email: string, country?: string, accountingRecordId?: string, ) {
        this.username = username;
        this.password = password;
        this.email = email;
        if ( country ) {
            this.country = country;
        }
        if ( accountingRecordId ) {
            this.accountingRecordId = accountingRecordId;
        }
    }
}