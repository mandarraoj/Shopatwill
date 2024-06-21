import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Product } from '../models/common.model';
import { MainService } from '../services/main.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishListIds: number[] = [];
  wishlistProducts: Product[] = [];
  addToCartList: number[] = [];

  constructor(private filterService: FilterService, private mainService: MainService) {}

  ngOnInit(): void {
    this.getwishList();
  }

  getwishList() {
    this.filterService.wishlist$.subscribe({
      next: (res)=> {
        console.log('wishlist Res: ', res);
        this.wishListIds = res;
        this.getProducts(this.wishListIds);
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  getProducts(idList:number[]) {
    this.mainService.getProducts().subscribe({
      next: (res)=> {
        console.log('products: ', res);
        this.wishlistProducts = res.filter(e => idList.includes(e.id));
        console.log('Filtered wishlist: ', this.wishlistProducts);
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  // getProductsByIds(ids: number[]) {
  //   this.mainService.getProductsByIds(ids).subscribe({
  //     next: (res)=> {
  //       console.log('prodcut List Res: ', res);
  //       this.wishlistProducts = res;
  //     },
  //     error: (err)=> {
  //       console.log(err);
  //     }
  //   });
  // }

  statusByRating(rating: number) {
    return rating >=3.5 && rating <=5 ? 'good-rating' : (rating >= 2 && rating < 3.5 ? 'average-rating' : 'poor-rating')
  }

  removeFromWishlist(id: number) {
    const removeIndex = this.wishListIds.indexOf(id);
    this.wishListIds.splice(removeIndex, 1);
    console.log('wishListIds: ', this.wishListIds);
    this.filterService.updateWishlist(this.wishListIds);
  }

  addToCart(id: number) {
    this.addToCartList.push(id);
    console.log('addToCartList: ', this.addToCartList);
    this.filterService.updateAddToCart(this.addToCartList);
  }
}
 