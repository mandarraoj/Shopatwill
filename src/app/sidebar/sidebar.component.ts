import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../services/main.service';
import { Reference } from '../models/common.model';
import { Subscription } from 'rxjs';
import { SearchFilterComponent } from '../shared/search-filter/search-filter.component';
import { RatingFilterComponent } from '../shared/rating-filter/rating-filter.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SearchFilterComponent, RatingFilterComponent],
  providers: [MainService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;
  brands:Reference[] = [];
  brandsSubscription: Subscription = new Subscription(); 

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandsSubscription = this.mainService.getBrands().subscribe({
      next: (res)=> {
        this.brands = res;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  unSubscribeAll() {
    this.brandsSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unSubscribeAll();
  }
}
