import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/common.model";

export const getAllproducts = createAction('[Main Component] getAllproducts');
export const getProductsSuccess = createAction('[Main Component] getAllProductsSuccess', props<{products: Product[]}>());
export const getAllProductsFailure = createAction('[Main Component] getAllProductsFailure', props<{errorMessage: string}>());

/* 
    Below Action can use the same success and failure actions above while creating the effects, as it will give the same response back.
*/
export const getProductsByBrand = createAction('[Main Component] getProductsByBrand', props<{brandId: number}>());
export const getProductsByRating = createAction('[Main Component] getProductsByRating', props<{minRating: number}>());