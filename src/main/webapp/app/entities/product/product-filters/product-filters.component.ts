/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { map, tail, times, uniq } from 'lodash';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduct, Recommandation, Region } from '../product.model';

@Component({
  selector: 'jhi-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit {
  @Input() products: IProduct[] = [];
  @Output() newProducts = new EventEmitter<IProduct[]>();

  recommandations = Recommandation;
  regions = Region;
  wineData: IProduct = {};

  constructor() {}

  ngOnInit(): void {}

  valuesRecommandation(): Array<string> {
    const keys = Object.values(this.recommandations);
    return keys;
  }

  valuesRegion(): Array<string> {
    const keys = Object.values(this.regions);
    return keys;
  }

  onClickSubmit() {
    let productRecommandation: IProduct[] = [];
    let productRegion: IProduct[] = [];
    let productPrice: IProduct[] = [];
    let productsFiltered;

    if (this.wineData.price) {
      productPrice = this.products.filter(product => product.price! <= this.wineData.price!);
    }
    if (this.wineData.region) {
      if (productPrice.length === 0) {
        productRegion = this.products.filter(product => product.region === this.wineData.region);
      } else {
        productRegion = productPrice.filter(product => product.region === this.wineData.region);
      }
    }
    if (this.wineData.recommandation) {
      if (productRegion.length !== 0) {
        productRecommandation = productRegion.filter(product => product.recommandation === this.wineData.recommandation);
      } else {
        if (productPrice.length !== 0) {
          productRecommandation = productPrice.filter(product => product.recommandation === this.wineData.recommandation);
        } else {
          productRecommandation = this.products.filter(product => product.recommandation === this.wineData.recommandation);
        }
      }
    }

    if (productRecommandation.length !== 0) {
      productsFiltered = productRecommandation;
    } else if (productRegion.length !== 0) {
      productsFiltered = productRegion;
    } else if (productPrice.length !== 0) {
      productsFiltered = productPrice;
    } else {
      productsFiltered = this.products;
    }

    console.log('new products : ');
    console.log(productsFiltered);

    this.newProducts.emit(productsFiltered);
  }
}
