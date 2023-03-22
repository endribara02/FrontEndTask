import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuccessPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  close(){
    this.categoryService.editShoppingCart([]);
    this.dialogRef.close();
  }
}
