import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OrderComponent } from '../list/order.component';
import { OrderDetailComponent } from '../detail/order-detail.component';
import { OrderUpdateComponent } from '../update/order-update.component';
import { OrderRoutingResolveService } from './order-routing-resolve.service';
import { AdminRouteAccessService } from 'app/core/auth/admin-route-access.service';

const orderRoute: Routes = [
  {
    path: '',
    component: OrderComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrderDetailComponent,
    resolve: {
      order: OrderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'basket',
    component: OrderDetailComponent,
    resolve: {
      order: OrderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrderUpdateComponent,
    resolve: {
      order: OrderRoutingResolveService,
    },
    canActivate: [AdminRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrderUpdateComponent,
    resolve: {
      order: OrderRoutingResolveService,
    },
    canActivate: [AdminRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoute)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
