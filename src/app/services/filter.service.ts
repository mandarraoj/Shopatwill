import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterOption, PriceRange } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterOption$ = new BehaviorSubject<FilterOption | null>(null);
  filterByOption$ = this.filterOption$.asObservable();

  private wishlistSubject$ = new BehaviorSubject<number[]>([]);
  wishlist$ = this.wishlistSubject$.asObservable();

  private addToCartSubject$ = new BehaviorSubject<number[]>([]);
  addToCartObs$ = this.addToCartSubject$.asObservable();

  private priceRangeSubject$ = new BehaviorSubject<PriceRange>({minValue: 0, maxValue: 10000});
  priceRange$ = this.priceRangeSubject$.asObservable();

  constructor() { }

  updateFilterOption(filterOption: FilterOption){
    this.filterOption$.next(filterOption);
  }

  updateWishlist(productIdList: number[]) {
    this.wishlistSubject$.next(productIdList);
  }

  updateAddToCart(productIdList: number[]) {
    this.addToCartSubject$.next(productIdList);
  }

  updatePriceRange(priceRange: PriceRange) {
    this.priceRangeSubject$.next(priceRange);
  }
}
