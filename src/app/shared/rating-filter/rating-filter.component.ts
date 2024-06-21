import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageSources } from './image-sources';
import { FilterEnum } from '../../models/common.model';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-rating-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-filter.component.html',
  styleUrl: './rating-filter.component.scss'
})
export class RatingFilterComponent {
  filterEnum = FilterEnum;
  ratings: number[] = [1,2,3,4,5];
  imageSources: ImageSources = new ImageSources();
  selectedOption?: number;
  rating1Selected = false;
  rating2Selected = false;
  rating3Selected = false;
  rating4Selected = false;

  constructor(private filterService: FilterService){}

  selectRating(rating: number) {
    this.selectedOption = rating;
    switch (rating) {
      case 4:
          this.rating4Selected = !this.rating4Selected;
          this.rating1Selected = false;
          this.rating2Selected = false;
          this.rating3Selected = false;
        break;

      case 3:
          this.rating3Selected = !this.rating3Selected;
          this.rating1Selected = false;
          this.rating2Selected = false;
          this.rating4Selected = false;
        break;

      case 2:
          this.rating2Selected = !this.rating2Selected;
          this.rating1Selected = false;
          this.rating3Selected = false;
          this.rating4Selected = false;
        break;
    
      default:
          this.rating1Selected = !this.rating1Selected;
          this.rating2Selected = false;
          this.rating3Selected = false;
          this.rating4Selected = false;
        break;
    }
    console.log(this.selectedOption);
    this.filterService.updateFilterOption({label: this.filterEnum.RATING, value: this.selectedOption});
  }

  isFilterSelected(state: boolean) {
    return state ? 'btn-select' : '';
  }
}
