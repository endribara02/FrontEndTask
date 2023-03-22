import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BusinessModel, Categories, Product, ShoopingCart } from '../models/categories.model';
import { CategoryService } from '../services/category.service';
import { ShoopingCartComponent } from '../shooping-cart/shooping-cart.component';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit {

  products!: Product[];
  categoryId: any;

  shoopingCart!: ShoopingCart[];

  totalItems = 0;

  constructor(
    private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { 
      this.route.params.subscribe(params => {
        this.categoryId = params['id'];
        console.log(this.categoryId);
      })
    }

  ngOnInit(): void {
    this.getCategoryItemsById();
    this.getShoppingCart();
  }

  getShoppingCart() {
    this.categoryService.castShoppingCartList.subscribe(shopCart => this.shoopingCart = shopCart);
    console.log(this.shoopingCart);
    this.totatItemsInCart();
  }

  getCategoryItemsById() {
    this.categoryService.getCategories()
      .subscribe((res: BusinessModel) => {
        console.log(res);
        res.categories.filter((s: Categories) => {
          if(s.id == this.categoryId){
            s.products.forEach(element => {
              element['quantity'] = 0;
              element['checked'] = true;
            });
            this.products = s.products;
          }
          console.log(this.products)
          this.getShoppingCartSavedItems();
        }) 
      })
  }

  addToShoppingCart(){
    this.categoryService.editShoppingCart(this.shoopingCart);
  }

  getShoppingCartSavedItems() {
    if(this.shoopingCart.length > 0)
    this.categoryService.castShoppingCartList.subscribe(res => {
      this.shoopingCart = res;
      res.forEach(ele => {
        console.log(this.products);
        this.products.forEach(element => {
          if(ele.name == element.name){
            element.quantity = ele.quantity;
          }
        })
      })
    })
  }

  addItem(index: any, product: Product) {

    this.totalItems = 0;

    this.products[index].quantity += 1;
    if(this.shoopingCart.length != 0){
      let found = false;
      this.shoopingCart.forEach(ele => {
        if(ele.name == product.name){
          found = true;
        } 
      });
      if(!found){
        this.shoopingCart.push(this.products[index]);
      }
    } else {
      this.shoopingCart.push(this.products[index]);
    }
    this.addToShoppingCart();
    this.totatItemsInCart();
    console.log(this.shoopingCart);
  }

  removeItem(index: any, product: Product) {
    this.products[index].quantity -= 1;

    for(let i = 0; i < this.shoopingCart.length; i++) {
      if(this.shoopingCart[i].name == product.name) {
        if(this.shoopingCart[i].quantity == 0) {
          this.shoopingCart.splice(i,1);
        }
      }
    }
    this.addToShoppingCart();
    this.totatItemsInCart();
    console.log(this.shoopingCart);
  }

  totatItemsInCart(){
    this.totalItems = 0;
    
    if(this.shoopingCart.length != 0){
      this.shoopingCart.forEach(ele => {
        this.totalItems += ele.quantity; 
      })
    }
  }

  openShoppingCart(){
    const dialogRef = this.dialog.open(ShoopingCartComponent, {
      width: '90%',
      data: this.shoopingCart
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getShoppingCart();
    });
  }
}
