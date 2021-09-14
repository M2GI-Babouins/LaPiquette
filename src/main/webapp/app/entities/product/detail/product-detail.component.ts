/* eslint-disable spaced-comment */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataUtils } from 'app/core/util/data-util.service';

import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | null = null;

  productAdded = false;

  constructor(protected activatedRoute: ActivatedRoute, protected dataUtils: DataUtils) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.product = product;
    });
  }

  public addToCart(product?: IProduct): void {
    console.log('Product added to cart : ' + product?.name);
    this.productAdded = true;
  }

  public removeFromCart(product?: IProduct): void {
    console.log('Product removed from cart : ' + product?.name);
    this.productAdded = false;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
