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

import { IProduct } from '../product.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ProductService } from '../service/product.service';
import { ProductDeleteDialogComponent } from '../delete/product-delete-dialog.component';
import { Order } from 'app/entities/order/order.model';

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products: any;

  constructor() {}

  ngOnInit() {
    this.products = [
      { id: 1, name: 'Frank1', price: '42' },
      { id: 2, name: 'Frank2', price: '42' },
      { id: 3, name: 'Frank3', price: '42' },
      { id: 4, name: 'Frank4', price: '42' },
      { id: 5, name: 'Frank', price: '42' },
      { id: 6, name: 'Frank', price: '42' },
      { id: 7, name: 'Frank', price: '42' },
      { id: 8, name: 'Frank', price: '42' },
      { id: 9, name: 'Frank', price: '42' },
      { id: 10, name: 'Bernard', price: '111111' },
    ];
  }

  public addToCart(product: any) {
    console.log('Vive le scrumdaddy');
  }
}
