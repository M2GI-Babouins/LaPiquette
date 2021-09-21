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
  @Output() newFilters = new EventEmitter<IProduct[]>();

  regions = Region;
  yearMade: number[] = [];
  wineData: IProduct = {};
  recommandations!: (string | undefined)[];

  filtres = new FormGroup({
    type: new FormControl(),
    price: new FormControl(),
    year: new FormControl(),
    reco: new FormControl(),
    region: new FormControl(),
  });

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.filtres.valueChanges.subscribe(value => {
      this.newFilters.emit(value);
      console.log('filters : fetch data with new value', value);
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

  reset() {
    this.filtres.reset();
  }

  setType(type_value: string) {
    this.filtres.setValue({ type: type_value });
  }
}
