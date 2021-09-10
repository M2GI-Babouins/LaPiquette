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

    /* this.activatedRoute.data.subscribe((order) => {
      if (!order.bill) {
        this.order.id = order.id;
      }
    });*/
  }

  previousState(): void {
    window.history.back();
  }
}
