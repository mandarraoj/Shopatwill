export interface Reference {
    id: number;
    name: string;
}

export interface Product {
    id: number,
    name: string,
    price: number,
    rating: number,
    categoryId: number,
    brandId: number,
    image: string,
    description: string;
}

export enum FilterEnum {
    BRAND = 'brand',
    RATING = 'rating',
    CATEGORY = 'category'
}

export interface FilterOption {
    label: FilterEnum,
    value: number,
}