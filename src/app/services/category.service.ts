import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessModel, ShoopingCart } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  private shoppingCartList = new BehaviorSubject<Array<ShoopingCart>>([]);

  castShoppingCartList = this.shoppingCartList.asObservable();

  editShoppingCart(newShoppingCart: ShoopingCart[]){
    this.shoppingCartList.next(newShoppingCart); 
  }

  getCategories(): Observable<BusinessModel> {
    return this.http.get<BusinessModel>("https://test.dev.al/test/");
  }
}
