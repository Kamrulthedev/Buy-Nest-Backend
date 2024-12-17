export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    imageUrl: string;
    category: string;
    shopId: string;
}

export type IProductFilterRequest = {
    searchTram?: string;
    };