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
    password: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    address?: AddressRequest;

    constructor(name: string, password: string, phoneNumber: string, birthDate: string, email: string) {
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.email = email;
    }
}

export class UserLoginRequest {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export interface PatientInterface {
    id: string;
    name: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    createdAt: string;
    updateAt: string;
    address: {
      zipCode: string;
      street: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: {
        id: string;
        name: string;
        state: {
          id: string;
          name: string;
          acronym: string;
        };
      };
    };
    appointments: {
      id: string;
      time: string;
      patient: {
        id: string;
        name: string;
        phoneNumber: string;
        birthDate: string;
        email: string;
      };
      physiotherapist: {
        id: string;
        name: string;
        email: string;
      };
    }[];
}
