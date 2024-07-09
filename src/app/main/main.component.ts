import { Component, OnInit } from '@angular/core';
import { FilterEnum, PriceRange, Product } from '../models/common.model';
import { CommonModule } from '@angular/common';
import { Observable, map, tap } from 'rxjs';
import { FilterService } from '../services/filter.service';
import { UtilitiesService } from '../shared/utilities/utilities.service';
import { AppState } from '../states/app.state';
import { Store } from '@ngrx/store';
import { getAllproducts } from '../states/products/product.action';
import { selecProductError, selectAllProducts } from '../states/products/product.selector';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  productList: Product[] = [];
  ratings = [1,2,3,4,5];
  filterEnum = FilterEnum;
  wishList: number[] = [];
  addToCartList: number[] = [];

  products$!: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;
  error$!: Observable<string | null>; 

  constructor(private store: Store<AppState>, private filterService: FilterService, public utilitiesService: UtilitiesService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getwishList();
  }

  getProducts() {
    this.store.dispatch(getAllproducts());
    this.products$ = this.store.select(selectAllProducts);
    this.getFilteredProducts();
    this.error$ = this.store.select(selecProductError);
  }

  getFilteredProducts() {
    this.filterService.filterByOption$.subscribe({
      next: (res)=> {
        const filterOption = res;
        switch (filterOption?.label) {
          case this.filterEnum.BRAND:
            this.filterProductsByBrand(filterOption.value as number);
            break;
          
          case this.filterEnum.RATING:
            this.filterProductsByRating(filterOption.value as number);
            break;

          case this.filterEnum.CATEGORY:
            filterOption.value != 0 ? this.filterProductsByCategory(filterOption.value as number) : this.filterAllProducts();
            break;

          case this.filterEnum.PRICE_RANGE:
            this.filterProductsByPriceRange(filterOption.value as PriceRange);
            break;
      
          default:
            this.filterAllProducts();
            break;
        }
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  filterAllProducts() {
    this.filteredProducts$ = this.products$;
  }

  filterProductsByPriceRange(priceRange: PriceRange) {
    this.filteredProducts$ = this.products$.pipe(
      map(products => products.filter(product => (product.price >= priceRange.minValue && product.price <= priceRange.maxValue)))
    );
  }

  filterProductsByBrand(brandfilter: number) {
    this.filteredProducts$ = this.products$.pipe(
      map(products => products.filter(product => product.brandId.toString() === brandfilter.toString()))
    );
  }

  filterProductsByRating(minRating: number) {
    this.filteredProducts$ = this.products$.pipe(
      map(products => products.filter(product => product.rating >= minRating))
    );
  }

  filterProductsByCategory(categoryFilter: number) {
    this.filteredProducts$ = this.products$.pipe(
      map(products => products.filter(product => product.categoryId.toString() === categoryFilter.toString()))
    );
  }

  addToWishlist(id: number) {
    if(!this.wishList.includes(id)) {
      this.wishList.push(id);
    } else {
      const removeIndex = this.wishList.indexOf(id);
      this.wishList.splice(removeIndex, 1);
    }
    this.filterService.updateWishlist(this.wishList);
  }

  getwishList() {
    this.filterService.wishlist$.subscribe({
      next: (res)=> {
        this.wishList = res;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  addToCart(id: number) {
    this.addToCartList.push(id);
    this.filterService.updateAddToCart(this.addToCartList);
  }
}
