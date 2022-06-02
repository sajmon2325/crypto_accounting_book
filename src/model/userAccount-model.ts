export interface UserAccountAttributes {
    id?: string;
    username: string;
    password: string;
    email: string;
    country?: string;
    accountingRecordId?: string;
}

export class UserAccount implements UserAccountAttributes {
    id?: string;
    username: string;
    password: string;
    email: string;
    country?: string;
    accountingRecordId?: string

    constructor ( username: string, password: string, email: string, country?: string, accountingRecordId?: string, id?: string ) {
        this.username = username;
        this.password = password;
        this.email = email;
        if ( id ) {
            this.id = id;
        }
        if ( country ) {
            this.country = country;
        }
        if ( accountingRecordId ) {
            this.accountingRecordId = accountingRecordId;
        }
    }
}