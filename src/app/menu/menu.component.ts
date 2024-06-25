import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { FilterService } from '../services/filter.service';
import { Reference } from '../models/common.model';
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
  constructor(private mainService: MainService, private filterService: FilterService){}

  ngOnInit(): void {
    this.mainService.getCategories().subscribe(res => {
      console.log('Categories: ', res);
      this.categories = res;
    });
  }

  selectCategory(id: number) {
    this.filterService.updateCategory(id);
  }

}
