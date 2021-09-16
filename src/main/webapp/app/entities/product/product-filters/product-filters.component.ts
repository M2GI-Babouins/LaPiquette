/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { map, tail, times, uniq } from 'lodash';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FilterName, IProduct, Recommandation, Region } from '../product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'jhi-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit, OnChanges {
  @Input() products: IProduct[] = [];
  @Output() newProducts = new EventEmitter<IProduct[]>();

  recommandations = Recommandation;
  regions = Region;
  yearMade: number[] = [];
  wineData: IProduct = {};

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.products.length !== 0) {
      this.fillYearMade();
    }
  }

  valuesRecommandation(): Array<string> {
    const keys = Object.values(this.recommandations);
    return keys;
  }

  valuesRegion(): Array<string> {
    const keys = Object.values(this.regions);
    return keys;
  }

  fillYearMade() {
    const oldestWineYear = this.productService.getOlderWineYear(this.products);
    this.yearMade.length = 2021 - oldestWineYear;
    this.yearMade.fill(0);
    this.yearMade = this.yearMade.map((year, i) => (year = oldestWineYear + i));
  }

  filterRegion() {
    if (this.wineData.region !== null) {
      const productFiltered = this.products.filter(product => product.region === this.wineData.region);
      this.newProducts.emit(productFiltered);
    }
  }

  filterRecommandation() {
    if (this.wineData.recommandation !== null) {
      const productFiltered = this.products.filter(product => product.recommandation === this.wineData.recommandation);
      this.newProducts.emit(productFiltered);
    }
  }

  filterYear() {
    if (this.wineData.year !== null) {
      const productFiltered = this.products.filter(product => product.year! <= this.wineData.year!);
      this.newProducts.emit(productFiltered);
    }
  }

  filterPrice() {
    if (this.wineData.price !== null) {
      const productFiltered = this.products.filter(product => product.price! <= this.wineData.price!);
      this.newProducts.emit(productFiltered);
    }
  }

  reset() {
    this.newProducts.emit(this.products);
  }
}
