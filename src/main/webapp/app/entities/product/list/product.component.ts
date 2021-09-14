/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduct, Recommandation, Region } from '../product.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ProductService } from '../service/product.service';
import { ProductDeleteDialogComponent } from '../delete/product-delete-dialog.component';
import { Order } from 'app/entities/order/order.model';

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  newProducts: IProduct[] = [];

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.products = [
      { id: 1, name: 'Oui', price: 15, region: Region.Alsace, recommandation: Recommandation.ViandeRouge, stock: 5 },
      { id: 2, name: 'Non', price: 30, region: Region.BasseNormandie, recommandation: Recommandation.Poisson, stock: 3 },
      { id: 3, name: 'Licorne', price: 50, region: Region.ChampagneArdenne, recommandation: Recommandation.Aperitif, stock: 8 },
      { id: 4, name: 'FlammandRose', price: 5, region: Region.BasseNormandie, recommandation: Recommandation.ViandeRouge, stock: 15 },
      { id: 5, name: 'Ortensia', price: 89, region: Region.Aquitaine, recommandation: Recommandation.ViandeBlanche, stock: 78 },
      { id: 6, name: 'Piquette', price: 25000, region: Region.MidiPyrene, recommandation: Recommandation.ViandeRouge, stock: 2 },
      { id: 7, name: 'carotte', price: 3, region: Region.MidiPyrene, recommandation: Recommandation.Aperitif, stock: 0 },
      { id: 8, name: 'radis', price: 4, region: Region.NordPasDeCalais, recommandation: Recommandation.ViandeBlanche, stock: 35 },
      { id: 9, name: 'Henri', price: 2, region: Region.Bourgogne, recommandation: Recommandation.Aperitif, stock: 45 },
      { id: 10, name: 'Bernard', price: 8, region: Region.Corse, recommandation: Recommandation.Poisson, stock: 50 },
      { id: 11, name: 'Piquette', price: 25000, region: Region.MidiPyrene, recommandation: Recommandation.ViandeRouge, stock: 2 },
      { id: 12, name: 'carotte', price: 3, region: Region.MidiPyrene, recommandation: Recommandation.Poisson, stock: 0 },
      { id: 13, name: 'radis', price: 4, region: Region.NordPasDeCalais, recommandation: Recommandation.ViandeBlanche, stock: 35 },
      { id: 14, name: 'Henri', price: 2, region: Region.Bourgogne, recommandation: Recommandation.Aperitif, stock: 45 },
      { id: 15, name: 'Bernard', price: 8, region: Region.Corse, recommandation: Recommandation.Poisson, stock: 50 },
    ];

    // this.products = this.productService.loadAll();
  }

  public addToCart(product: any) {
    console.log('Vive le scrumdaddy');
  }

  public setNewProducts(products: IProduct[]) {
    this.products = products;
  }
}
