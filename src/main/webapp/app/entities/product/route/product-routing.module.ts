import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from '../list/product.component';
import { ProductDetailComponent } from '../detail/product-detail.component';
import { ProductUpdateComponent } from '../update/product-update.component';
import { ProductRoutingResolveService } from './product-routing-resolve.service';
import { VisitorRouteAccessService } from 'app/core/auth/visitor-route-access-service.service';
import { AdminRouteAccessService } from 'app/core/auth/admin-route-access.service';

const productRoute: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [VisitorRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductDetailComponent,
    resolve: {
      product: ProductRoutingResolveService,
    },
    canActivate: [VisitorRouteAccessService],
  },
  {
    path: 'new',
    component: ProductUpdateComponent,
    resolve: {
      product: ProductRoutingResolveService,
    },
    canActivate: [AdminRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductUpdateComponent,
    resolve: {
      product: ProductRoutingResolveService,
    },
    canActivate: [AdminRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoute)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
