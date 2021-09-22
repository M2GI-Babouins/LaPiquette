import { OrderLine } from './../../order-line/order-line.model';
import { EntityResponseType, OrderService } from './../service/order.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrder } from '../order.model';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent {
  openPayment = true;
  isSaving = false;

  constructor(protected activatedRoute: ActivatedRoute, protected orderService: OrderService) {}

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

  putPayment(): void {
    // const res = this.orderService.payment(this.orderService.getBasket());
    this.subscribeToSaveResponse(this.orderService.payment(this.orderService.getBasket()));
    this.orderService.getBasket().orderLines.length = 0;
    // eslint-disable-next-line no-console
    console.log('envoie payement');
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

  protected subscribeToSaveResponse(result: Observable<EntityResponseType>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      data => this.onSaveSuccess(data),
      err => this.onSaveError(err)
    );
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSaveSuccess(data: any): void {
    // eslint-disable-next-line no-console
    console.log('success ', data);
    this.openPayment = false;
  }

  protected onSaveError(err: any): void {
    // Api for inheritance.
    // eslint-disable-next-line no-console
    console.log('failed ', err);
  }
}
