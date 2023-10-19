import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { IProducts } from '../models/products';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  constructor(private route: ActivatedRoute) {}

  product!: IProducts;
  productSubscription!: Subscription;

  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
    })
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}