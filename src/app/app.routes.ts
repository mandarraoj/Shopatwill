import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./main/main.component').then(c => c.MainComponent),
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./wishlist/wishlist.component').then(c => c.WishlistComponent),
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent),
    }
];
