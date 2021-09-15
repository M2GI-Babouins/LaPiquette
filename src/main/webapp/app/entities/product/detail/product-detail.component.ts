/* eslint-disable @typescript-eslint/no-unsafe-return */
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
  quantity!: number;

  product: IProduct | null = null;

  panierLocal: any = [];

  productAdded = false;

  constructor(protected activatedRoute: ActivatedRoute, protected dataUtils: DataUtils, protected productService: ProductService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.product = product;
    });

    this.panierLocal = this.productService.getPanier();
  }

  public addToCart(product: IProduct): void {
    this.productAdded = true;
    this.productService.ajouterPanier(product, this.quantity);
  }

  public removeFromCart(product: IProduct): void {
    this.productAdded = false;
    this.productService.removeFromPanier(product);
  }

  public removeCart(): void {
    this.productService.removePanier();
  }

  public afficherSuppression(product: IProduct): boolean {
    return this.productService.isInCart(product);
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
