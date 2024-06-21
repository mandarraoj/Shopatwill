import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { FilterEnum, Product } from '../models/common.model';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FilterService } from '../services/filter.service';

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
  constructor(private mainService:MainService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  getProducts() {
    this.mainService.getProducts().subscribe({
      next: (res)=> {
        this.productList = res;
        console.log('prodcuct List: ', this.productList);
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  getProductsData() {
    this.filterService.filterByOption$.subscribe({
      next: (res)=> {
        console.log('filterOptions: ', res);
        const filterOption = res;
        switch (filterOption?.label) {
          case this.filterEnum.BRAND:
            this.getProductsByBrand(filterOption.value);
            break;
          
          case this.filterEnum.RATING:
            this.getProductsByRating(filterOption.value);
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

  getProductsByBrand(brandfilter: number) {
    this.mainService.getProductsByBrand(brandfilter).subscribe({
      next: (res)=> {
        console.log('get products by brands', res);
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
        console.log('get products by rating', res);
        this.productList = res;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  statusByRating(rating: number) {
    return rating >=3.5 && rating <=5 ? 'good-rating' : (rating >= 2 && rating < 3.5 ? 'average-rating' : 'poor-rating')
  }

  addToWishlist(id: number) {
    if(!this.wishList.includes(id)) {
      this.wishList.push(id);
    } else {
      const removeIndex = this.wishList.indexOf(id);
      this.wishList.splice(removeIndex, 1);
    }
    console.log('Wishlist: ', this.wishList);
    this.filterService.updateWishlist(this.wishList);
  }

  addToCart(id: number) {
    this.addToCartList.push(id);
    console.log('addToCartList: ', this.addToCartList);
    this.filterService.updateAddToCart(this.addToCartList);
  }
}
