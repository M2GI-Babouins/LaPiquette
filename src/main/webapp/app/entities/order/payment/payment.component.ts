import { OrderService } from './../service/order.service';
import { Component, OnInit } from '@angular/core';
import { RavePaymentData } from 'angular-rave';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('OK');
  }

  paymentInit(): void {
    // Handle payment
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
