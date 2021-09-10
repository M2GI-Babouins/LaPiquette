/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderLine } from '../order-line.model';

import { OrderLineService } from '../service/order-line.service';
import { ParseLinks } from 'app/core/util/parse-links.service';
import { IProduct } from 'app/entities/product/product.model';
import { IOrder } from 'app/entities/order/order.model';

@Component({
  selector: 'jhi-order-line',
  templateUrl: './order-line.component.html',
})
export class OrderLineComponent implements OnChanges {
  @Input() orderId: number = -1;

  orderLines: IOrderLine[] = [
    { quantity: 1, unityPrice: 2.9, totalPrice: 2.9, order: { id: 2 } },
    { quantity: 1, unityPrice: 4.5, totalPrice: 2.9, order: { id: 1 } },
    { quantity: 1, unityPrice: 14, totalPrice: 2.9, order: { id: 1 } },
    { quantity: 1, unityPrice: 9.9, totalPrice: 2.9, order: { id: 3 } },
    { quantity: 1, unityPrice: 8.9, totalPrice: 2.9, order: { id: 2 } },
    { quantity: 3, unityPrice: 29, totalPrice: 2.9, order: { id: 2 } },
  ];

  id?: number;
  quantity?: number | null;
  unityPrice?: number | null;
  totalPrice?: number | null;
  product?: IProduct | null;
  order?: IOrder | null;

  isLoading = false;

  constructor(protected orderLineService: OrderLineService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {}

  ngOnChanges(): void {
    this.keepCurrentOrder(this.orderId);
  }

  keepCurrentOrder(orderId: number): void {
    console.log('order id :');
    console.log(orderId);
    this.orderLines = this.orderLines.filter(orderLine => orderLine.order?.id === orderId);
  }
}
