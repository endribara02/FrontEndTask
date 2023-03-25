import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoopingCart } from '../models/categories.model';
import { CategoryService } from '../services/category.service';
import { SuccessPageComponent } from '../shared/success-page/success-page.component';

@Component({
  selector: 'app-shooping-cart',
  templateUrl: './shooping-cart.component.html',
  styleUrls: ['./shooping-cart.component.scss']
})
export class ShoopingCartComponent implements OnInit {

  totali = 0;
  checked = true;

  constructor(
    public dialogRef: MatDialogRef<ShoopingCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoopingCart[],
    private dialog: MatDialog,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal() {
    this.totali = 0;
    this.data.forEach(ele => {
      if(ele.checked)  {
        this.totali += (ele.quantity * ele.unitPrice);
      }
    })
  }

  closeDialog() {
    for(let i = 0; i < this.data.length; i++) {
      if(this.data[i].checked == false) {
        this.data.splice(i, 1); 
      }
    }
    this.categoryService.editShoppingCart(this.data);
    this.dialogRef.close(true);
  }

  pay() {
    for(let i = 0; i < this.data.length; i++) {
      if(this.data[i].checked == false) {
        this.data.splice(i, 1); 
      }
    }
    this.categoryService.editShoppingCart(this.data);

    this.dialogRef.close(false);
    const dialogRef = this.dialog.open(SuccessPageComponent, {
      panelClass: 'div-bkg',
      width: '312px',
      data: {title: "Fatura e paguar me sukses", description: "Ju faleminderit qe na besuat"}
    });

  }

  checkItem(checked: any, i: any) {
    this.data[i].checked = checked;
    this.getTotal()
  }

}
