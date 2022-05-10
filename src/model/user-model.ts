export interface UserAttributes {
    username: string;
    password: string;
    email: string;
    country?: string;
    accountingRecordId?: string;
}

export class User implements UserAttributes {
    username: string;
    password: string;
    email: string;
    country?: string;
    accountingRecordId?: string

    constructor ( username: string, password: string, email: string, country?: string, accountingRecordId?: string ) {
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