class Address {
    neighborhood: string;
    street: string;
    homeNumber: string;
    zipCode: string;

    constructor(){
        this.neighborhood = "";
        this.street = "";
        this.homeNumber = "";
        this.zipCode = "";
    }
}

export class User {
    name: string;
    phoneNumber: string;
    birthDay: string;
    email: string;
    address = new Address();

    constructor() {
        this.name = "";
        this.phoneNumber = "";
        this.birthDay = "";
        this.email = "";
    }
}