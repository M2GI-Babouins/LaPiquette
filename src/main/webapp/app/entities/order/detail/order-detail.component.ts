import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrder } from '../order.model';

@Component({
  selector: 'jhi-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  order: IOrder = { id: -1 };

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      this.order = order;
    });
  }

  previousState(): void {
    window.history.back();
  }

  setTotalPrice(): void {
    this.order.orderLines?.map(orderline => {
      if (orderline.quantity && orderline.unityPrice) {
        orderline.totalPrice = orderline.quantity * orderline.unityPrice;
      }
    });
  }

  addOne(idline: number | undefined): void {
    const currentLine = this.order.orderLines?.find(orderLine => orderLine.id === idline);
    if (currentLine?.quantity !== undefined) {
      currentLine.quantity ? currentLine.quantity + 1 : 0;
    }
    this.setTotalPrice();
  }

  subOne(idline: number | undefined): void {
    const currentLine = this.order.orderLines?.find(orderLine => orderLine.id === idline);
    if (currentLine?.quantity !== undefined) {
      currentLine.quantity ? currentLine.quantity - 1 : 0;
    }
    this.setTotalPrice();
  }

  deleteOrderLine(idline: number | undefined): void {
    this.order.orderLines = this.order.orderLines?.filter(orderLine => orderLine.id !== idline);
  }
}
