export class AddressRequest {
    zipCode: string;
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    city: CityIdRequest;

    constructor(zipCode: string, street: string, number: string, neighborhood: string, complement: string, city: CityIdRequest){
        this.zipCode = zipCode;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.complement = complement;
        this.city = city;
    }
}

export class City {
    id?: string;
    name: string;
    state: State;

    constructor(name: string, state: State){
        this.name = name;
        this.state = state;
    }
}

export class CityIdRequest {
    id?: string;

    constructor(id: string) {
        this.id = id;
    }
}

export class State {
    id?: string;
    name: string;
    acronym: string;

    constructor(name: string, acronym: string){
        this.name = name;
        this.acronym = acronym;
    }
}

export class UserRequest {
    name: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    address?: AddressRequest;

    constructor(name: string, phoneNumber: string, birthDate: string, email: string) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.email = email;
    }
}