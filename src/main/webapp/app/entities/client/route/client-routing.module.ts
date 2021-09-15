import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ClientComponent } from '../list/client.component';
import { ClientDetailComponent } from '../detail/client-detail.component';
import { ClientUpdateComponent } from '../update/client-update.component';
import { ClientRoutingResolveService } from './client-routing-resolve.service';
import { AdminRouteAccessService } from 'app/core/auth/admin-route-access.service';

const clientRoute: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [AdminRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClientDetailComponent,
    resolve: {
      client: ClientRoutingResolveService,
    },
    canActivate: [AdminRouteAccessService],
  },
  {
    path: 'new',
    component: ClientUpdateComponent,
    resolve: {
      client: ClientRoutingResolveService,
    },
    canActivate: [AdminRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClientUpdateComponent,
    resolve: {
      client: ClientRoutingResolveService,
    },
    canActivate: [AdminRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(clientRoute)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
