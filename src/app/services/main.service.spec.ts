import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

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
});
