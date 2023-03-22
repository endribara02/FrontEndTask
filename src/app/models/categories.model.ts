export interface Product {
    name: string;
    unitPrice: number;
}

export interface Categories {
    id: number;
    name: string;
    products: Product[];
}

export interface BusinessModel {
    businessName: string;
    categories: Categories[];
    logo: string;
    nuis: string;
}
