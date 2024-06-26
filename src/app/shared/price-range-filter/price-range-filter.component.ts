import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { FilterEnum, PriceRange } from '../../models/common.model';

@Component({
  selector: 'app-price-range-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './price-range-filter.component.html',
  styleUrl: './price-range-filter.component.scss'
})
export class PriceRangeFilterComponent {

  minPrice: number = 0;
  maxPrice: number = 100000;
  selectedMinPrice: number = this.minPrice;
  selectedMaxPrice: number = this.maxPrice;
  filterEnum = FilterEnum;

  constructor(private filterService: FilterService) {}
  
  updatePriceRange(event: Event, type: string) {
    const eventTarget = event.target as HTMLInputElement;
    const value = Number(eventTarget.value);
    if (type === 'min') {
      this.selectedMinPrice = value;
      if (this.selectedMinPrice >= this.selectedMaxPrice) {
        this.selectedMinPrice = this.selectedMaxPrice - 1;
      }
    } else if (type === 'max') {
      this.selectedMaxPrice = value;
      if (this.selectedMaxPrice <= this.selectedMinPrice) {
        this.selectedMaxPrice = this.selectedMinPrice + 1;
      }
    }
    const priceRange: PriceRange = {minValue: this.selectedMinPrice, maxValue: this.selectedMaxPrice};
    this.filterService.updateFilterOption({label: this.filterEnum.PRICE_RANGE, value: priceRange});
  }
}
