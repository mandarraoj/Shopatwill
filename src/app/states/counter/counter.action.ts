import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const reset = createAction('[Counter Component] reset');
export const decrement = createAction('[Counter Component] Decrement');