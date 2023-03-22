import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessModel, Categories } from '../models/categories.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories!: Categories[];
  categoriesBackup!: Categories[];

  darkMode = false;

  searchInput: any;

  constructor(
    private categoryService: CategoryService, 
    private router: Router
    ) { }

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
}
