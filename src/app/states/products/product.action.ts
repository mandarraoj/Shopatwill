import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/common.model";

export const getAllproducts = createAction('[Main Component] getAllproducts');
export const getAllProductsSuccess = createAction('[Main Component] getAllProductsSuccess', props<{products: Product[]}>());
export const getAllProductsFailure = createAction('[Main Component] getAllProductsFailure', props<{errorMessage: string}>());