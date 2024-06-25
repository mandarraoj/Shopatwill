import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product, Reference } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Reference[]> {
    const apiUrl = this.baseUrl+`brands`;
    return this.http.get<Reference[]>(apiUrl);
  }

  getCategories(): Observable<Reference[]> {
    const apiUrl = this.baseUrl+`categories`;
    return this.http.get<Reference[]>(apiUrl);
  }

  getProducts(): Observable<Product[]> {
    const apiUrl = this.baseUrl+`products`;
    return this.http.get<Product[]>(apiUrl);
  }

  getProductsByBrand(filterValue: number): Observable<Product[]> {
    console.log('Filter brandId: ', filterValue);
    const apiUrl = this.baseUrl+`products?brandId=${filterValue}`;
    return this.http.get<Product[]>(apiUrl);
  }

  getProductsByRating(minRating: number): Observable<Product[]> {
    console.log('minRating: ', minRating);
    let params = new HttpParams().set('rating_gte', minRating.toString());
    const apiUrl = this.baseUrl+`products`;
    return this.http.get<Product[]>(apiUrl, { params });
  }

  getProductsByIds(ids: number[]): Observable<Product[]> {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('id', id.toString());
    });
    console.log(params);
    const apiUrl = this.baseUrl+`products`;
    return this.http.get<Product[]>(apiUrl, {params});
  }
}
