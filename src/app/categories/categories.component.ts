import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessModel, Categories } from '../models/categories.model';
import { CategoryService } from '../services/category.service';
import { ColorSchemeE, defaultColorScheme, ColorThemeService } from '../services/color-theme.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories!: Categories[];
  categoriesBackup!: Categories[];

  searchInput: any;

  currentTheme: ColorSchemeE;

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    private colorThemeService: ColorThemeService
    ) {
      this.currentTheme = this.colorThemeService.get();
      console.log(this.currentTheme);
     }

  ngOnInit(): void {

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((res: BusinessModel) => {
        this.categories = res.categories;
        this.categoriesBackup = res.categories;
      })
  }

  searchFilter() {
    this.categories = this.categoriesBackup;
    if(this.searchInput != ''){
      this.categories = this.categories.filter(s => s.name.toLowerCase().includes(this.searchInput.toLowerCase()));
    } 
  }

  goToItems(id: any) {
    this.router.navigate(['/category-items',id])
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
}
