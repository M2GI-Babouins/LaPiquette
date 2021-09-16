import { OrderLine } from './../../order-line/order-line.model';
import { OrderService } from './../service/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrder } from '../order.model';

@Component({
  selector: 'jhi-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  openPayment = false;

  constructor(protected activatedRoute: ActivatedRoute, protected orderService: OrderService) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(this.getBasket().orderLines);
  }

  getBasket(): IOrder {
    return this.orderService.getBasket();
  }

  previousState(): void {
    window.history.back();
  }

  addOne(ol: OrderLine): void {
    this.orderService.changeBasketQuantity(ol, ol.quantity + 1);
  }

  subOne(ol: OrderLine): void {
    this.orderService.changeBasketQuantity(ol, ol.quantity - 1);
  }

  deleteOrderLine(ol: OrderLine): void {
    this.orderService.deleteFromBasket(ol);
  }

  showPayment(): boolean {
    this.orderService.setOrderDate();
    if (this.openPayment) {
      this.openPayment = false;
      return true;
    }
    return false;
  }

  deleteOrder(): void {
    this.orderService.deleteAllBasket();
  }
}
