import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { FilterService } from '../services/filter.service';
import { FilterEnum, FilterOption, Reference } from '../models/common.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  categories: Reference[] = [];
  filterEnum = FilterEnum;
  constructor(private mainService: MainService, private filterService: FilterService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.mainService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectCategory(id: number) {
    const filterOptions:FilterOption = {label: this.filterEnum.CATEGORY, value: id};
    this.filterService.updateFilterOption(filterOptions);
  }

}
