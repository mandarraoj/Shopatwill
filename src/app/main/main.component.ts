import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { FilterEnum, PriceRange, Product } from '../models/common.model';
import { CommonModule } from '@angular/common';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { FilterService } from '../services/filter.service';
import { UtilitiesService } from '../shared/utilities/utilities.service';
import { CounterComponent } from '../shared/counter/counter.component';
import { AppState } from '../states/app.state';
import { Store } from '@ngrx/store';
import { getAllproducts } from '../states/products/product.action';
import { selecProductError, selectAllProducts } from '../states/products/product.selector';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, CounterComponent],
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
  error!: Observable<string | null>; 

  constructor(private store: Store<AppState>,private mainService:MainService, private filterService: FilterService, public utilitiesService: UtilitiesService) {}

  ngOnInit(): void {
    this.getProductsData();
    this.getwishList();
  }

  getProducts() {
    this.store.dispatch(getAllproducts());
    this.products$ = this.store.select(selectAllProducts);
    this.error = this.store.select(selecProductError);
    this.error.subscribe((err) => {
      console.log("State Management Error: ", err);
    });
    this.products$.subscribe((res)=> {
      console.log('State Management is Working!!!: ', res);
      this.productList = res;
    });
  }

  getProductsData() {
    this.filterService.filterByOption$.subscribe({
      next: (res)=> {
        const filterOption = res;
        switch (filterOption?.label) {
          case this.filterEnum.BRAND:
            this.getProductsByBrand(filterOption.value as number);
            break;
          
          case this.filterEnum.RATING:
            this.getProductsByRating(filterOption.value as number);
            break;

          case this.filterEnum.CATEGORY:
            filterOption.value != 0 ? this.getProductsByCategory(filterOption.value as number) : this.getProducts();
            break;

          case this.filterEnum.PRICE_RANGE:
            this.getProductsByPriceRange(filterOption.value as PriceRange);
            break;
      
          default:
            this.getProducts();
            break;
        }
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  getProductsByPriceRange(priceRange: PriceRange) {
    this.mainService.getProducts().subscribe({
      next: (res)=> {
        this.productList = res.filter(e => (e.price >= priceRange.minValue && e.price <= priceRange.maxValue));
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  getProductsByBrand(brandfilter: number) {
    this.mainService.getProductsByBrand(brandfilter).subscribe({
      next: (res)=> {
        this.productList = res;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  getProductsByRating(minRating: number) {
    this.mainService.getProductsByRating(minRating).subscribe({
      next: (res)=> {
        this.productList = res;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  getProductsByCategory(categoryFilter: number) {
    this.mainService.getProductsByCategory(categoryFilter).subscribe({
      next: (res) => {
        this.productList = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
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
