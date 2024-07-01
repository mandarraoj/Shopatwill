
import { CounterState } from "./counter/counter.reducer";
import { ProductState } from "./products/product.reducer";

export interface AppState {
    counter: CounterState,
    product: ProductState
}