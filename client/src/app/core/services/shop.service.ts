import { ShopParams } from './../../shared/models/shop-params';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private http = inject(HttpClient);

  private brands$!: Observable<string[]>;
  private types$!: Observable<string[]>;

  getProducts(shopParams: ShopParams) {
    console.log('🚀 ~ ShopService ~ getProducts ~ shopParams:', shopParams);
    let params = new HttpParams();

    if (shopParams.brands && shopParams.brands.length > 0) {
      params = params.append('brands', shopParams.brands.join(','));
    }

    if (shopParams.types && shopParams.types.length > 0) {
      params = params.append('types', shopParams.types.join(','));
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageIndex);

    return this.http.get<Pagination<Product>>(`${environment.baseUrl}/products`, { params });
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`);
  }

  getBrands() {
    if (!this.brands$) {
      this.brands$ = this.http
        .get<string[]>(`${environment.baseUrl}/products/brands`)
        .pipe(shareReplay(1));
    }
    return this.brands$;
  }

  getTypes() {
    if (!this.types$) {
      this.types$ = this.http
        .get<string[]>(`${environment.baseUrl}/products/types`)
        .pipe(shareReplay(1));
    }
    return this.types$;
  }
}
