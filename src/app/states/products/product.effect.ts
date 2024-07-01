import { Injectable, inject } from "@angular/core";
import { MainService } from "../../services/main.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getAllProductsFailure, getAllProductsSuccess, getAllproducts } from "./product.action";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class ProductEffect {
    private api = inject(MainService);
    actions$ = inject(Actions);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllproducts),
            switchMap(() =>
                this.api.getProducts().pipe(
                    map((res) => getAllProductsSuccess({ products: res })),
                    catchError((error: { message: string }) => of(getAllProductsFailure({ errorMessage: error.message })
                ))
                )
            )
        )
    );

}