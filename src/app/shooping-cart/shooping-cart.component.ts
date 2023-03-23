import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoopingCart } from '../models/categories.model';
import { SuccessPageComponent } from '../shared/success-page/success-page.component';

@Component({
  selector: 'app-shooping-cart',
  templateUrl: './shooping-cart.component.html',
  styleUrls: ['./shooping-cart.component.scss']
})
export class ShoopingCartComponent implements OnInit {

  totali = 0;
  checked = true;

  constructor(public dialogRef: MatDialogRef<ShoopingCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoopingCart[],
    private dialog: MatDialog) { }

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
    this.dialogRef.close();
  }

  pay() {
    this.closeDialog();
    const dialogRef = this.dialog.open(SuccessPageComponent, {
      panelClass: 'div-bkg',
      width: '90%',
      data: {title: "Fatura u pagua me sukses!", description: "Faleminderit qe na besuat"}
    });

  }

  checkItem(checked: any, i: any) {
    this.data[i].checked = checked;
    this.getTotal()
  }

}
