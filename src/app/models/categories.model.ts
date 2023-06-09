export interface Product {
    name: string;
    unitPrice: number;
    quantity: number; 
    checked: boolean;
    color: string;
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

export interface ShoopingCart{
    name: string;
    unitPrice: number;
    quantity: number;
    checked: boolean;
}
