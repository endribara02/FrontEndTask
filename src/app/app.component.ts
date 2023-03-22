import { Component, OnInit } from '@angular/core';
import { BusinessModel } from './models/categories.model';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FrontEndTask';

  constructor() {}

  ngOnInit(): void {
  }


}
