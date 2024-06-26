import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
    statusByRating(rating: number) {
        return rating >=3.5 && rating <=5 ? 'good-rating' : (rating >= 2 && rating < 3.5 ? 'average-rating' : 'poor-rating')
    }
}