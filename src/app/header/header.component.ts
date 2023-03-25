import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ColorSchemeE, ColorThemeService } from '../services/color-theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  currentTheme: ColorSchemeE;

  isCategoryItem: boolean = false;

   @Input() totalItems : any; 
   @Output() openCart: EventEmitter<any>= new EventEmitter(); 
  
  constructor(
    private colorThemeService: ColorThemeService,
    public router: Router) { 

    this.currentTheme = this.colorThemeService.get();
    setTimeout(() => {
      console.log(this.router.url);
    }, 500);

  }

  ngOnInit(): void {
  }

  changeTheme() {

    if(this.currentTheme == ColorSchemeE.Light) {
      this.colorThemeService.set(ColorSchemeE.Dark);
      this.currentTheme = ColorSchemeE.Dark;
    } else {
      this.colorThemeService.set(ColorSchemeE.Light);
      this.currentTheme = ColorSchemeE.Light;
    }
  }

  openShoppingCart() {
    this.openCart.emit();
  }
}
