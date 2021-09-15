import { IOrder } from './../order.model';
import { OrderService } from './../service/order.service';
import { Component, OnInit } from '@angular/core';
import { RavePaymentData } from 'angular-rave';
import { ActivatedRoute } from '@angular/router';
import { RaveOptions } from 'angular-rave';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  order: IOrder = { id: -1, totalPrice: 0.001, orderLines: [] };
  paymentOptions: RaveOptions = {
    customer: { name: 'Default', email: 'Default@mail.fr', phonenumber: '0600000000' },
    amount: 0.01,
    tx_ref: 'id_here',
    customizations: { title: 'Paiement du panier' },
  };

  constructor(private orderService: OrderService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      this.order = order;
    });
  }

  paymentInit(): void {
    this.paymentOptions.amount = this.order.totalPrice;
    this.paymentOptions.tx_ref = 'LPK-${this.order.id}';
  }

  paymentSuccess(res: RavePaymentData): void {
    // eslint-disable-next-line no-console
    console.log('Payment successfull', res);
    // On a real app, we must first perform validation on the server by sending a request to rave to verify the transaction before anything else
    // this.serverService.verifyTransaction(res)
  }

  paymentFailure(): void {
    // Handle payment failure
  }
}
