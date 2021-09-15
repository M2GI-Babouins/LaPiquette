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
  //
  quantity: any;

  //initialisation sans back end
  product: IProduct = {
    id: 1,
    name: 'Bleu',
    price: 25000,
    year: 25,
    region: 'Poitou-Charante',
    type: 'Rouge',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente illo. Sit error voluptas repellat rerum quidem, soluta enim perferendis voluptates laboriosam. Distinctio, officia quis dolore quos sapiente tempore alias',
    alcoholPer: 50,
    recommandation: 'Poulet',
    ageLimit: 10,
    temperature: 6,
    stock: 2,
    image: 'https://static.wamiz.com/images/upload/17127142_2244568545769182_7436378995601440768_n(1).jpg',
  };

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
