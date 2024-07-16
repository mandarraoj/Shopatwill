import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Reference } from '../models/common.model';

describe('MainService', () => {
  let service: MainService;
  let httpClientMock: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
      MainService,
      {provide: HttpClient, useValue: { get: jest.fn()}}
    ]
    });
    service = TestBed.inject(MainService);
    httpClientMock = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the brands when brand filter is applied', (done) => {
    const res = [{
      "id": 1,
      "name": "Nike"
    },
    {
      "id": 2,
      "name": "Adidas"
    },
    {
      "id": 3,
      "name": "Samsung"
    }];
    const baseUrl = 'http://localhost:3000/';
    const url = `${baseUrl}brands`;
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(res));
    service.getBrands().subscribe({
      next: (data)=> {
        expect(data).toEqual(res);
        done();
      },
      error: (err)=> console.log(err)
    });
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  });

  it('should give error for no brands are fetched when brand filter is applied', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: '404 Error',
      status: 404,
      statusText: 'Not Found!'
    });
    const baseUrl = 'http://localhost:3000/';
    const url = `${baseUrl}brands`;
    jest.spyOn(httpClientMock, 'get').mockReturnValue(throwError(() => errorResponse));
    service.getBrands().subscribe({
      next: (data)=> console.log(data),
      error: (err)=> {
        expect(err).toContain('404 Not Found!');
        done();
      }
    });
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  });

  it('should fetch the categories when category filter is applied', (done) => {
    const res = [
      {
        "id": 0,
        "name": "All"
    },
    {
        "id": 1,
        "name": "Mobile"
    },
    ];
    const baseUrl = 'http://localhost:3000/';
    const url = `${baseUrl}categories`;
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(res));
    service.getCategories().subscribe({
      next: (data)=> {
        expect(data).toEqual(res);
        done();
      },
      error: (err)=> console.log(err)
    });
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  });

  it('should give error for no categories are fetched when category filter is applied', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: '404 Error',
      status: 404,
      statusText: 'Not Found!'
    });
    const baseUrl = 'http://localhost:3000/';
    const url = `${baseUrl}categories`;
    jest.spyOn(httpClientMock, 'get').mockReturnValue(throwError(() => errorResponse));
    service.getCategories().subscribe({
      next: (data)=> console.log(data),
      error: (err)=> {
        expect(err).toContain('404 Not Found!');
        done();
      }
    });
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  });

  it('should fetch all the products', (done) => {
    const res = [
      {
        "id": 1,
        "name": "Nike Sneaker Phantom 2",
        "price": 15000,
        "rating": 1,
        "categoryId": 5,
        "brandId": 1,
        "image":"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ff3766b5-59dd-4b9e-b755-751a3785d64d/court-vision-low-shoes-nRP2tZ.png",
        "description":"This is Nike's newly launched Shoes for mainly trekking and hiking purposes. With Ergonomic and slick design, It has tight grip makes it very much suitable for trekking activities."
      },
      {
        "id": 2,
        "name": "Adidas Sports GX7",
        "price": 2000,
        "rating": 2,
        "categoryId": 5,
        "brandId": 2,
        "image":"https://m.media-amazon.com/images/I/71wvP3YGFYL._AC_UL320_.jpg",
        "description":"These are Adidas' budget friendly Shoes for All the sport activities. It has better grip and robust design. Soft Coushning inside and hard soul outside keeps your feet stable."
      },
    ];
    const baseUrl = 'http://localhost:3000/';
    const url = `${baseUrl}products`;
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(res));
    service.getProducts().subscribe({
      next: (data)=> {
        expect(data).toEqual(res);
        done();
      },
      error: (err)=> console.log(err)
    });
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  });

  it('should give error for no products are fetched when no products are received', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: '404 Error',
      status: 404,
      statusText: 'Not Found!'
    });
    const baseUrl = 'http://localhost:3000/';
    const url = `${baseUrl}products`;
    jest.spyOn(httpClientMock, 'get').mockReturnValue(throwError(() => errorResponse));
    service.getProducts().subscribe({
      next: (data)=> console.log(data),
      error: (err)=> {
        expect(err).toContain('404 Not Found!');
        done();
      }
    });
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  });

});
