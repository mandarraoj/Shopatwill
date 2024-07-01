import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppState } from '../states/app.state';
import { Observable } from 'rxjs';
import { selectCount } from '../states/counter/counter.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  wishlist: number[] = [];
  addTocartIdsList: number[] = [];
  count$: Observable<number>;

  constructor(private filterService: FilterService, private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
  }

  ngOnInit(): void {
    this.getwishList();
    this.getaddToCartIdsList();
  }

  getwishList() {
    this.filterService.wishlist$.subscribe({
      next: (res)=> {
        this.wishlist = res;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  getaddToCartIdsList() {
    this.filterService.addToCartObs$.subscribe({
      next: (res)=> {
        this.addTocartIdsList = res;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }
}
