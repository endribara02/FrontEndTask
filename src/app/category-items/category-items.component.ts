import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BusinessModel, Categories, Product, ShoopingCart } from '../models/categories.model';
import { CategoryService } from '../services/category.service';
import { ShoopingCartComponent } from '../shooping-cart/shooping-cart.component';
import { Carousel } from "bootstrap";
import { bounceInDownAnimation } from 'angular-animations';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
  animations: [
    bounceInDownAnimation()
  ]
})
export class CategoryItemsComponent implements OnInit, AfterViewInit {

  products!: Product[];
  categoryId: any;

  shoopingCart!: ShoopingCart[];
  carouselItems: any = [];

  totalItems = 0;

  showSpinner = true;

  animationState: Array<boolean> = [false,false,false,false,false,false];

  @ViewChild("carouselExampleSlidesOnly") carouselElement!: ElementRef<HTMLElement>;

  carouselRef!: Carousel;

  constructor(
    private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { 
      this.route.params.subscribe(params => {
        this.categoryId = params['id'];
      })
    }

  ngOnInit(): void {
    this.getCategoryItemsById();
    this.getShoppingCart();
  }

  ngAfterViewInit() {
    // this.carouselRef = new Carousel(this.carouselElement.nativeElement, {
    //   interval: 500
    // });
  }

    animate(i: any) {
    this.animationState[i] = false;
    setTimeout(() => {
      this.animationState[i] = true;
    }, 1);
  }

  getShoppingCart() {
    this.categoryService.castShoppingCartList.subscribe(shopCart => this.shoopingCart = shopCart);
    this.totatItemsInCart();
  }

  getCategoryItemsById() {
    this.categoryService.getCategories()
      .subscribe((res: BusinessModel) => {
        res.categories.filter((s: Categories) => {
          if(s.id == this.categoryId){
            s.products.forEach(element => {
              element['quantity'] = 0;
              element['checked'] = true;
              element['color'] = this.getRandomColor();
            });
            this.products = s.products;
          }
          setTimeout(() => {
            this.getShoppingCartSavedItems();
            this.getCarouselItems();
          }, 500);

        }) 
      })
  }

  getCarouselItems() {

    let chunk = 6;

    this.carouselItems= [];
    for(var i = 0; i < this.products.length; i += chunk) {
      let obj = {
        'slide' :this.products.slice(i, i+chunk)
      }
      this.carouselItems.push(obj);
    }
    this.showSpinner = false;
    setTimeout(() => {
      this.carouselRef = new Carousel(this.carouselElement.nativeElement, {
        touch: true,
        interval: 500
      });
    }, 100);
  }

  nextSlide() {
    this.carouselRef.next();
  }

  prevSlide() {
    this.carouselRef.prev();
  }

  addToShoppingCart(){
    this.categoryService.editShoppingCart(this.shoopingCart);
  }

  getShoppingCartSavedItems() {
    if(this.shoopingCart.length > 0)
    this.categoryService.castShoppingCartList.subscribe(res => {
      this.shoopingCart = res;
      res.forEach(ele => {
        this.products.forEach(element => {
          if(ele.name == element.name){
            element.quantity = ele.quantity;
          }
        })
      })
    })
  }

  addItem(i: any, j: any, product: Product) {

    this.totalItems = 0;
    let index = i + (6 * j) 
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
    // this.animate();
    this.addToShoppingCart();
    this.totatItemsInCart();
  }

  removeItem(i: any, j: any, product: Product) {
    let index = i + (6 * j) 
    this.products[index].quantity -= 1;

    for(let k = 0; k < this.shoopingCart.length; k++) {
      if(this.shoopingCart[k].name == product.name) {
        if(this.shoopingCart[k].quantity == 0) {
          this.shoopingCart.splice(k,1);
        }
      }
    }
    this.addToShoppingCart();
    this.totatItemsInCart();
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
      panelClass: 'div-bkg',
      width: '350px',
      data: this.shoopingCart
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showSpinner = true;
      if(result){
        this.carouselItems= [];
        this.getCategoryItemsById();
        this.getShoppingCart();
      }
    });
  }

  randomIntFromInterval() { 
    return Math.floor(Math.random() * (180 - 70 + 1) + 100)
  }

  getRandomColor() {
    return "#" + ("0" + this.randomIntFromInterval().toString(16)).slice(-2) + ("0" + this.randomIntFromInterval().toString(16)).slice(-2) + ("0" + this.randomIntFromInterval().toString(16)).slice(-2);
  }
}
