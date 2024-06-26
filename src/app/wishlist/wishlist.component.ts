import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Product } from '../models/common.model';
import { MainService } from '../services/main.service';
import { CommonModule } from '@angular/common';
import { UtilitiesService } from '../shared/utilities/utilities.service';

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

  constructor(private filterService: FilterService, private mainService: MainService, public utilitesService: UtilitiesService) {}

  ngOnInit(): void {
    this.getwishList();
  }

  getwishList() {
    this.filterService.wishlist$.subscribe({
      next: (res)=> {
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
        this.wishlistProducts = res.filter(e => idList.includes(e.id));
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  removeFromWishlist(id: number) {
    const removeIndex = this.wishListIds.indexOf(id);
    this.wishListIds.splice(removeIndex, 1);
    this.filterService.updateWishlist(this.wishListIds);
  }

  addToCart(id: number) {
    this.addToCartList.push(id);
    this.filterService.updateAddToCart(this.addToCartList);
  }
}
 