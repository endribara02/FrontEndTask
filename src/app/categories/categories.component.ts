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

  showSpinner = true;

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    ) {}

  ngOnInit(): void {

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((res: BusinessModel) => {
        this.categories = res.categories;
        this.categoriesBackup = res.categories;
        this.showSpinner = false;
      })
  }

  searchFilter() {
    this.categories = this.categoriesBackup;
    if(this.searchInput != ''){
      this.categories = this.categories.filter((elem) => {
        if(elem.name.toLowerCase().includes(this.searchInput.toLowerCase())) return elem.name.toLowerCase().includes(this.searchInput.toLowerCase())
        else return  elem['products'].some((ele) => {
        return ele.name.toLowerCase().includes(this.searchInput.toLowerCase())
      
        })
      })
    } 
  }

  goToItems(id: any) {
    this.router.navigate(['/category-items',id])
  }
}
