import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { FilterService } from '../services/filter.service';
import { Product } from '../models/common.model';
import { CommonModule } from '@angular/common';

export interface Cart {
  product: Product,
  occurrence: number,
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartListIds: number[] = [];
  addedToCartProducts: Cart[] = [];
  addToCartList: number[] = [];

  constructor(private filterService: FilterService, private mainService: MainService) {}

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList() {
    this.filterService.addToCartObs$.subscribe({
      next: (res)=> {
        console.log('cart list Res: ', res);
        this.cartListIds = res;
        this.getProducts(this.cartListIds);
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
        let productsList = [];
        productsList = res.filter(e => idList.includes(e.id));

        const occurrenceMap = new Map<number, number>();

        idList.forEach(element => {
          if (occurrenceMap.has(element)) {
            occurrenceMap.set(element, occurrenceMap.get(element)! + 1);
          } else {
            occurrenceMap.set(element, 1);
          }
        });
        console.log('occuranceMap: ',occurrenceMap);

        occurrenceMap.forEach((value, key) => {
          const product = productsList.filter(e => e.id === key);
          const isProductPresent = this.addedToCartProducts.filter(e => product[0].id === e.product.id);
          if(product.length > 0 && isProductPresent.length > 0) {
            this.addedToCartProducts.map(e => {
              if(isProductPresent[0].product.id === e.product.id) {
                e.occurrence = value;
              }
            });
          } else {
            this.addedToCartProducts.push({ product: product[0], occurrence: value });
          }
        });
        console.log('Filtered cart list: ', this.addedToCartProducts);
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  addToCart(productId: number) {
    this.cartListIds.push(productId);
    console.log('cartListIds: ', this.cartListIds);
    this.filterService.updateAddToCart(this.cartListIds);
  }

  removeFromCart(productId: number) {
    const removeIndex = this.cartListIds.indexOf(productId);
    this.cartListIds.splice(removeIndex, 1);
    this.addedToCartProducts = this.addedToCartProducts.filter(e => productId !== e.product.id);

    this.filterService.updateAddToCart(this.cartListIds);
  }

  subTotalCalculator(price: number, multiplier: number) {
    return price * multiplier;
  }
}
