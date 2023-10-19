import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { pipe, Subscription, switchMap, tap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { DialogComponent } from '../dialog/dialog.component';
import { IProducts } from '../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductsService, public dialog: MatDialog) {};

  products!: IProducts[];
  productsSubscription!: Subscription;
  dialogSubscription!: Subscription;
  deleteSubscription!: Subscription;

  ngOnInit(): void {
    this.productsSubscription = this.productService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  deleteItem(id: number) {
    this.deleteSubscription = this.productService.deleteProduct(id).pipe(
      switchMap(() => this.productService.getProducts()), // отримати оновлений список після видалення
      tap(products => this.products = products) // оновити відображення списку
    ).subscribe();
  }

  openDialog(): void {
    // створюєма дані, які будемо далі прокидати у DialofRef
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.disableClose = true; // модалка не буде закриватися при кліку поза її межами

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig)

    this.dialogSubscription = dialogRef.beforeClosed().subscribe((data) => { // перед закриттям перехоплюються дані і відправляються у функцію postData 
      if(data) // вказуємо, якщо є data, то постимо новий продукт, інакше просто закриваємо модалку
        this.postData(data);
    })
}

  postData(data: IProducts) {
    this.productService.postProduct(data).subscribe((data) => { // приймає дані і передає їх на сервер, і підписується щоб одразу обновити і передати їх у масив товарів, що відображаєтсья на сторінці
      this.products.push(data)
    })
  }

  ngOnDestroy() {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    if(this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }

    if(this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}