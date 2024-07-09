import { Injectable, inject } from "@angular/core";
import { MainService } from "../../services/main.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getAllProductsFailure, getProductsSuccess, getAllproducts} from "./product.action";
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

}