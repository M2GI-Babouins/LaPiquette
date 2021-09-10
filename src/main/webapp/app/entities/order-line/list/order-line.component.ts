/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
export class OrderLineComponent implements OnInit {
  @Input() orderId: number = -1;

  orderLines: IOrderLine[] = [];

  isLoading = false;

  constructor(protected orderLineService: OrderLineService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {}

  ngOnInit(): void {
    this.orderLines = [
      { id: 1, quantity: 1, unityPrice: 2.9, order: { id: 2 }, product: { name: 'La Piquette' } },
      { id: 2, quantity: 1, unityPrice: 8.9, order: { id: 2 }, product: { name: "L'autre" } },
      { id: 3, quantity: 3, unityPrice: 29, order: { id: 2 }, product: { name: 'La Bon Vin' } },
    ];
    this.setTotalPrice();
    // this.orderLineService.findAll();
  }

  setTotalPrice() {
    this.orderLines.map(orderline => {
      if (orderline.quantity && orderline.unityPrice) {
        orderline.totalPrice = orderline.quantity * orderline.unityPrice;
      }
    });
  }

  addOne(idline: number | undefined): void {
    console.log('id : ' + idline);
    const currentLine = this.orderLines.find(orderLine => orderLine.id === idline);
    if (currentLine?.quantity !== undefined) {
      currentLine.quantity = currentLine.quantity + 1;
    }
    this.setTotalPrice();
  }

  subOne(idline: number | undefined): void {
    const currentLine = this.orderLines.find(orderLine => orderLine.id === idline);
    if (currentLine?.quantity !== undefined) {
      currentLine.quantity = currentLine.quantity - 1;
    }
    this.setTotalPrice();
  }

  deleteOrderLine(idline: number | undefined): void {
    this.orderLines = this.orderLines.filter(orderLine => orderLine.id !== idline);
  }
}
