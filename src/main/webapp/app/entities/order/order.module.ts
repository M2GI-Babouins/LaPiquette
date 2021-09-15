import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OrderComponent } from './list/order.component';
import { OrderDetailComponent } from './detail/order-detail.component';
import { OrderUpdateComponent } from './update/order-update.component';
import { OrderDeleteDialogComponent } from './delete/order-delete-dialog.component';
import { OrderRoutingModule } from './route/order-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { AngularRaveModule } from 'angular-rave';

@NgModule({
  imports: [SharedModule, OrderRoutingModule, AngularRaveModule.forRoot('FLWPUBK-7bde30b96a7fa718186142b04a6368b7-X')],
  declarations: [OrderComponent, OrderDetailComponent, OrderUpdateComponent, OrderDeleteDialogComponent, PaymentComponent],
  entryComponents: [OrderDeleteDialogComponent],
})
export class OrderModule {}
