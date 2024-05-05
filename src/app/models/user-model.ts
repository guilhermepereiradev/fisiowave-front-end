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

export class AddressResponse {
    zipCode: string;
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    city: CityResponse;

    constructor(zipCode: string, street: string, number: string, neighborhood: string, complement: string, city: CityResponse){
        this.zipCode = zipCode;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.complement = complement;
        this.city = city;
    }
}

export class CityResponse {
    id: string;
    name: string;
    state: StateResponse;

    constructor(id: string, name: string, state: StateResponse) {
        this.id = id;
        this.name = name;
        this.state = state;
    }
}

export class AppointmentsResponse {
    id: string;
    time: Date;
    physiotherapist: PhysiotherapistResponse;

    constructor(id: string, time: Date, physiotherapist: PhysiotherapistResponse) {
        this.id = id;
        this.time = time;
        this.physiotherapist = physiotherapist;
    }
}

export class PhysiotherapistResponse {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

export class StateResponse {
    id: string;
    name: string;
    acronym: string

    constructor(id: string, name: string, acronym: string) {
        this.id = id;
        this.name = name;
        this.acronym = acronym;
    }
}


export class PatientResponse {
    id: string;
    name: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    createdAt: Date;
    updateAt: Date;
    address: AddressResponse;
    appointments: AppointmentsResponse[];

    constructor(id: string, name: string, phoneNumber: string, birthDate: string, email: string, createdAt: Date,
        updatedAt: Date, address: AddressResponse, appointments: AppointmentsResponse[] )
    {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber,
        this.birthDate = birthDate,
        this.email = email,
        this.createdAt = createdAt,
        this.updateAt = updatedAt,
        this.address = address,
        this.appointments = appointments
    }
}
