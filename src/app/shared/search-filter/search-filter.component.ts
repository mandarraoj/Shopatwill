import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FilterEnum, Reference } from '../../models/common.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatchWidthDirective } from '../../sidebar/match-width.directive';
import { MainService } from '../../services/main.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, MatchWidthDirective],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {

  @Input() title: string ='';
  @Input() options: Reference[] = [];
  @ViewChild('searchInput') searchInput!: ElementRef;
  filterEnum = FilterEnum;

  constructor(private filterService: FilterService){}

  filteredOptions: Reference[] = [];
  searchText = '';
  selectedOption = '';
  selectedOptionId?: number;

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectOption(option: Reference) {
    console.log(option);
    this.selectedOption = option.name;
    this.selectedOptionId = option.id;
    this.searchInput.nativeElement.value = this.selectedOption;
    this.filteredOptions = [];
    this.filterService.updateFilterOption({label: this.filterEnum.BRAND, value: this.selectedOptionId});
  }

}
