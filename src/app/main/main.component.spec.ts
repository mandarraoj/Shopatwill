import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MainComponent } from './main.component';
import { Product } from '../models/common.model';
import { selectAllProducts } from '../states/products/product.selector';
import { AppState } from '../states/app.state';
import { getAllproducts } from '../states/products/product.action';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let store: MockStore<AppState>;

  const products: Product[] = [
    {
      id: 1,
      name: "Nike Sneaker Phantom 2",
      price: 15000,
      rating: 1,
      categoryId: 5,
      brandId: 1,
      image:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ff3766b5-59dd-4b9e-b755-751a3785d64d/court-vision-low-shoes-nRP2tZ.png",
      description:"This is Nike's newly launched Shoes for mainly trekking and hiking purposes. With Ergonomic and slick design, It has tight grip makes it very much suitable for trekking activities."
    },
    {
        id: 2,
        name: "Adidas Sports GX7",
        price: 2000,
        rating: 2,
        categoryId: 5,
        brandId: 2,
        image:"https://m.media-amazon.com/images/I/71wvP3YGFYL._AC_UL320_.jpg",
        description:"These are Adidas' budget friendly Shoes for All the sport activities. It has better grip and robust design. Soft Coushning inside and hard soul outside keeps your feet stable."
    },
    {
        id: 3,
        name: "Samsung S24 Ultra",
        price: 5000,
        rating: 3.5,
        categoryId: 1,
        brandId: 3,
        image:"https://m.media-amazon.com/images/I/81vxWpPpgNL._SX679_.jpg",
        description:"All time Android Lover's first choice. Best camera phone with 48 Megapixel rear triple camera and 32 megapixel front camera. 200x Zoom level makes great shots and Qualcomm Octa core processor makes it much faster than any other android phone in the market."
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [provideMockStore({
        initialState: {initialProductState: { products: [] }},
        selectors: [{selector: selectAllProducts, value: products}]
      })],
    })
    .compileComponents();
    
    store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all products when component is loaded', () => {
    const spy = jest.spyOn(component, 'getProducts');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should load all products when no filter is applied', () => {
    const action = getAllproducts();
    const spy = jest.spyOn(component, 'getFilteredProducts');
    component.getProducts();
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
