export interface ISupplier {
    id: number;
    name: string;
    description: string;
    contacts: IContact[];
    address: IAddress;
}

export interface IContact {
    name: string;
    phone: string;
}

export interface IAddress {
    zip_code: string;
    state: string;
    city: string;
    street: string;
    number: number;
    reference: string;
}
