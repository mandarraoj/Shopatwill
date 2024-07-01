import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './states/counter/counter.reducer';
import { ProductReducer } from './states/products/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductEffect } from './states/products/product.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideStore(), 
    provideState({name: 'counter', reducer: counterReducer}),
    provideState({name: 'product', reducer: ProductReducer}),
    provideEffects(ProductEffect)
  ]
};
