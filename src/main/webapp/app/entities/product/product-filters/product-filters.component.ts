/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { flattenDeep, uniq } from 'lodash';
import { IProduct, Recommandation, Region } from '../product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'jhi-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit, OnChanges {
  @Input() products: IProduct[] = [];
  @Output() newProducts = new EventEmitter<IProduct[]>();
  @Output() newFilters = new EventEmitter<IProduct[]>();

  regions = Region;
  yearMade: number[] = [];
  wineData: IProduct = {};
  recommandations!: (string | undefined)[];

  filtres = new FormGroup({
    type: new FormControl(),
    price: new FormControl(),
    year: new FormControl(''),
    reco: new FormControl(),
    region: new FormControl(),
  });

  constructor(private productService: ProductService) {}

  loadProduct(value?: any): void {
    // this.newProducts.emit(this.productService.findSome(value));
  }

  ngOnInit(): void {
    this.filtres.valueChanges.subscribe(value => {
      // this.loadProduct(value);
      this.newFilters.emit(value);
      console.log('fetch data with new value', value);
    });
  }

  ngOnChanges() {
    if (this.products.length !== 0) {
      this.wineData = {};
      this.fillYearMade();
      this.getRecommandations();
    }
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

  getRecommandations() {
    const pReco = this.products.map(p => p.recommandation);
    const recommandationsBis = flattenDeep(pReco.map(reco => reco?.split(',')));
    const recoFinal = uniq(recommandationsBis.map(r => r?.toLowerCase()).map(r => r?.trim()));
    this.recommandations = recoFinal;
  }

  // filterRegion() {
  //   if (this.wineData.region !== null) {
  //     const productFiltered = this.products.filter(product => product.region === this.wineData.region);
  //     this.newProducts.emit(productFiltered);
  //   }
  // }

  // filterRecommandation() {
  //   if (this.wineData.recommandation !== null) {
  //     const productFiltered = this.products.filter(product => {
  //       const recos = product.recommandation
  //         ?.split(',')
  //         .map(r => r.toLowerCase())
  //         .map(r => r.trim());
  //       const alors = recos?.includes(this.wineData.recommandation!);
  //       if (recos?.includes(this.wineData.recommandation!)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //     this.newProducts.emit(productFiltered);
  //   }
  // }

  // filterYear() {
  //   if (this.wineData.year !== null) {
  //     const productFiltered = this.products.filter(product => product.year! <= this.wineData.year!);
  //     this.newProducts.emit(productFiltered);
  //   }
  // }

  // filterPrice() {
  //   if (this.wineData.price !== null) {
  //     const productFiltered = this.products.filter(product => product.price! <= this.wineData.price!);
  //     this.newProducts.emit(productFiltered);
  //   }
  // }

  reset() {
    this.newProducts.emit(this.products);
  }
}
