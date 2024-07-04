import { Injectable, inject } from "@angular/core";
import { MainService } from "../../services/main.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getAllProductsFailure, getProductsSuccess, getAllproducts, getProductsByBrand, getProductsByRating } from "./product.action";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class ProductEffect {
    private mainService = inject(MainService);
    actions$ = inject(Actions);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllproducts),
            switchMap(() =>
                this.mainService.getProducts().pipe(
                    map((res) => getProductsSuccess({ products: res })),
                    catchError((error: { message: string }) => of(getAllProductsFailure({ errorMessage: error.message })
                ))
                )
            )
        )
    );

    loadProductByBrand$ = createEffect(() => 
        this.actions$.pipe(
            ofType(getProductsByBrand),
            switchMap((action) => 
                this.mainService.getProductsByBrand(action.brandId).pipe(
                    map((res) => getProductsSuccess({ products: res })),
                    catchError((error: { message: string }) => of(getAllProductsFailure({ errorMessage: error.message })
                ))
                )
            )
        )
    );

    loadProductByRating$ = createEffect(() => 
        this.actions$.pipe(
            ofType(getProductsByRating),
            switchMap((action) => 
                this.mainService.getProductsByRating(action.minRating).pipe(
                    map((res) => getProductsSuccess({ products: res })),
                    catchError((error: { message: string }) => of(getAllProductsFailure({ errorMessage: error.message })
                ))
                )
            )
        )
    );

}