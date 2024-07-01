import { createReducer, on } from "@ngrx/store";
import { Product } from "../../models/common.model";
import { getAllProductsFailure, getAllProductsSuccess } from "./product.action";

export interface ProductState {
    products: Product[];
    error: string | null;
}

export const initialProductState: ProductState = {
    products: [],
    error: null,
}

export const ProductReducer = createReducer(
    initialProductState,
    on(getAllProductsSuccess, (state, {products}) => ({
        ...state,
        products,
        error: null
    })),
    on(getAllProductsFailure, (state, {errorMessage})=> ({
        ...state,
        error: errorMessage
    }))
)