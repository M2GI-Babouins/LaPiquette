/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from '../product.model';

@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | null = null;
  productAdded = false;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.product = product;
    });
  }

  previousState(): void {
    window.history.back();
  }

  public addToCart(product: IProduct): void {
    console.log('Product added to cart : ' + product.name);
    this.productAdded = true;
  }

  public removeFromCart(product: IProduct): void {
    console.log('Product removed from cart : ' + product.name);
    this.productAdded = false;
  }
}
